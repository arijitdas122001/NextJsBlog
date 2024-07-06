'use client'
import Blogcard from '@/components/Blogcard';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { ExternalLink, ThumbsUp, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
const AllBlogs = () => {
    const [allBlogs,setAllBlogs]=useState<[]>([]);
    const {toast}=useToast();
    const params=useParams();
    useEffect(()=>{ 
        const FetchAllBlogs=async()=>{
        try{
            const res=await axios.post(`http://localhost:3000/api/AllBlog-Get/${params.blogtype}`);
            const obj=res.data;
            console.log(obj.All_Blogs);
            setAllBlogs(obj.All_Blogs);
            // console.log(allBlogs)
        }
        catch (error) {
            toast({
                title:"Failure",
                description:"Failed to fetch data",
                variant:'destructive'
            })
        }
        }
        FetchAllBlogs();
    },[])
  return (
    <div className="flex flex-col gap-2 justify-center flex-wrap bg-cyan-900 min-h-screen">
      <BackgroundBeams/>
      <div className="flex justify-center">
        <div className="text-6xl text-white">{params.blogtype==="all"?"All Blogs":`Result for ${params.blogtype}`}</div>
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        {allBlogs.map((ele:any,i)=>(
          <div key={i} className="mt-5">
              <Card className="h-[400px] w-[350px] flex flex-col gap-5">
                <CardHeader>
                  <CardTitle>{ele.title!}</CardTitle>
                  <CardDescription>{ele.sub_title}</CardDescription>
                </CardHeader>
                <div className="flex justify-center h-25">
                  <Image src={ele.img} alt="no-image" height={ele.img?100:200} width={300} className="object-fill"/>
                </div>
                <div className="flex justify-evenly align-middle">
                  <div className="flex justify-center align-middle gap-2">
                <ThumbsUp color="black"/>
                <span>{ele.likecnt.length}</span>
                </div>
                <div className="flex gap-2 hover:cursor-pointer">
                  <ExternalLink/>
                </div>
                </div>
              </Card>
          </div>
        ))}
        </div>
    </div>
  )
}

export default AllBlogs
