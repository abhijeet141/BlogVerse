import { Link } from "react-router-dom"
import { FormatDate } from "./FormatDate"
import { CalculateReadingTime } from "./CalculateReadingTime"

interface BlogCardProps{
    authorName: string,
    title: string,
    content: string, 
    publishedDate: string
    id: string,
    authorId: string
}

export function BlogCard({
    authorName,
    title,
    content, 
    publishedDate,
    id,
    authorId
}:BlogCardProps){
    const date = FormatDate(publishedDate)
    const minute = CalculateReadingTime(content)
    return(
        <Link to={`/blog/${id}`}>
              <div className="flex border-b border-black py-6 cursor-pointer">
            <div className="flex flex-col justify-center">
                <div>
                    <div className="hover:underline hover:underline-offset-2 cursor-pointer"><Link to={`/blog/author/${authorId}`}>{authorName}</Link></div>
                </div>
                <div className="text-3xl font-bold py-3">
                    {title}
                </div>
                <div className="text-lg text-slate-700">
                    {content.length>100 ? content.slice(0,100) + "..." : content}
                </div>
                <div className="flex">
                <div className="pt-4">
                    {date}
                </div>
                <div className="pt-4 pl-4">
                    {`${minute} min read`}
                </div>
                </div>
            </div>
            {/* <div>
                Image Component
            </div> */}
        </div>
        </Link>
    )
}