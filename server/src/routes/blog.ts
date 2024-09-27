import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify} from 'hono/jwt'
import { blogInput, updateblogInput } from "@abhi209/blogverse-common";

const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string 
        JWT_SECRET: string
     },
     Variables: {
         userId: string
     }
}>()

blogRouter.use('/*',async(c,next)=>{
    try{
        const token = c.req.header("authorization") || ""
        if(!token || !token.startsWith("Bearer ")){
            return c.json({},403)
        }
        const tokenId = token.split(' ')[1]
        const decodedPayload = await verify(tokenId,c.env.JWT_SECRET)
        if(!decodedPayload){
            c.json({error: "UnAuthorized"},403)
        }
        c.set('userId',decodedPayload.id as string)
        await next()
    }
    catch(err){
        return c.json({},403)
    }
})

blogRouter.post('/',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const userId = c.get('userId');
        const {title,content} = await c.req.json()
        const {success} = blogInput.safeParse({
            title,
            content
        })
        if(!success){
            return c.json({
                message: "Input not correct"
            },411)
        }
        const blog = await prisma.post.create({
           data:{
            title,
            content,
            authorId: userId,
            published: true
           }
        }) 
        return c.json({
            message: "Blog Created",
            blog
        })
    }
    catch(err){
        return c.json({message:"Blog not created due to error"},403)
    }
})

blogRouter.put('/',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const {id,title,content} = await c.req.json()
        const {success} = blogInput.safeParse({
            title,
            content,
            id
        })
        if(!success){
            return c.json({
                message: "Input not correct"
            },411)
        }
        const blog = await prisma.post.update({
           where:{
            id: id
           },
           data:{
            title,
            content,
           }
        }) 
        return c.json({
            message: "Blog Updated",
            blog
        })
    }
    catch(err){
        return c.json({message:"Blog not updated due to error"},403) 
    }
})

blogRouter.get('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const userId = c.get('userId');
        const blog = await prisma.post.findMany({
            where:{
                authorId: userId
            }
        })
        return c.json({
            blog
        })
    }
    catch(err){
        return c.json({
            message: "Error while fetching blog post"
        },403) 
    }
})

blogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blog = await prisma.post.findMany({})
    return c.json(
        blog
    )
})

blogRouter.onError((error,c)=>{
    return c.text(`Application Error: ${error}`)
})
  

export default blogRouter;
