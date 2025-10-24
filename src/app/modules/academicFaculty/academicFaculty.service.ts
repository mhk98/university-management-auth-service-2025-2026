import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { academicSemesterSearchableFields, academicSemesterTitleCodeMapper } from "./academicFaculty.constant";
import { IAcademicSemester, IAcademicSemesterFilter } from "./academicFaculty.interface";
import { AcademicSemester } from "./academicFaculty.model";
import status from "http-status";

const createSemester = async(payload: IAcademicSemester): Promise<IAcademicSemester> => {
   if(academicSemesterTitleCodeMapper[payload.title] !== payload.code){
    throw new ApiError(status.BAD_REQUEST, 'Invalid semester code! Please check your input')
   }
    const result = await AcademicSemester.create(payload)
    return result;
}

const getAllSemester = async( filters: IAcademicSemesterFilter, paginationOptions:IPaginationOptions): Promise<IGenericResponse<IAcademicSemester[]>> => {

    // const {page = 1, limit=10} = paginationOptions;
    // const skip = (page-1)*limit;

    const {searchTerm, ...filtersData} = filters

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



    if(Object.keys(filtersData).length){
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
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

        const whereConditions = andConditions.length > 0 ? {$and: andConditions} : {}
    const result = await AcademicSemester.find(whereConditions).sort(sortConditions).skip(skip).limit(limit)

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


const getSingleSemester = async(id:string) => {

    const result = await AcademicSemester.findById(id)

    return result

}

const updatedSemester = async(id:string, payload: Partial<IAcademicSemester>):Promise<IAcademicSemester | null> => {

     if(payload.title && payload.code && academicSemesterTitleCodeMapper[payload.title] !== payload.code){
    throw new ApiError(status.BAD_REQUEST, 'Invalid semester code! Please check your input')
   }
    const result = await AcademicSemester.findOneAndUpdate({_id:id}, payload, {new: true})

    return result

}

export const AcademicSemesterService = {
    createSemester,
    getAllSemester,
    getSingleSemester,
    updatedSemester
}