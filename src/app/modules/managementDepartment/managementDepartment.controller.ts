import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import status from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import { ManagementDepartmentSerivce } from './managementDepartment.service'
import { IManagementDepartment } from './managementDepartment.interface'
import { paginationFields } from '../../../constants/pagination'
import { managementDepartmentFilterableFields } from './managementDepartment.constant'
import pick from '../../../shared/pick'

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...managementDepartmentData } = req.body
    const result = await ManagementDepartmentSerivce.createManagementDepartment(
      managementDepartmentData,
    )

    sendResponse<IManagementDepartment>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Management Department created successfully',
      data: result,
    })
  },
)

const getAllManagementDepartment = catchAsync(async (req:Request, res:Response) => {
    const paginationOptions = pick(req.query, paginationFields)
    const filters = pick(req.query, managementDepartmentFilterableFields)

 const result = await ManagementDepartmentSerivce.getAllManagementDepartment(filters, paginationOptions)

    sendResponse<IManagementDepartment[]>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Management Departments retrieved successfully',
        // meta: result.meta,
        // data: result.data,

    })
})

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartment
}
