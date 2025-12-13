import z from 'zod'
import { bloodGroups, gender } from './user.constant'

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ message: 'First name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ message: 'Last name is required' }),
      }),

      gender: z.enum([...gender], {
        message: 'Gender is required',
      }),
      dateOfBirth: z.string({ message: 'Date of birth is required' }),
      email: z.string({ message: 'Email is required' }).email(),
      contactNo: z.string({ message: 'Contact no is required' }),
      emergencyContactNo: z.string({
        message: 'Emergency contact no is required',
      }),
      bloodGroup: z.enum([...bloodGroups]).optional(),
      presentAddress: z.string({ message: 'Present address is required' }),
      permanentAddress: z.string({ message: 'Permanent address is required' }),
      academicSemester: z.string({ message: 'Academic semester is required' }),
      academicDepartment: z.string({
        message: 'Academic department is required',
      }),
      academicFaculty: z.string({ message: 'Academic faculty is required' }),
      guardian: z.object({
        fatherName: z.string({ message: 'Father name is required' }),
        fatherOccupation: z.string({
          message: 'Father occupation is required',
        }),
        fatherContactNo: z.string({ message: 'Father contact no is required' }),
        motherName: z.string({ message: 'Mother name is required' }),
        motherOccupation: z.string({
          message: 'Mother occupation is required',
        }),
        motherContactNo: z.string({ message: 'Mother contact no is required' }),
        address: z.string({ message: 'Guardian address is required' }),
      }),

      localGuardian: z.object({
        name: z.string({ message: 'Local guardian name is required' }),
        occupation: z.string({
          message: 'Local guardian occupation is required',
        }),
        contactNo: z.string({
          message: 'Local guardian contact no is required',
        }),
        address: z.string({ message: 'Local guardian address is required' }),
      }),
      profileImage: z
        .string({ message: 'Profile image is required' })
        .optional(),
    }),
  }),
})


const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        middleName: z.string().optional(),
      }),
      gender: z.enum([...gender]).optional(),
      dateofBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      bloodGroup: z.enum([...bloodGroups]).optional(),
      designation: z.string().optional(),
      profileImage: z.string().optional(),
    }),
  }),
})


const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({ message: 'First name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ message: 'Last name is required' }),
      }),

      gender: z.enum([...gender], {
        message: 'Gender is required',
      }),
      dateOfBirth: z.string({ message: 'Date of birth is required' }),
      email: z.string({ message: 'Email is required' }).email(),
      contactNo: z.string({ message: 'Contact no is required' }),
      emergencyContactNo: z.string({
        message: 'Emergency contact no is required',
      }),
      bloodGroup: z.enum([...bloodGroups]).optional(),
      presentAddress: z.string({ message: 'Present address is required' }),
      permanentAddress: z.string({ message: 'Permanent address is required' }),
      designation: z.string({ message: 'Designation is required' }),

      managementDepartment: z.string({
        message: 'Management department is required',
      }),
      profileImage: z
        .string({ message: 'Profile image is required' })
        .optional(),
    }),
  }),
})

export const UserValidation = {
  createUserZodSchema,
  createAdminZodSchema,
  createFacultyZodSchema
}
