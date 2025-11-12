import config from '../../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  //Automatically generate an ID if not provided
  //Default password handling can be added later

  // const id = await generateFacultyId();
  // if (!id) {
  //     throw new Error('Failed to generate user id');
  // }
  // user.id = id;

  if (!user.password) {
    user.password = config.default_student_pass as string
  }

  user.role = 'student'

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  )

  //generate student id
  // const id =
  await generateStudentId(academicSemester)
  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new Error('Failed to create user')
  }

  return createdUser
}

export const UserService = {
  createStudent,
}
