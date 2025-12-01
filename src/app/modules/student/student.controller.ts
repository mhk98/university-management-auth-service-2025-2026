import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import status from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import sendResponse from '../../../shared/sendResponse'
import { studentFilterableFields } from './student.constant'
import { StudentService } from './student.service'
import { IStudent } from './student.interface'

const getAllStudent = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields)

  const filters = pick(req.query, studentFilterableFields)

  const result = await StudentService.getAllStudent(filters, paginationOptions)

  sendResponse<IStudent[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student retrived successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await StudentService.getSingleStudent(id)

  sendResponse<IStudent>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student retrived successfully',
    data: result,
  })
})

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await StudentService.updateStudent(id, updatedData)

  sendResponse<IStudent>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student update successfully',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await StudentService.deleteStudent(id)

  sendResponse<IStudent>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student update successfully',
    data: result,
  })
})

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
