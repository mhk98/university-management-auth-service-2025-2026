import status from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from 'bcrypt'

const loginUser = async (payload:IUser) => {

    const {id, password} = payload;

    const user = new User()

    //check user exist
    const isUserExist = await user.isUserExist(id)

    if(!isUserExist){
        throw new ApiError(status.NOT_FOUND, 'User not exist')
    }


    if(isUserExist.password && !user.isPasswordMatch(password, isUserExist.password)){
        throw new ApiError(status.UNAUTHORIZED, 'Unauthorized user')
    }


    //create access token
    return {
        isUserExist?.needsPasswordChange
    }
}