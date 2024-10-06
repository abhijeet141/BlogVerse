import { Link } from "react-router-dom"
import { FormatDate } from "./FormatDate"
import { CalculateReadingTime } from "./CalculateReadingTime"
import { stripHtmlTags } from "./StripHtmlTags"

interface BlogCardProps{
    authorName: string,
    title: string,
    content: string, 
    publishedDate: string
    id: string,
    authorId: string
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
    authorId
}:BlogCardProps){
    const date = FormatDate(publishedDate)
    const minute = CalculateReadingTime(content)
    const strippedContent = stripHtmlTags(content)
    const longContent = strippedContent.length>150   
    const cleanedContent = removeInlineStyles(strippedContent);
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
                <div>
                    {longContent ? <div className="text-lg text-slate-700" dangerouslySetInnerHTML={{__html: cleanedContent.slice(0,150) + "..." }}></div>
                    :<div className="text-lg text-slate-700" dangerouslySetInnerHTML={{__html: cleanedContent}}></div>}
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