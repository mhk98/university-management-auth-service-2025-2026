import {  NextFunction, Request, RequestHandler, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import pick from '../../../shared/pick';
import { IAcademicSemester } from './academicSemester.interface';



const createSemester = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
   
        const result = await AcademicSemesterService.createSemester(req.body);

      sendResponse<IAcademicSemester>(res, 
        {
            statusCode: status.OK,
            success: true,
            message: 'Semester created successfully',
            data: result,
        }
      )

        next()
  
})


const getAllSemester = catchAsync(async(req, res, next) => {

    const paginationOptions = pick(req.query, paginationFields)

    const filters = pick(req.query, ['searchTerm'])

    console.log(paginationOptions)

    const result = await AcademicSemesterService.getAllSemester(filters, paginationOptions)

      sendResponse<IAcademicSemester[]>(res, 
        {
            statusCode: status.OK,
            success: true,
            message: 'Semester retrived successfully',
            meta: result.meta,
            data: result.data,
        }
      )

      next()


})

export const AcademicSemesterController = {
    createSemester,
    getAllSemester
};
