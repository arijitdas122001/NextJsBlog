'use client'
import { BackgroundBeams } from '@/components/ui/background-beams';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Cards from '@/components/Cards';
import {LoaderCircle } from 'lucide-react';
const AllBlogs = () => {
    const [allBlogs,setAllBlogs]=useState<[]>([]);
    const [fetching,setFetching]=useState(false);
    const {toast}=useToast();
    const params=useParams();
    useEffect(()=>{ 
        const FetchAllBlogs=async()=>{
          setFetching(true);
        try{
            const res=await axios.post(`http://localhost:3000/api/AllBlog-Get/${params.blogtype}`);
            const obj=res.data;
            // console.log(obj.All_Blogs);
            setAllBlogs(obj.All_Blogs);
            setFetching(false);
            // console.log(allBlogs)
        }
        catch (error) {
            toast({
                title:"Failure",
                description:"Failed to fetch data",
                variant:'destructive'
            })
            setFetching(false);
        }
        }
        FetchAllBlogs();
    },[params,toast])
  return (
    <>
    <div className="flex flex-col gap-2 justify-center flex-wrap bg-cyan-900 min-h-screen">
      <div className="flex justify-center mt-4">
        <div className="text-6xl text-white">{params.blogtype==="all"?"All Blogs":`Result for ${params.blogtype}`}</div>
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        {fetching?<LoaderCircle className="flex justify-center items-center animate-spin" height={200} width={200} color='white'/>: <div className="flex gap-3 flex-wrap justify-center">
        {allBlogs.map((ele:any,i)=>(
            <div className="mt-6  " key={i}>
              <Cards ele={ele}/> 
            </div>
        ))}
        </div>}
        </div>
    </div>
    </>
  )
}

export default AllBlogs
