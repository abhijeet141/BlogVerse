import { Link, useNavigate } from "react-router-dom"
import { FormatDate } from "./FormatDate"
import { CalculateReadingTime } from "./CalculateReadingTime"
import { stripHtmlTags } from "./StripHtmlTags"
import { Button } from "./ui/button"
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import axios from "axios"
import swal from "sweetalert"
import { useEffect, useState } from "react"

interface BlogCardProps{
    authorName: string,
    title: string,
    content: string, 
    publishedDate: string
    id: string,
    authorId: string,
    showDeleteButton: boolean
}

function removeInlineStyles(content:string) {
    return content.replace(/style="[^"]*"/g, '');
}

export function BlogCard({
    authorName,
    title,
    content, 
    publishedDate,
    id,
    authorId,
    showDeleteButton,
}:BlogCardProps){
    const date = FormatDate(publishedDate)
    const minute = CalculateReadingTime(content)
    const strippedContent = stripHtmlTags(content)
    const longContent = strippedContent.length>150   
    const cleanedContent = removeInlineStyles(strippedContent);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()
    const [liked,setLiked] = useState(false)
    const [likesCount,setLikesCount] = useState(0)
    
    useEffect(()=>{
        const fetchLikeState = async() => {
            try{
                const response = await axios.get(`${backendUrl}/api/v1/blog/${id}/like-state`,{
                    headers:{
                        Authorization: "Bearer " + localStorage.getItem('tokenId')
                    }
                })
                setLiked(response.data.liked)
                setLikesCount(response.data.blog.likesCount)
            }
            catch(error){
                console.error('Error fetching liked state',error);
            }
        }
        fetchLikeState()
    },[id])

    const handleToggle = async(e: React.MouseEvent) =>{
        e.stopPropagation();
        const newLikedState = !liked
        setLiked(newLikedState)
        try{
            const response = await axios.post(`${backendUrl}/api/v1/blog/${id}/like`,{
                likedState: newLikedState
            },
            { headers:{
                Authorization: "Bearer " + localStorage.getItem('tokenId')
            }})
            setLikesCount(response.data.likesCount)
        }
        catch(error){
            console.error('Error toggling like:', error)
        }
    }

    const handleClick = async(e: React.MouseEvent) => {
        e.stopPropagation(); 
        try{
            await axios.delete(`${backendUrl}/api/v1/blog/${id}`,{
                headers:{
                    Authorization: "Bearer " + localStorage.getItem('tokenId')
                }
            })
            swal("Blog deleted successfully","","success")
            navigate('/')
        }
        catch(error){
            swal('Error Deleting Blog',"","error");
        }
    }
    return(
        <div className="flex border-b border-black py-6 cursor-pointer" onClick={()=>navigate(`/blog/${id}`)}>
             <div className="flex flex-col justify-center">
                <div>
                    <div className="hover:underline hover:underline-offset-2 cursor-pointer"><Link to={`/blog/author/${authorId}`} onClick={(e)=>{e.stopPropagation()}}>{authorName}</Link></div>
                </div>
                <div className="text-3xl font-bold py-3">
                    {title}
                </div>
                <div>
                    {longContent ? <div className="text-lg text-slate-700" dangerouslySetInnerHTML={{__html: cleanedContent.slice(0,150) + "..." }}></div>
                    :<div className="text-lg text-slate-700" dangerouslySetInnerHTML={{__html: cleanedContent}}></div>}
                </div>
                <div className="sm:flex justify-between items-center mr-4">
                    <div className="flex items-center">
                        <div className="pt-4 pr-2">
                        {liked ? (
                            <IoIosHeart className="text-red-500" onClick={handleToggle}/>    
                        ):(
                            <IoIosHeartEmpty className="text-black"  onClick={handleToggle}/>
                        )}
                        
                        </div>
                        <div className="pt-4 pr-4 text-sm">
                            {likesCount}
                        </div>
                        <div className="pt-4 text-sm">
                            {date}
                        </div>
                        <div className="pt-4 pl-4 text-sm">
                             {`${minute} min read`}
                        </div>
                    </div>
                    {showDeleteButton && <div className="mt-2">
                        <Button variant={'destructive'} onClick={handleClick} className="cursor-pointer">Delete Blog</Button>
                    </div>}
                </div>
            </div>
            {/* <div>
                Image Component
            </div> */}
        </div>
    )
}