import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IAcademicFaculty, IAcademicFacultyFilter } from "./academicFaculty.interface";
import { academicFacultySearchableFields } from "./academicFaculty.constant";
import { AcademicFaculty } from "./academicFaculty.model";

const createFaculty = async(payload: IAcademicFaculty): Promise<IAcademicFaculty> => {
 
    const result = await AcademicFaculty.create(payload)
    return result;
}

const getAllFaculty = async( filters: IAcademicFacultyFilter, paginationOptions:IPaginationOptions): Promise<IGenericResponse<IAcademicFaculty[]>> => {

    // const {page = 1, limit=10} = paginationOptions;
    // const skip = (page-1)*limit;

    const {searchTerm, ...filtersData} = filters

    const andConditions = []

    if(searchTerm) {
        andConditions.push({
           $or: academicFacultySearchableFields.map((field) => ({
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
    const result = await AcademicFaculty.find(whereConditions).sort(sortConditions).skip(skip).limit(limit)

    const total = await AcademicFaculty.countDocuments()

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result,
    }
}


const getSingleFaculty = async(id:string) => {

    const result = await AcademicFaculty.findById(id)

    return result

}

const updatedFaculty = async(id:string, payload: Partial<IAcademicFaculty>):Promise<IAcademicFaculty | null> => {

    const result = await AcademicFaculty.findOneAndUpdate({_id:id}, payload, {new: true})

    return result

}

export const AcademicFacultyService = {
    createFaculty,
    getAllFaculty,
    getSingleFaculty,
    updatedFaculty
}