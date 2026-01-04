// import { NextFunction, Request, Response } from "express";
// import ApiError from "../errors/ApiError";
// import status from "http-status";
// import { jwtHelpers } from "../helpers/jwtHelpers";
// import config from "../config";
// import { Secret } from "jsonwebtoken";

// export const auth = (...requireRoles: string[]) => async (req:Request, res:Response, next: NextFunction) =>{

//     try {
//     const token = req.headers.authorization
        
//     if(!token){
//         throw new ApiError(status.UNAUTHORIZED, 'You are not authorized')
//     }

//     let verifiedUser = null

//     verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)

//     if(!verifiedUser){
//         throw new ApiError(status.FORBIDDEN, 'Invalid token')
//     }

//     req.user = verifiedUser

//    // Ensure verifiedUser exists and check if their role is in the allowed list
// const userRole = (verifiedUser as any)?.role;

// if (requireRoles.length > 0 && !requireRoles.includes(userRole)) {
//     throw new ApiError(status.FORBIDDEN, 'Forbidden');
// }

//     next()
//     } catch (error) {
//         next(error)
//     }
// }


import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import status from "http-status";
import { jwtHelpers } from "../helpers/jwtHelpers";
import config from "../config";
import { Secret, JwtPayload } from "jsonwebtoken";
import { IJwtPayload } from "../app/modules/auth/auth.interface";

// Define the shape we expect

export const auth = (...requireRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            throw new ApiError(status.UNAUTHORIZED, 'You are not authorized');
        }

        // 1. Verify and cast the token
        const verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret) as IJwtPayload;

        if (!verifiedUser) {
            throw new ApiError(status.FORBIDDEN, 'Invalid token');
        }

        // 2. Assign to req.user (This works because of your 'declare global' setup)
        req.user = verifiedUser;

        // 3. Role-based check
        if (requireRoles.length > 0 && !requireRoles.includes(verifiedUser.role)) {
            throw new ApiError(status.FORBIDDEN, 'Forbidden');
        }

        next();
    } catch (error) {
        next(error);
    }
}