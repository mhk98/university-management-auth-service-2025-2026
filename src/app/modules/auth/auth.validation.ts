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

const refreshTokenZodSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            message:"Refresh token is required"
        }),
       
    })
})

export const AuthValidation = {
    loginZodSchema,
    refreshTokenZodSchema
}