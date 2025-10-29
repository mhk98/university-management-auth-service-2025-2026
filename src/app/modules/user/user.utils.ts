import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';
export const findLastUserId = async() => {
    const lastUser = await User.findOne({}, {id:1, _id:0}).sort({createdAt:-1}).lean();
return lastUser ?.id;
};

export const generateStudentId = async(academicSemester:IAcademicSemester) => {
    const currentId = await findLastUserId() || (0).toString().padStart(5, '0');
    // return currentId ;

    const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    return incrementedId;
   
};