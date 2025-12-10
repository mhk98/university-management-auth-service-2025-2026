import { model, Schema } from 'mongoose'
import { AdminModel, IAdmin } from './admin.interface'

export const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    dateofBirth: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
    },
    presentAddress: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    designation: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'ManagementDepartment', // like HR, Finance etc
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema)
