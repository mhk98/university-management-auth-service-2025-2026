import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { FacultyService } from './faculty.service'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { facultyFilterableFields } from './faculty.constant'
import { IFaculty } from './faculty.interface'
import status from 'http-status'
import sendResponse from '../../../shared/sendResponse'

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body

  const result = await FacultyService.createFaculty(faculty, userData)

  res.status(201).json({
    success: true,
    message: 'Faculty created successfully',
    data: result,
  })
})

const getAllFaculty = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields)

  const filters = pick(req.query, facultyFilterableFields)

  const result = await FacultyService.getAllFaculty(filters, paginationOptions)
  sendResponse<IFaculty[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await FacultyService.getSingleFaculty(id)

  sendResponse<IFaculty>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await FacultyService.updateFaculty(id, updatedData)

  sendResponse<IFaculty>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  })
})

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await FacultyService.deleteFaculty(id)

  sendResponse<IFaculty>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  })
})
export const FacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
