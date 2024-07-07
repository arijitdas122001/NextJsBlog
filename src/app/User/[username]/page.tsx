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
import {ExternalLink, Heart,Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
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
      <div className="flex justify-evenly ">
        <div className="flex-1">
          <div>
            <div className="text-7xl p-8">Arijit Das</div>
            <div className="p-8 text-2xl">
              <span>Blogs</span>
              <hr />
            </div>
            <div className="p-8 flex gap-3 flex-wrap bg-slate-300 rounded-2xl">
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
                <Heart color="black"/>
                <span>{ele.likecnt.length}</span>
                </div>
                <div className="flex gap-2 hover:cursor-pointer">
                  {session?.user.username===params.username && <Trash onClick={()=>DeleteBlog(ele._id)}/>}
                  <Link href={`/blog/${ele._id}`}><ExternalLink/></Link>
                </div>
                </div>
              </Card>
              </div>
            ))}
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex-2 text-4xl">
          <div>
            <Image src={`https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-854.jpg?t=st=1719863122~exp=1719866722~hmac=6902bffb658a27d8a61252b84ef990418210aafc72c5be8542dd03a74d07a2d4&w=740`} alt="No_user_image" height={200} width={200}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
