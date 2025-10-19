import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { academicSemesterTitleCodeMapper } from "./academicSemester.constant";
import { IAcademicSemester, IAcademicSemesterFilter } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import status from "http-status";

const createSemester = async(payload: IAcademicSemester): Promise<IAcademicSemester> => {
   if(academicSemesterTitleCodeMapper[payload.title] !== payload.code){
    throw new ApiError(status.BAD_REQUEST, 'Invalid semester code! Please check your input')
   }
    const result = await AcademicSemester.create(payload)
    return result;
}

const getAllSemester = async(paginationOptions:IPaginationOptions, filters: IAcademicSemesterFilter): Promise<IGenericResponse<IAcademicSemester[]>> => {

    // const {page = 1, limit=10} = paginationOptions;
    // const skip = (page-1)*limit;

    const {searchTerm} = filters

const academicSemesterSearchableFields=['title', 'code', 'year']
    const andConditions = []

    if(searchTerm) {
        andConditions.push({
           $or: academicSemesterSearchableFields.map((field) => ({
                [field]: {
                    $regex:searchTerm,
                    $options:'i'
                }
            }))
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

    const {page, limit, skip, sortBy,
        sortOrder} = paginationHelpers.calculatePagination(paginationOptions)

        const sortConditions: {[key: string]: SortOrder} = {}

        if(sortBy && sortOrder) {
            sortConditions[sortBy] = sortOrder
        }
    const result = await AcademicSemester.find({$and:andConditions}).sort(sortConditions).skip(skip).limit(limit)

    const total = await AcademicSemester.countDocuments()

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result,
    }
}


export const AcademicSemesterService = {
    createSemester,
    getAllSemester
}