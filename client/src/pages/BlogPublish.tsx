import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import swal from "sweetalert"

export function BlogPublish(){
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [loading,setloading] = useState(false)
    const navigate = useNavigate()

    const handlePublish = async() =>{
        if(!title || !content){
            swal("Please fill out all required fields.","","error");
            return;
        }
        const wordCount = content.trim().split(/\s+/).length;
        if(wordCount<20){
            swal("Please write at least 20 words in the content.","","error");
            return;
        }
        setloading(true)
        try{
            const response = await axios.post(`${backendUrl}/api/v1/blog`,{
                title,
                content
            },
            {
                headers:{
                    Authorization : "Bearer " + localStorage.getItem('tokenId')
                }
            })
            navigate(`/blog/${response.data.blog.id}`)
        }
        catch(error){
            swal("An error occurred while publishing the blog.", "", "error");
        }
        finally{
            setloading(false)
        }
    }

    return(
        <div className="container flex flex-col">
            <div className="">
                <Input className="px-0 w-full h-20 text-5xl border-none bg-white placeholder:text-[#b3b3b1] focus:outline-none focus:border-transparent" placeholder="Text"
                onChange={(event)=>{
                    setTitle(event.target.value)
                }}></Input>
            </div>
            <div>
            <Textarea style={{ height: '350px' }}  className="px-0 w-full border-none text-xl" placeholder="Tell Your Story..." onChange={(event)=>{
                setContent(event.target.value)
            }} />
            </div>
            <Button className="w-24 bg-[#1a8917] hover:bg-[#1d9719] mt-4" 
            onClick={handlePublish}>{loading ? "Publishing" : "Publish"}</Button>
        </div>
    )
}