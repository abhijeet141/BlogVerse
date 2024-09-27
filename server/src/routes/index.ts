import { Hono } from "hono";
import userRouter from "./user";
import blogRouter from "./blog";

const router = new Hono<{
    Bindings: {
       DATABASE_URL: string 
       JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();


router.route('/user',userRouter)
router.route('/blog',blogRouter)

router.onError((error,c)=>{
    return c.text(`Application Error: ${error}`)
})
  

export default router;