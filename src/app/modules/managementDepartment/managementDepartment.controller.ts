import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import status from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import { IManagementDepartment } from './managementDepartment.interface'
import { paginationFields } from '../../../constants/pagination'
import { managementDepartmentFilterableFields } from './managementDepartment.constant'
import pick from '../../../shared/pick'
import { ManagementDepartmentService } from './managementDepartment.service'

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...managementDepartmentData } = req.body
    const result = await ManagementDepartmentService.createManagementDepartment(
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

const getAllManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields)
    const filters = pick(req.query, managementDepartmentFilterableFields)

    const result = await ManagementDepartmentService.getAllManagementDepartment(
      filters,
      paginationOptions,
    )

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Management Departments retrieved successfully',
      meta: result.meta,
      data: result.data,
    })
  },
)

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id)

    sendResponse<IManagementDepartment>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Management Department retrieved successfully',
      data: result,
    })
  },
)

const updateManagementDepartement = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const payload = req.body
    const result =
      await ManagementDepartmentService.updateManagementDepartement(id, payload)
    sendResponse<IManagementDepartment>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Management Department updated successfully',
      data: result,
    })
  },
)

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result =
      await ManagementDepartmentService.deleteManagementDepartment(id)
    sendResponse<IManagementDepartment>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Management Department deleted successfully',
      data: result,
    })
  },
)

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartement,
  deleteManagementDepartment,
}
