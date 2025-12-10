import z from 'zod'

const createManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({ message: 'Title is required' }),
  }),
})

const updateManagementDepartmentZodSchema = z.object({
  body: z
    .object({
      title: z.string({ message: 'Title is required' }),
    })
    .optional(),
})

export const ManagementDepartmentValidation = {
  createManagementDepartmentZodSchema,
  updateManagementDepartmentZodSchema,
}
