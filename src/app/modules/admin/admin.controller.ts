import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import status from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { adminFilterableFields } from './admin.constant'
import { AdminService } from './admin.service'
import { IAdmin } from './admin.interface'

const getAllAdmin = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields)

  const filters = pick(req.query, adminFilterableFields)

  const result = await AdminService.getAllAdmin(filters, paginationOptions)
  sendResponse<IAdmin[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AdminService.getSingleAdmin(id)

  sendResponse<IAdmin>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  })
})

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await AdminService.updateAdmin(id, updatedData)
  sendResponse<IAdmin>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  })
})

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AdminService.deleteAdmin(id)

  sendResponse<IAdmin>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  })
})
export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
}
