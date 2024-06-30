'use client'
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useParams } from "next/navigation";
import { BlogInterface } from "@/Model/Blog";
import Image from "next/image";
import {ExternalLink, ThumbsUp, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
const UserPage = () => {
  const [blogs,setblogs]=useState<[BlogInterface]>();
  const params=useParams();
  const {toast}=useToast()
  const {data:session}=useSession();
  const LoadBlogs=async()=>{
    const response=await axios.post(`http://localhost:3000/api/Get-userWiseData/${params.username}`);
    setblogs(response.data.res);
  }
  useEffect(()=>{
    LoadBlogs();
  },[])
  const DeleteBlog=async(id:string)=>{
    const newobj={
      "user_id":session?.user._id!,
      "blog_id":id
    }
    const res=await axios.post('http://localhost:3000/api/Blog-Delete',newobj);
    LoadBlogs();
    toast({
      title:res.data.message
    })
  } ;
  return (
    <div>
      <div className="flex justify-evenly bg-slate-400">
        <div className="bg-pink-300 flex-1">
          <div>
            <div className="text-7xl p-8">Arijit Das</div>
            <div className="p-8">
              <span>Blogs</span>
              <hr />
            </div>
            <div className="p-8 flex gap-3 flex-wrap">
            {blogs?.map((ele)=>(
              <div>
              <Card className="h-[400px] w-[350px] flex flex-col gap-5">
                <CardHeader>
                  <CardTitle>{ele.title!}</CardTitle>
                  <CardDescription>{ele.sub_title}</CardDescription>
                </CardHeader>
                <div className="flex justify-center h-25">
                  <Image src={ele.img} alt="no-image" height={ele.img?300:200} width={300} className="object-fill"/>
                </div>
                <div className="flex justify-evenly align-middle">
                  <div className="flex justify-center align-middle gap-2">
                <ThumbsUp color="black"/>
                <span>{ele.likecnt.length}</span>
                </div>
                <div className="flex gap-2 hover:cursor-pointer">
                  <Trash onClick={()=>DeleteBlog(ele._id)}/>
                  <ExternalLink/>
                </div>
                </div>
              </Card>
              </div>
            ))}
            </div>
          </div>
          <div></div>
        </div>
        <div className="bg-yellow-300 flex-2 text-4xl">right grid</div>
      </div>
    </div>
  );
};

export default UserPage;
