import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import status from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import sendResponse from '../../../shared/sendResponse'
import { AcademicDepartmentService } from './academicDepartment.service'
import { academicDepartmentFilterableFields } from './academicDepartment.constant'
import { IAcademicDepartment } from './academicDepartment.interface'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body
  const result =
    await AcademicDepartmentService.createDepartment(academicFacultyData)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Department created successfully',
    data: result,
  })
})

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicDepartmentService.getAllDepartment(
    filters,
    paginationOptions,
  )

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Department fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicDepartmentService.getSingleDepartment(id)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Department retrived successfully',
    data: result,
  })
})

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await AcademicDepartmentService.updatedDepartment(
    id,
    updatedData,
  )

  sendResponse<IAcademicDepartment>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Department update successfully',
    data: result,
  })
})

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
}
