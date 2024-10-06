import { BlogCard } from "@/components/BlogCard"
import { useEffect, useState } from "react"
import axios from 'axios'
import { BlogInput } from "@abhi209/blogverse-common";
import { SkeletonDemo } from "@/components/SkeletonComponent";
import { SearchBar } from "@/components/SearchBar";

export function Dashboard(){
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [blogs,setBlogs] = useState([])
    const [loading,setLoading] = useState(true)
    const [filteredBlogs, setFilteredBlogs] = useState<BlogInput[]>([]);

    useEffect(()=>{
        const getBlogs = async() =>{
            try{
                const response = await axios.get(`${backendUrl}/api/v1/blog/bulk`,{
                    headers:{
                        Authorization: "Bearer " + localStorage.getItem('tokenId')
                    }
                })
                const sortedBlogs = response.data.sort((a:{publishedDate: string},b:{publishedDate:string})=> new Date(b.publishedDate).valueOf() - new Date(a.publishedDate).valueOf())
                setBlogs(sortedBlogs)
                setFilteredBlogs(sortedBlogs)
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
            <div>
                <SearchBar blogList={blogs} onFilter={setFilteredBlogs}></SearchBar>
            </div>
            <div>
                {filteredBlogs.length>0 ? (
                    filteredBlogs.map((blog:BlogInput,index)=>(
                        <BlogCard key = {index}
                        authorName={blog.author.name}
                        id = {blog.id}
                        title = {blog.title}
                        content={blog.content}
                        publishedDate = {blog.publishedDate}
                        authorId= {blog.authorId}
                        />
                    ))
                ) : <div>No Blogs matches your search</div>
                }
            </div>
        </div>
    )
}

