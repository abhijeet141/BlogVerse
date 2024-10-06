import { Link, useNavigate } from "react-router-dom"
import { FormatDate } from "./FormatDate"
import { CalculateReadingTime } from "./CalculateReadingTime"
import { stripHtmlTags } from "./StripHtmlTags"
import { Button } from "./ui/button"
import axios from "axios"
import swal from "sweetalert"

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
    const handleClick = async() => {
        try{
            await axios.delete(`${backendUrl}/api/v1/blog/${id}`,{
                headers:{
                    Authorization: "Bearer " + localStorage.getItem('tokenId')
                }
            })
            swal("Blog deleted successfully","","success")
            navigate(`/user/${authorId}`)

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
                    <div className="flex">
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