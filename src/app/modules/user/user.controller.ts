import { Request, RequestHandler, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import status from 'http-status'
import { IUser } from './user.interface'

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body

    const result = await UserService.createStudent(student, userData)

    sendResponse<IUser>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  },
)

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const {admin, ...userData} = req.body;

  const result = await UserService.createAdmin(admin, userData)

  sendResponse<IUser>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin created successfully',
    data: result
  })
})

export const UserController = {
  createStudent,
  createAdmin
}
