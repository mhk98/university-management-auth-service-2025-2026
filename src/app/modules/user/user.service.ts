import mongoose from 'mongoose'
import config from '../../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'
import ApiError from '../../../errors/ApiError'
import status from 'http-status'
import { Student } from '../student/student.model'

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_student_pass as string
  }

  user.role = 'student'

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  )

  //generate student id
  let newUserAllData = null

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const id = await generateStudentId(academicSemester)
    if (!id) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to generate student id')
    }

    user.id = id
    student.id = id

    //array
    const newStudent = await Student.create([student], { session })

    if (!newStudent.length) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to create student')
    }

    //set student ----> _id into user.student
    user.student = newStudent[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to create user')
    }

    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  //user ----> student ------> academicSemester, academicDepartment, academicFaculty

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }

  return newUserAllData
}

export const UserService = {
  createStudent,
}
