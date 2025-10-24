import { Schema, model } from "mongoose";
import {
  IAcademicSemester,
  AcademicSemesterModel,
} from "./academicFaculty.interface";
import { academicSemesterCodes, academicSemesterMonths, academicSemesterTitles } from "./academicFaculty.constant";
import ApiError from "../../../errors/ApiError";
import status from "http-status";

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles, // adjust if you want Autumn
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
    const isExist = await AcademicSemester.findOne({title: this.title, year: this.year})

    if(isExist) {
        throw new ApiError(status.CONFLICT, 'Academic Semester already exists')
    }
    next()
}

)

export const AcademicSemester = model<
  IAcademicSemester,
  AcademicSemesterModel
>("AcademicSemester", academicSemesterSchema);


