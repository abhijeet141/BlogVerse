import { useEffect, useState } from "react";
import { Input } from "./ui/input";

interface BlogProps {
    title: string;
    content: string;
    id: string;
    author: { name: string };
    publishedDate: string;
    authorId: string;
  }

interface searchBarProps{
    blogList: BlogProps[],
    onFilter: (filteredBlogs:BlogProps[])=>void
}

export function SearchBar({blogList,onFilter}:searchBarProps){
    const [blog,setBlog] = useState('');
    useEffect(()=>{
        const filteredBlogs = blogList.filter(blogs => blogs.title.toLowerCase().includes(blog.toLowerCase()))
        onFilter(filteredBlogs)
    },[blog,blogList,onFilter])
    return(
        <div className="pt-4">
            <Input type="text" placeholder="Search by blog title..." className="w-full sm:w-full" onChange={(e)=>{
                setBlog(e.target.value)
            }}></Input>
        </div>
    )
}