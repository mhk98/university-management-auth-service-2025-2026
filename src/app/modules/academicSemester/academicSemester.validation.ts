import z, { string } from "zod";
import { academicSemesterCodes, academicSemesterMonths, academicSemesterTitles } from "./academicSemester.constant";

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


export const AcademicSemesterValidation = {
    createAcademicSemesterZodSchema
}
