import { model, Schema } from "mongoose";
import { FacultyModel, IFaculty } from "./faculty.interface";

export const facultySchema = new Schema<IFaculty, FacultyModel>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name:{
            firstName: { type: String,required: true,},
            middleName: {type: String},
            lastName: { type: String,required: true,},
        },
        gender: {
            type: String,
            enum: ['male', 'female']
        },
        dateofBirth: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        contactNo: {
            type: String,
            required: true,
        },
        emergencyContactNo: {
            type: String,
            required: true,
        },
        presentAddress: {
            type: String
        },
        permanentAddress: {
            type: String
        },
        bloodGroup: {
            type: String,
            enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
        },
        designation: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String,
        },
           academicDepartment: {
              type: Schema.Types.ObjectId,
              ref: 'AcademicDepartment', // like subject CSE, EEE etc
              required: true,
            },
            academicFaculty: {
              type: Schema.Types.ObjectId,
              ref: 'AcademicFaculty',  // like subject Database, C, C++ etc
              required: true,
            },
    },

    {
        timestamps: true
    }
)

export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema)