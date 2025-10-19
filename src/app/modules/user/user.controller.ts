import {  NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';


const createUser:RequestHandler = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
 
        const result = await UserService.createUser(req.body);


        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: result,
        });

        next()

   
})

export const UserController = {
    createUser
};
