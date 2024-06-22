'use client'
import Post_Form from "@/components/Post-Form";
import axios from "axios";
import {useParams} from "next/navigation";
import { useEffect, useState } from "react";
const page = () => {
  const params=useParams();
  const blogid=params.blogid;
  const [post,setpost]=useState();
  useEffect(()=>{
    const onSubmit=async()=>{
    const res=await axios.post(`http://localhost:3000/api/Get-Blog/${blogid}`);
    // console.log(res.data)
    setpost(res.data.blog);
    }
    onSubmit();
  },[])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-400">
      <div className="bg-gray-100 p-20 rounded-xl">
        <div className="text-center text-4xl">Upload your thoughts from here</div>
        <Post_Form post={post}/>
      </div>
    </div>
  );
};

export default page;
