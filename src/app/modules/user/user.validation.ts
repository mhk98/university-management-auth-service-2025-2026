import z from "zod";

const createUserZodSchema = z.object({
    body: z.object({
        password: z.string().optional(),
        student: z.object({
            name: z.object({
                firstName: z.string({ message: 'First name is required' }),
                lastName: z.string({ message: 'Last name is required' }),
                middleName: z.string().optional(),
            })
        }),
        dateOfBirth: z.string({ message: 'Date of birth is required' }),
        gender: z.enum(['male', 'female'], {
            message: 'Gender is required'
        }),
    })
})


export const UserValidation = {
    createUserZodSchema
}