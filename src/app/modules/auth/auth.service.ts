import status from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import jwt, { Secret } from 'jsonwebtoken'
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse, IJwtPayload } from "./auth.interface";


const loginUser = async (payload:ILoginUser): Promise<ILoginUserResponse> => {

    const {id, password} = payload;

    const user = new User()

    //check user exist
    const isUserExist = await user.isUserExist(id)

    if(!isUserExist){
        throw new ApiError(status.NOT_FOUND, 'User not exist')
    }


    if(isUserExist.password && !(await user.isPasswordMatch(password, isUserExist.password))){
        throw new ApiError(status.UNAUTHORIZED, 'Unauthorized user')
    }

    const {id:userId, role, needsPasswordChange} = isUserExist;

    //create access token
 const accessToken =  jwtHelpers.createToken({userId, role}, config.jwt.secret as Secret, config.jwt.expires_in as string)
 const refreshToken =  jwtHelpers.createToken({userId, role}, config.jwt.refresh_secret as Secret, config.jwt.refresh_expires_in as string)

console.log(userId, role , needsPasswordChange)

    return {
        accessToken, refreshToken, needsPasswordChange
        
    }
}



const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {

    let verifiedToken = null;
try {
  verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret as Secret) as IJwtPayload;

} catch(err) {
  throw new ApiError(status.FORBIDDEN, 'Invalid refresh token')
}

const user = new User()

const {userId} = verifiedToken;

const isUserExist = await user.isUserExist(userId)

if(!isUserExist){
    throw new ApiError(status.NOT_FOUND, 'User doest not exist')
}

//generate new token
const newAccessToken = jwtHelpers.createToken({
    id:isUserExist?.id, role:isUserExist?.role
},
config.jwt.refresh_secret as Secret,
config.jwt.refresh_expires_in as string
 )

 return {
    accessToken: newAccessToken
 }
}


export const AuthService = {
    loginUser,
    refreshToken
}