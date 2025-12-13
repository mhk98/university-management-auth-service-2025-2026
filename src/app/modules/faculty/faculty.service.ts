import mongoose, { SortOrder } from 'mongoose'
import config from '../../../config'
import { IUser } from '../user/user.interface'
import { IFaculty, IFacultyFilter } from './faculty.interface'
import { generateFacultyId } from '../user/user.utils'
import ApiError from '../../../errors/ApiError'
import status from 'http-status'
import { Faculty } from './faculty.model'
import { User } from '../user/user.model'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { facultySearchableFields } from './faculty.constant'
import { paginationHelpers } from '../../../helpers/paginationHelper'



const getAllFaculty = async (
  filters: IFacultyFilter,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IFaculty[]>> => {
  // const {page = 1, limit=10} = paginationOptions;
  // const skip = (page-1)*limit;

  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
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

  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Faculty.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleFaculty = async (id: string) => {
  const result = await Faculty.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty')

  return result
}

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>,
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id })

  if (!isExist) {
    throw new ApiError(status.NOT_FOUND, 'Faculty not found')
  }

  const { name, ...facultyData } = payload

  const updateFacultyData: Partial<IFaculty> = { ...facultyData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`
      ;(updateFacultyData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await Faculty.findOneAndUpdate({ id }, updateFacultyData, {
    new: true,
  })

  return result
}

const deleteFaculty = async (id: string) => {
  const result = await Faculty.findByIdAndDelete(id)
  return result
}

export const FacultyService = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
