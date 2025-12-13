import mongoose, { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import status from 'http-status'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IAdmin, IAdminFilter } from './admin.interface'
import { adminSearchableFields } from './admin.constant'
import { Admin } from './admin.model'


const getAllAdmin = async (
  filters: IAdminFilter,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAdmin[]>> => {
  // const {page = 1, limit=10} = paginationOptions;
  // const skip = (page-1)*limit;

  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  //    const andConditions = [
  //     {
  //         $or: [
  //             {
  //                 title: {
  //                     $regex:searchTerm,
  //                     $options:'i'
  //                 }
  //             },
  //             {
  //                 code: {
  //                     $regex:searchTerm,
  //                     $options:'i'
  //                 }
  //             },
  //             {
  //                 year: {
  //                     $regex:searchTerm,
  //                     $options:'i'
  //                 }
  //             }
  //         ]
  //     }
  //    ]

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Admin.find(whereConditions)
    .populate('managementDepartment')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Admin.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleAdmin = async (id: string) => {
  const result = await Admin.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty')

  return result
}

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>,
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id })

  if (!isExist) {
    throw new ApiError(status.NOT_FOUND, 'Admin not found')
  }

  const { name, ...adminData } = payload

  const updateAdminData: Partial<IAdmin> = { ...adminData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`
      ;(updateAdminData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await Admin.findOneAndUpdate({ id }, updateAdminData, {
    new: true,
  })

  return result
}

const deleteAdmin = async (id: string) => {
  const result = await Admin.findByIdAndDelete(id)
  return result
}

export const AdminService = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
}
