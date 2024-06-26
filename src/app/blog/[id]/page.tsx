'use client'
import { BlogInterface } from '@/Model/Blog';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
const Blog = () => {
    const params=useParams();
    const blog_id=params.id;
    const {toast}=useToast();
    const [loading,setloading]=useState(false);
    const [data,setData]=useState<BlogInterface>();
    const [showcomment,setshowcomment]=useState(false);
    const [description,setdescription]=useState("");
    const [error,seterror]=useState(false);
    useEffect(()=>{
      setloading(true);
      const fetchData=async()=>{
        try{
        const res=await axios.post(`http://localhost:3000/api/Get-Blog/${blog_id}`);
        setData(res.data.blog);
        setdescription(res.data.blog.description);
        // console.log(data);
        }
        catch(error){
          seterror(true);
          setloading(false);
          toast({
            title:"Failure",
            description:"Failed to Fetch the blog",
            variant:'destructive'
          })
        }
      }
      fetchData();
      setloading(false);
    },[blog_id])
    const date=new Date(data?.createdAt!).toLocaleDateString();
    const handelClick=()=>{
      setshowcomment(!showcomment)
      console.log(showcomment);
    }
  return (
    <div className="flex min-h-screen items-center justify-center bg-cyan-800 z-0 h-full  ">
    < div className="w-full max-w-screen-lg space-y-8 bg-white p-6  flex-2">
    {showcomment && <div className="bg-white left-100 right-rounded-2xl absolute left-3/4 top-0">
        <div className="flex flex-col gap-5 p-10 border-2 border-black">
    <div className="flex flex-col w-full">
      <div>what do want to comment</div>
      <textarea placeholder="please write here" className="bg-blue-300 w-30"></textarea>
    </div>
    <div className="flex flex-col gap-5">
      <div>
        <div>
          user2
        </div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ipsum numquam nulla cumque qui nihil. Recusandae, quod. Doloremque asperiores cupiditate necessitatibus aspernatur quod illo ipsam minima. Iusto neque odio voluptatem!</div>
      </div>
      <div>
        <div>
          user2
        </div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ipsum numquam nulla cumque qui nihil. Recusandae, quod. Doloremque asperiores cupiditate necessitatibus aspernatur quod illo ipsam minima. Iusto neque odio voluptatem!</div>
      </div>
      <div>
        <div>
          user2
        </div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ipsum numquam nulla cumque qui nihil. Recusandae, quod. Doloremque asperiores cupiditate necessitatibus aspernatur quod illo ipsam minima. Iusto neque odio voluptatem!</div>
      </div>
      <div>
        <div>
          user2
        </div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia ipsum numquam nulla cumque qui nihil. Recusandae, quod. Doloremque asperiores cupiditate necessitatibus aspernatur quod illo ipsam minima. Iusto neque odio voluptatem!</div>
      </div>
    </div>
  </div>
  </div>
}
      <div className="text-4xl font-bold">{data?.title}</div>
      <div> 
        <div className="text-xl">{data?.username}</div>
        <div className='flex gap-3'>
          <span>2 min read</span>
          <span>.</span>
          <span>{date}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <hr className="bg-black" />
        <div className="flex gap-3 font-bold">
          <div>Like</div>
          <Button className="hover:cursor-pointer" onClick={handelClick}>Comment</Button>
        </div>
        <hr />
      </div>
      <div className="flex justify-center">
        <Image
        src={data?.img!}
        height={300}
        width={500}
        alt='No image'
        />
      </div>
     {/* <div dangerouslySetInnerHTML={{ __html: data?.description!}}></div> */}
     <div>{parse(description)}</div>
      <div className="flex flex-col gap-2">
        <hr className="bg-black" />
        <div className="flex gap-3 font-bold">
          <div>Like</div>
          <div>Comment</div>
        </div>
        <hr className="bg-black" />
      </div>
    </div>
    </div>
  )
}

export default Blog
