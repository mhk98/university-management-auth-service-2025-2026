import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import status from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicFaculty } from './academicFaculty.interface'
import { academicFacultyFilterableFields } from './academicFaculty.constant'
import { AcademicFacultyService } from './academicFaculty.service'

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body
  const result = await AcademicFacultyService.createFaculty(academicFacultyData)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  })
})

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicFacultyService.getAllFaculty(
    filters,
    paginationOptions,
  )

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic faculties fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicFacultyService.getSingleFaculty(id)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty retrived successfully',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await AcademicFacultyService.updatedFaculty(id, updatedData)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty update successfully',
    data: result,
  })
})

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
}
