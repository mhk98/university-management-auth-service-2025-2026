import z from 'zod'

const createManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({ message: 'Title is required' }),
  }),
})

export const ManagementDepartmentValidation = {
  createManagementDepartmentZodSchema,
}
