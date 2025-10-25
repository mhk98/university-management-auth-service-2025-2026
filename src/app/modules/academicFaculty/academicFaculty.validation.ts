import z, { string } from "zod";

const createAcademicFacultyZodSchema = z.object({
    body: z.object({
       
      title: z.string({
        message: 'Title is required',
      })
    })
})

const updateAcademicFacultyZodSchema = z.object({
    body: z.object({
       
      title: z.string({
        message: 'Title is required',
      })
    })
})




export const AcademicFacultyValidation = {
    createAcademicFacultyZodSchema,
    updateAcademicFacultyZodSchema

}
