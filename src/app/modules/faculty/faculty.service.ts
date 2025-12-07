import mongoose from "mongoose";
import config from "../../../config";
import { IUser } from "../user/user.interface";
import { IFaculty } from "./faculty.interface";
import { generateFacultyId } from "../user/user.utils";
import ApiError from "../../../errors/ApiError";
import status from "http-status";
import { Faculty } from "./faculty.model";
import { User } from "../user/user.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";

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
        newUserAllData = await User.findById(newUserAllData.id).populate({
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


export const FacultyService = {
    createFaculty
}