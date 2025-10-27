import z from 'zod'

const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      message: 'Title is required',
    }),
    academicFaculty: z.string({
      message: 'AcademicDepartment is required',
    }),
  }),
})

const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        message: 'AcademicDepartment is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        message: 'AcademicDepartment is required',
      })
      .optional(),
  }),
})

export const AcademicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
}
