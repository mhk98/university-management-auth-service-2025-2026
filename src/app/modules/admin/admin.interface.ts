import { Model, Types } from 'mongoose'
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface'

export type UserName = {
  firstName: string
  lastName: string
  middleName?: string
}

export type IAdmin = {
  id: string
  name: UserName
  dateofBirth?: string
  gender: 'male' | 'female'
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  email: string
  contactNo: string
  emergencyContactNo: string
  permanentAddress?: string
  presentAddress?: string
  profileImage?: string
  designation: string
  managementDepartment: Types.ObjectId | IManagementDepartment
}

export type IAdminFilter = {
searchTerm?: string,
  id?: string,
  bloodGroup?: string,
  email?: string,
  contactNo?: string,
  emergencyContactNo?: string,
}

export type AdminModel = Model<IAdmin, Record<string, unknown>>
