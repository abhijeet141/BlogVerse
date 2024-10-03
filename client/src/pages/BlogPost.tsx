import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { SkeletonPostDemo } from "@/components/SkeletonPostDemo";
import { FormatDate } from "@/components/FormatDate";
import { CalculateReadingTime } from "@/components/CalculateReadingTime";

interface BlogProps{
    author: {name: string},
    title: string,
    content: string,
    publishedDate: string,
    authorId: string
}

export function BlogPost() {
  const [blog, setBlog] = useState<BlogProps | null>(null); 
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const getBlogDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/blog/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tokenId"),
          },
        });
        setBlog(response.data.blog);        
      } catch (error) {
        console.error("Error Fetching Blog Details");
      } finally {
        setLoading(false);
      }
    };
    getBlogDetails();
  }, [id]);


  if (loading) {
    return <div className="container"><SkeletonPostDemo></SkeletonPostDemo></div>;
  }

  if (!blog) {
    return <div className="container">No blog found</div>;
  }

  return (
    <div className="container flex flex-col">
      <div className="text-3xl font-bold py-6">{blog.title}</div>
      <div>
      <div className="cursor-pointer hover:underline underline-offset-2">
      <Link to={`/blog/author/${blog.authorId}`}>{blog.author.name}</Link>
      </div>
      <div className="flex py-6">
        <div>
        {`${CalculateReadingTime(blog.content)} min read`}
        </div>
        <div className="pl-4">
            {FormatDate(blog.publishedDate)}
        </div>
      </div>
      </div>
      {/* <div className="py-6">Blog Image</div> */}
      <div className="text-lg text-slate-700 text-justify" dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
  );
}
