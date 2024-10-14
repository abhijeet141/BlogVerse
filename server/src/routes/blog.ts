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
            publishedDate: new Date(),
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
        const {success} = updateblogInput.safeParse({
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
            publishedDate: new Date(),
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
    const blogs = await prisma.post.findMany({
        select:{
            title: true,
            content: true,
            id: true,
            authorId: true,
            publishedDate: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })
    return c.json(
        blogs
    )
})

blogRouter.get('/:id',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const queryId = c.req.param('id')
    const blog = await prisma.post.findUnique({
        where:{
            id: queryId
        },
        select:{
            title: true,
            content: true,
            id: true,
            authorId: true,
            publishedDate: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })
    return c.json({
        blog
    })    
})

blogRouter.get('/author/:authorId',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const queryId = c.req.param('authorId')
    const blog = await prisma.post.findMany({
        where:{
            authorId: queryId
        },
        select:{
            title: true,
            content: true,
            id: true,
            publishedDate: true,
            authorId:true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })
    return c.json({
        blog
    })    
})

blogRouter.delete('/:postId',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const postId = c.req.param('postId')
    try{
        const blog = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!blog) {
            return c.json({ message: "Blog not found" }, 404);
        }

        await prisma.postLike.deleteMany({
            where: {
                postId: postId
            }
        });

        await prisma.post.delete({
            where:{
                id: postId
            }
        })
        return c.json({
            message: "Blog deleted sucessfully"
        })
    }
    catch(error){
        return c.json({
            message: "Error while deleting Blog"
        },403)
    }
})

blogRouter.post('/:postId/like',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const postId = c.req.param('postId')
    
    const userId = c.get('userId');


    const {likedState} = await c.req.json()

    try{
        const blog = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        if(!blog){
            return c.json({
                message: "Blog not found"
            },404)
        }

        if(likedState){
            await prisma.postLike.create({
                data:{
                    postId: postId,
                    authorId: userId
                }
            })

            const updateBlog = await prisma.post.update({
                where:{
                    id: postId
                },
                data:{
                    likesCount:{increment: 1}
                }
            })
            return c.json(updateBlog)
        }
        else{
            const existingLike = await prisma.postLike.findUnique({
                where:{
                    postId_authorId:{
                        postId: postId,
                        authorId: userId
                    }
                }
            })

            if(!existingLike){
                return c.json({
                    message: "Cannot unlike a post you haven't liked",
                }, 400);
            }

            await prisma.postLike.delete({
                where:{
                    postId_authorId:{
                        postId: postId,
                        authorId: userId
                    }
                }
            })

            if(blog.likesCount>0){
                const updateBlog = await prisma.post.update({
                    where: {
                        id: postId
                    },
                    data:{
                        likesCount: {decrement: 1}
                    }
                })
                return c.json(updateBlog)
            }
            else{
                return c.json({
                    message: "Post has 0 likes"
                },400)
            }
        }
    }
    catch(error){
        return c.json({
            message: "Error while liking or unliking Blog"
        },500)
    }
})

blogRouter.get('/:postId/like-state', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const postId = c.req.param('postId')
    const userId = c.get('userId');

    try{
        const blog = await prisma.post.findUnique({
            where:{
                id: postId
            }
        })
        const liked = await prisma.postLike.findUnique({
            where:{
                postId_authorId:{
                    postId: postId,
                    authorId: userId
                }
            }
        })
        return c.json({
            blog: blog,
            liked: !!liked
        })
    }
    catch(error){
        return c.json({ message: "Error fetching liked state" }, 500);
    }

})

blogRouter.onError((error,c)=>{
    return c.text(`Application Error: ${error}`)
})
  

export default blogRouter;
