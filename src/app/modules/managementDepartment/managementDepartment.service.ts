import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  IManagementDepartmentFilter,
  managementDepartmentSearchableFields,
} from './managementDepartment.constant'
import { IManagementDepartment } from './managementDepartment.interface'
import { ManagementDepartment } from './managementDepartment.model'

const createManagementDepartment = async (
  payload: IManagementDepartment,
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.create(payload)
  return result
}

const getAllManagementDepartment = async (
  filters: IManagementDepartmentFilter,
  paginationOptions: IPaginationOptions,
) => {
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: managementDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await ManagementDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await ManagementDepartment.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleManagementDepartment = async (id: string) => {
  const result = await ManagementDepartment.findOne({ _id: id })
  return result
}

const updateManagementDepartement = async (
  id: string,
  payload: IManagementDepartment,
) => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  )
  return result
}

const deleteManagementDepartment = async (id: string) => {
  const result = await ManagementDepartment.findOneAndDelete({ _id: id })
  return result
}

export const ManagementDepartmentService = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartement,
  deleteManagementDepartment,
}
