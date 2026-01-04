import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { AuthService } from "./auth.service";
import { ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import config from "../../../config";

const loginUser = catchAsync(async(req:Request, res:Response) => {

const {...loginData} = req.body;

const result = await AuthService.loginUser(loginData)

const {refreshToken, ...others} = result;

const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true
}
res.cookie('refreshToken', refreshToken, cookieOptions)

sendResponse<ILoginUserResponse>(res, {
    statusCode: status.OK,
    success: true,
    message: "User login successfully",
    data: others
})
})
const refreshToken = catchAsync(async(req:Request, res:Response) => {

const {refreshToken} = req.cookies;
console.log("refreshToken", refreshToken)
const result = await AuthService.refreshToken(refreshToken)


const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true
}
res.cookie('refreshToken', refreshToken, cookieOptions)

sendResponse<IRefreshTokenResponse>(res, {
    statusCode: status.OK,
    success: true,
    message: "User login successfully",
    data: result
})
})



export const AuthController = {
    loginUser,
    refreshToken
}