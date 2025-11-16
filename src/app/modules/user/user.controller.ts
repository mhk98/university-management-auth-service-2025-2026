import { Request, RequestHandler, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body

    console.log("student data", student);
    console.log("user data", userData);
    const result = await UserService.createStudent(student, userData)

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  },
)

export const UserController = {
  createStudent,
}
