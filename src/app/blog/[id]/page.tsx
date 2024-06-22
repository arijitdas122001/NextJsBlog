'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const Blog = () => {
    const params=useParams();
    const blog_id=params.id;
    const [myBlog,setmyBlog]=useState();
    useEffect(()=>{
      
    },[blog_id])
  return (
    <div>
      
    </div>
  )
}

export default Blog
