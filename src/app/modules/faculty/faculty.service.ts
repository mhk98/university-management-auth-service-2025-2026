import mongoose from "mongoose";
import config from "../../../config";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { IUser } from "../user/user.interface";
import { IFaculty } from "./faculty.interface";

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
        
    } catch (error) {
        
    }
}


export const FacultyService = {
    createFaculty
}