import mongoose from 'mongoose'
import config from '../../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils'
import ApiError from '../../../errors/ApiError'
import status from 'http-status'
import { Student } from '../student/student.model'
import { Admin } from '../admin/admin.model'
import { IAdmin } from '../admin/admin.interface'
import { ManagementDepartment } from '../managementDepartment/managementDepartment.model'
import { IFaculty } from '../faculty/faculty.interface'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { Faculty } from '../faculty/faculty.model'
import bcrypt from 'bcrypt'

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_student_pass as string
  }

  //hash password
user.password = await bcrypt.hash(user.password, (Number(config.bcrypt_salt_rounds)))

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

const createFaculty = async (faculty: IFaculty, user: IUser) => {
  if (!user.password) {
    user.password = config.default_faculty_pass as string
  }

  user.role = 'faculty'

  const academicDepartment = await AcademicDepartment.findById(
    faculty.academicDepartment,
  )

  //generate faculty id
  let newUserAllData = null

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const id = await generateFacultyId(academicDepartment)

    if (!id) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to generate faculty id')
    }

    user.id = id
    faculty.id = id

    const newFaculty = await Faculty.create([faculty], { session })

    if (!newFaculty.length) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to create faculty')
    }

    //Set faculty --------> _id into user.faculty
    user.faculty = newFaculty[0]._id

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

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
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


const createAdmin = async (admin:IAdmin, user:IUser) => {

  if(!user.password){
    user.password = config.default_admin_pass as string
  }

  user.role = 'admin';

  const managementDepartment = await ManagementDepartment.findById(
    admin.managementDepartment
  );

  let newUserAllData = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction()

    const id = await generateAdminId(managementDepartment)

    if(!id){
      throw new ApiError(status.BAD_REQUEST, 'Failed to generate admin id');
    }

    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], {session})

    if(!newAdmin.length){
      throw new ApiError(status.BAD_REQUEST, 'Failed to create admin');
    }

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], {session})

    if(!newUser.length) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData =  newUser[0];

    await session.commitTransaction();
    await session.endSession();

  } catch (error) {

    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if(newUserAllData){
    newUserAllData =  await User.findOne({id: newUserAllData.id}).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment'
        }
      ]
    })
  }

  return newUserAllData
}

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin
}
