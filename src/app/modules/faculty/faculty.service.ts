import mongoose, { SortOrder } from "mongoose";
import config from "../../../config";
import { IUser } from "../user/user.interface";
import { IFaculty, IFacultyFilter } from "./faculty.interface";
import { generateFacultyId } from "../user/user.utils";
import ApiError from "../../../errors/ApiError";
import status from "http-status";
import { Faculty } from "./faculty.model";
import { User } from "../user/user.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { facultySearchableFields } from "./faculty.constant";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const createFaculty = async(faculty:IFaculty, user:IUser) => {

    if(!user.password){
        user.password = config.default_faculty_pass as string
    }

    user.role = 'faculty';

    const academicDepartment = await AcademicDepartment.findById(
        faculty.academicDepartment
    )

    //generate faculty id
    let newUserAllData = null;

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        const id = await generateFacultyId(academicDepartment)

        if(!id){
            throw new ApiError(status.BAD_REQUEST, 'Failed to generate faculty id')
        }

        user.id = id;
        faculty.id = id;

        const newFaculty = await Faculty.create([faculty], {session})

        if(!newFaculty.length){
            throw new ApiError(status.BAD_REQUEST, 'Failed to create faculty')
        }

        //Set faculty --------> _id into user.faculty
        user.faculty = newFaculty[0]._id;

        const newUser = await User.create([user], {session})

        if(!newUser.length){
            throw new ApiError(status.BAD_REQUEST, 'Failed to create user')
        }

        newUserAllData = newUser[0];

        await session.commitTransaction();
        await session.endSession();

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }

     if(newUserAllData){
        newUserAllData = await User.findOne({id:newUserAllData.id}).populate({
            path:'faculty',
            populate: [
                {
                    path: 'academicDepartment'
                },
                {
                    path: 'academicFaculty'
                }
            ]
        })
       }

       return newUserAllData;
}

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
export const FacultyService = {
    createFaculty,
    getAllFaculty,
    getSingleFaculty,
}