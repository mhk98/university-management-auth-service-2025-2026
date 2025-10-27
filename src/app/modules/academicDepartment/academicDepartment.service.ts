import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  IAcademicDepartment,
  IAcademicDepartmentFilter,
} from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'
import { academicDepartmentSearchableFields } from './academicDepartment.constant'

const createDepartment = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const result = await (
    await AcademicDepartment.create(payload)
  ).populate('academicFaculty')
  return result
}

const getAllDepartment = async (
  filters: IAcademicDepartmentFilter,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  // const {page = 1, limit=10} = paginationOptions;
  // const skip = (page-1)*limit;

  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map(field => ({
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
  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await AcademicDepartment.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleDepartment = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty')

  return result
}

const updatedDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>,
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  ).populate('academicFaculty')

  return result
}

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updatedDepartment,
}
