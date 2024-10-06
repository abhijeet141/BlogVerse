import { useState, useEffect } from "react";
import { SkeletonDemo } from "@/components/SkeletonComponent";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BlogCard } from "@/components/BlogCard";
import { BlogInput } from "@abhi209/blogverse-common";

export function AuthorPost(){
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [blogs,setBlogs] = useState([])
    const [loading,setLoading] = useState(true)
    const {id} = useParams();

    useEffect(()=>{
        const getAuthorBlogs = async() =>{
            try{
                const response = await axios.get(`${backendUrl}/api/v1/blog/author/${id}`,{
                    headers:{
                        Authorization: "Bearer " + localStorage.getItem('tokenId')
                    }
                })
                setBlogs(response.data.blog.sort((a:{publishedDate: string},b:{publishedDate:string})=> new Date(b.publishedDate).valueOf() - new Date(a.publishedDate).valueOf()))                
            }
            catch(error){
                console.error("Error Fetching Author Blogs")
            }
            finally{
                setLoading(false)
            }
        }
        getAuthorBlogs();
    },[id])

    if(loading){
        return (
            <div className="container">
            <SkeletonDemo></SkeletonDemo>
            <SkeletonDemo></SkeletonDemo>
            <SkeletonDemo></SkeletonDemo>
            </div>
        )
    }


    return (
        <div className="container">
            {blogs.map((blog: BlogInput,index)=>(
                 <BlogCard key = {index}
                           authorName={blog.author.name}
                           id = {blog.id}
                           title = {blog.title}
                           content={blog.content}
                           publishedDate = {blog.publishedDate}
                           authorId={blog.authorId}
                           showDeleteButton={false}
                           />
            ))}
        </div>
    )
}