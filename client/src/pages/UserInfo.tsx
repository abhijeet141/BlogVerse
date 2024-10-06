import axios from "axios"
import { useEffect, useState } from "react"
import { useParams} from "react-router-dom";
import { BlogCard } from "@/components/BlogCard";
import { BlogInput } from "@abhi209/blogverse-common";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SkeletonUser } from "@/components/SkeletonUser";

export function UserInfo(){
    const {userId} = useParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [blogs,setBlogs] = useState([]);
    const [loading,setLoading] = useState(true)
    const [skeletonView,setSkeletonView] = useState(false)
    useEffect(()=>{
        const getUserInformation = async() => {
            try{
                const response = await axios.get(`${backendUrl}/api/v1/user/${userId}`,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('tokenId')
                    }
                })
                setName(response.data.userData.name)
                setEmail(response.data.userData.email)
            }
            catch(error){
                console.error("Error Fetching User Information")
            }
        }
        const userBlogInformation = async() =>{
            try{
                const response = await axios.get(`${backendUrl}/api/v1/blog/author/${userId}`,{
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
        getUserInformation()
        userBlogInformation()
    },[])

    if(loading){
        return <div className="container">
           <SkeletonUser></SkeletonUser>
        </div>
    }

    return(
        <div className="container">
            <div className="lg:grid lg:grid-cols-3">
            <div className="flex flex-col order-1 justify-center items-center gap-2 py-24 border-b border-black lg:border-b-0 lg:py-2 px-2 lg:border-l lg:min-h-[calc(100vh-75px)]">
                    <div className="font-bold text-2xl xl:text-4xl ">
                        {name}
                    </div>
                    <div className="text-sm xl:text-xl">
                        {email}
                    </div>
                </div>
                <div className="lg:col-span-2 lg:py-2 py-6">
                    {blogs.length>0 ? 
                    <div>
                    <div className="text-2xl font-bold">
                        Blogs You've Created
                    </div>
                    {blogs?.map((blog: BlogInput,index)=>(
                        <BlogCard key = {index}
                                  authorName={blog.author.name}
                                  id = {blog.id}
                                  title = {blog.title}
                                  content={blog.content}
                                  publishedDate = {blog.publishedDate}
                                  authorId={blog.authorId}
                                  showDeleteButton={true}
                                  />
                   ))}
                   </div>
                    :
                    <div className="text-center mt-10 lg:flex lg:flex-col lg:justify-center lg:items-center lg:min-h-[calc(100vh-140px)] ">
                        <h2 className="text-2xl font-semibold">No Blogs Yet</h2>
                        <p className="text-sm sm:text-lg mt-2">It looks like you haven’t written any blogs yet.</p>
                        <p className="text-sm sm:text-lg mt-1">Start sharing your thoughts!</p>
                        <Link to="/new-story">
                            <Button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create Your First Blog</Button>
                        </Link>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}