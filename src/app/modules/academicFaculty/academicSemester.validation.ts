import z, { string } from "zod";
import { academicSemesterCodes, academicSemesterMonths, academicSemesterTitles } from "./academicFaculty.constant";

const createAcademicSemesterZodSchema = z.object({
    body: z.object({
       title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
        message: 'Title is required',
       }),
         year: z.string({
           message: 'Year is required',
         }),
            code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
              message: 'Code is required',
            }),
            startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
              message: 'Start month is required',
            }),
            endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
              message: 'End month is required',
            }),

    })
})

const updateAcademicSemesterZodSchema = z.object({
    body: z.object({
       title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
        message: 'Title is required',
       }),
         year: z.string({
           message: 'Year is required',
         }).optional(),
            code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
              message: 'Code is required',
            }).optional(),
            startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
              message: 'Start month is required',
            }).optional(),
            endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
              message: 'End month is required',
            }).optional(),

    })
}).refine(data => (data.body.title && data.body.code) || 
(!data.body.title && data.body.code),
{
  message: 'Either both title and code should be provided or neither'
}
)


export const AcademicSemesterValidation = {
    createAcademicSemesterZodSchema,
    updateAcademicSemesterZodSchema
}
