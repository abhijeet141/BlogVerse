import { BlogCard } from "@/components/BlogCard"
import { useEffect, useState } from "react"
import axios from 'axios'
import { BlogInput } from "@abhi209/blogverse-common";
import { SkeletonDemo } from "@/components/SkeletonComponent";

export function Dashboard(){
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [blogs,setBlogs] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const getBlogs = async() =>{
            try{
                const response = await axios.get(`${backendUrl}/api/v1/blog/bulk`,{
                    headers:{
                        Authorization: "Bearer " + localStorage.getItem('tokenId')
                    }
                })
                setBlogs(response.data)
            }
            catch(error){
                console.error("Error Fetching Blogs")
            }
            finally{
                setLoading(false)
            }
        }
        getBlogs();
    },[])

    if(loading){
        return (
            <div className="container">
            <SkeletonDemo></SkeletonDemo>
            <SkeletonDemo></SkeletonDemo>
            <SkeletonDemo></SkeletonDemo>
            </div>
        )
    }

    return(
        <div className="container">
            {blogs.map((blog: BlogInput,index)=>(
                 <BlogCard key = {index}
                           authorName={blog.author.name}
                           id = {blog.id}
                           title = {blog.title}
                           content={blog.content}
                           publishedDate = {blog.publishedDate}
                           //@ts-ignore
                           authorId= {blog.authorId}
                           />
            ))}
           
        </div>
    )
}

