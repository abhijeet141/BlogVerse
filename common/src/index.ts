import z from "zod"

export const signUpInput = z.object({
    email: z.string().email(),
    password: z.string().min(5),
    name: z.string()
})

export type SignUpInput = z.infer<typeof signUpInput>

export const signInInput = z.object({
    email: z.string().email(),
    password: z.string().min(5),
})

export type SignInInput = z.infer<typeof signInInput>

export const blogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string(),
    author: z.object({
        name: z.string()
    }),
    publishedDate: z.string(),
    authorId: z.string()
})

export type BlogInput = z.infer<typeof blogInput>

export const updateblogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

export type updateBlogInput = z.infer<typeof updateblogInput>

