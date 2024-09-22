import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign,verify} from 'hono/jwt'
import hashPassword from "../crypto";


const router = new Hono<{
    Bindings: {
       DATABASE_URL: string 
       JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

router.use('/blog/*',async(c,next)=>{
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
})


router.post('/signup',async(c)=>{    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const {email, password, name} = await c.req.json();
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

router.post('/signin',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const {email, password} = await c.req.json();
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

router.get('/blog',(c)=>{
    const userId = c.get('userId');
    return c.json({
        userId
    })
})

router.post('/blog',(c)=>{    
    return c.text(
        "Blog Request"
    )
})

router.put('/blog',(c)=>{
    return c.text(
        "Blog Created"
    )
})

router.get('/blog/:id',(c)=>{
    return c.json(
        {message:
        "Hello Hono"
    })
})

router.onError((error,c)=>{
    return c.text(`Application Error: ${error}`)
  })
  

export default router;