import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const loginUser = catchAsync(async(req:Request, res:Response) => {
console.log(req.body)

const {...loginData} = req.body;

const result = await AuthService.loginUser(loginData)

sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User login successfully",
    data: result
})
})


export const AuthController = {
    loginUser
}