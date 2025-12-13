import z from "zod";
import { bloodGroups, gender } from "./admin.constant";

const updateAdminZodSchema = z.object({
  body: z.object({
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
})

export const AdminValidation = {
    updateAdminZodSchema
}