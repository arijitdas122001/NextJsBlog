'use client'
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
    <div>
    <div className="max-w-5xl mx-auto px-8">
      <div>
        {allBlogs.map((ele:any)=>(
            <div>{ele.username}</div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default AllBlogs
