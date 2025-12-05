import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { FacultyService } from "./faculty.service";

const createFaculty = catchAsync( async(req:Request, res:Response)=> {

    const {faculty, ...userData} = req.body;

    const result = await FacultyService.createFaculty(faculty, userData);

    res.status(201).json({
        success: true,
        message: 'Faculty created successfully',
        data: result,
    })
})


export const FacultyController = {
    createFaculty
}