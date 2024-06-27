"use client";
import { BlogInterface } from "@/Model/Blog";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { FeedBack, InterMessage } from "@/Model/Comment";
const Blog = () => {
  const params = useParams();
  const blog_id = params.id;
  const { toast } = useToast();
  const [loading, setloading] = useState(false);
  const [data, setData] = useState<BlogInterface>();
  const [showcomment, setshowcomment] = useState(false);
  const [comments, setComments] = useState<FeedBack>();
  const [description, setdescription] = useState("");
  const [error, seterror] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    setloading(true);
    const fetchData = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/Get-Blog/${blog_id}`
        );
        setData(res.data.blog);
        setdescription(res.data.blog.description);
        // console.log(data);
      } catch (error) {
        seterror(true);
        setloading(false);
        toast({
          title: "Failure",
          description: "Failed to Fetch the blog",
          variant: "destructive",
        });
      }
    };
    fetchData();
    setloading(false);
  }, [blog_id]);
  const date = new Date(data?.createdAt!).toLocaleDateString();
  const handelClick = async () => {
    setshowcomment(!showcomment);
    // console.log(showcomment);
    const commentsRes = await axios.post(
      `http://localhost:3000/api/Fetch-Comments/${blog_id}`
    );
    setComments(commentsRes.data.model);
    console.log(comments)
  };
  return (
    <div className="flex flex-col min-h-screen items-center justify-center h-full relative">
      {showcomment && (
        <div className="absolute top-0 left-2/3 bg-gray-500">
          {comments?.Comments.map((ele, i) => (
            <div key={i}>
              <div>{ele.give_username}</div>
              <div>{ele.comment}</div>
            </div>
          ))}
        </div>
      )}
      <div className="w-full max-w-screen-lg space-y-8 bg-white p-6  flex-2">
        <div className="text-4xl font-bold">{data?.title}</div>
        <div>
          <div className="text-xl">{data?.username}</div>
          <div className="flex gap-3">
            <span>2 min read</span>
            <span>.</span>
            <span>{date}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <hr className="bg-black" />
          <div className="flex gap-3 font-bold">
            <div>Like</div>
            <Button className="hover:cursor-pointer" onClick={handelClick}>
              Comment
            </Button>
          </div>
          <hr />
        </div>
        <div className="flex justify-center">
          <Image src={data?.img!} height={300} width={500} alt="No image" />
        </div>
        {/* <div dangerouslySetInnerHTML={{ __html: data?.description!}}></div> */}
        <div>{parse(description)}</div>
        <div className="flex flex-col gap-2">
          <hr className="bg-black" />
          <div>
            <div className="flex gap-3 font-bold">
              <div>Like</div>
              <div>Comment</div>
            </div>
          </div>
          <hr className="bg-black" />
        </div>
      </div>
    </div>
  );
};

export default Blog;
