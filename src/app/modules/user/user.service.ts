import config from '../../../config';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';



const createUser = async(user:IUser): Promise<IUser | null> => {

    //Automatically generate an ID if not provided
    //Default password handling can be added later

 
    const id = await generateFacultyId();
    if (!id) {
        throw new Error('Failed to generate user id');
    }
    user.id = id;
    
    if(!user.password){
        user.password = config.default_user_pass as string;
    }
    const createdUser = await User.create(user);

    if(!createdUser){
        throw new Error('Failed to create user');
    }

    return createdUser;
};


export const UserService = {
    createUser
};