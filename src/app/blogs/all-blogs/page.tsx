'use client'
import Blogcard from '@/components/Blogcard';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
const AllBlogs = () => {
    const [allBlogs,setAllBlogs]=useState<[]>([]);
    const {toast}=useToast();
    useEffect(()=>{ 
        const FetchAllBlogs=async()=>{
        try {
            const res=await axios.get('http://localhost:3000/api/AllBlog-Get');
            const obj=res.data;
            console.log(obj.All_Blogs);
            setAllBlogs(obj.All_Blogs);
            console.log(allBlogs)
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
    <div className="flex gap-3 justify-center flex-wrap-reverse">
      <BackgroundBeams/>
        {allBlogs.map((ele:any)=>(
            <Blogcard blog={ele}/>
        ))}
    </div>
  )
}

export default AllBlogs
