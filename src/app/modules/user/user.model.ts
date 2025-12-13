import { Schema, model } from 'mongoose'
import { IUser, UserMethods, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'
// Optional: Define methods or statics later

const userSchema = new Schema<IUser, Record<string, never>, UserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select:0
    },
    needsPasswordChange: {
    type: Boolean,
    default: true
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin:{
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

userSchema.methods.isUserExist = async function (id:string): Promise<Partial<IUser> | null> {
const user = await User.findOne ({id}, {id:1, needsPasswordChange:1}).lean();

return user
}


userSchema.methods.isPasswordMatch = async function (givenPassword:string, savedPassword:string): Promise<boolean>  {
const isMatched = await bcrypt.compare(givenPassword, savedPassword);
return isMatched;
}



userSchema.pre('save', async function (next){
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  next();
})
export const User = model<IUser, UserModel>('User', userSchema)
