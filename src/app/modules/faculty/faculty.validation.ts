import z from 'zod'
import { bloodGroups, gender } from './faculty.constant'

const updateFacultyZodSchema = z.object({
  body: z.object({
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
})

export const FacultyValidation = {
  updateFacultyZodSchema,
}
