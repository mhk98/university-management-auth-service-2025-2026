import z from "zod";

const loginZodSchema = z.object({
    body: z.object({
        id: z.string({
            message:"Id is required"
        }),
        password: z.string({
            message:"Password is required"
        })
    })
})

export const AuthValidation = {
    loginZodSchema
}