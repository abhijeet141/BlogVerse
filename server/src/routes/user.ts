import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'
import hashPassword from "../crypto";
import {signInInput, signUpInput} from "@abhi209/blogverse-common"

const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string 
        JWT_SECRET: string
     },
     Variables: {
         userId: string
     }
}>();

userRouter.post('/signup',async(c)=>{    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const {email, password, name} = await c.req.json();
        const {success} = signUpInput.safeParse({
            email,
            password,
            name
        })
        if(!success){
            return c.json({
                message: "Input not correct"
            },411)
        }
        const hashedPassword = await hashPassword(password);
        const User = await prisma.user.create({
         data:{
            email,
            password:hashedPassword,
            name
         }   
        })
        const userData = await prisma.user.findUnique({
            where:{
                email: User.email
            }
        })
        if(userData){
            const payload = {
                id: User.id,
                email: User.email
            }
            const token = await sign(payload,c.env.JWT_SECRET)
            return c.json({
                jwtToken: token
            },200)
        }
    }
    catch(err){
        console.error(err)
        return c.json({
            error: "Error while Signing Up",
        },403)
    }
})

userRouter.post('/signin',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const {email, password} = await c.req.json();
        const {success} = signInInput.safeParse({
            email,
            password
        })
        if(!success){
            return c.json({
                message: "Input not correct"
            },411)
        }
        const hashedPassword = await hashPassword(password);
        const userData = await prisma.user.findUnique({
            where:{
                email: email,
            }
        })
        if(!userData){
            return c.json({
                message: "User not registered! Please SignUp"
            },404)
        }
        if(hashedPassword != userData.password){
            return c.json({
                message: "Invalid credentials. Please try again."
            },401)
        }
        const payload = {
            id: userData.id,
            email: userData.email
        }
        const token = await sign(payload,c.env.JWT_SECRET)
        return c.json({
            jwtToken: token
        },200)
    }
    catch(err){
        console.error(err)
        return c.json({
            error: "Error while Signing In",
        },403)
    }
})

userRouter.onError((error,c)=>{
    return c.text(`Application Error: ${error}`)
})
  

export default userRouter;