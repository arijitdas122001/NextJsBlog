'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import RTE from './Editor';
import { Button } from './ui/button';
import axios from 'axios';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loader } from 'lucide-react';

const PostfromEdit = ({blogid}:any) => {
    const {toast}=useToast();
    const router=useRouter();
    const [submitting,setSubmitting]=useState(false);
    const form =useForm();
    const {data:session}=useSession();
    const [post,setpost]=useState<any>();
    useEffect(()=>{
      const onSubmit=async()=>{
      const res=await axios.post(`http://localhost:3000/api/Get-Blog/${blogid}`);
      // console.log(res.data)
      setpost(res.data.blog);
      }
      onSubmit();
    },[])
    const onSubmit=async(data:any)=>{
        setSubmitting(true);
    try {
      console.log(post);
        const newbody={
        "username":session?.user.username,
        "title":data.title,
        "sub_title":data.sub_title,
         "description":data.description,
        }
       // from_data.append("tags",[])
    // console.log(image);
    // console.log(value);s
      console.log()
      const res=await axios.post(`http://localhost:3000/api/Blog-Edit/${post?._id}`,newbody);
      toast({
        title:"Success",
        description:res.data.message,
        variant:"default"
      })
    //   router.push(`/user/${data.username}`)
  setSubmitting(false);
 }
    catch (error) {
      toast({
        title:"Failure",
        description:"Error while posting",
        variant:"destructive"
      })
      setSubmitting(false);
    }
    }
  return (
    <>
      <div className="text-black">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" 
                {...field} 
                defaultValue={post?.username}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your blog title" {...field}
                defaultValue={post?.title}
                 />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sub_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Subtitle(It will show on the preview)"
                  {...field}
                  defaultValue={post?.sub_title}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-2 flex-col align-middle">
          <label>Write Your blog here</label>
          <RTE control={form.control} name="description" value={post?.description} />
          <label className="text-red-400">you can not set the picture again</label>
          <div className="flex flex-col gap-4">
            <div className="border-2 border-indigo-300 rounded-xl p-2 flex gap-2">
             {post?.tags.length===0?(<label>choose your tags below</label>):
              (post?.tags.map((ele:any,i:any) => (
                  <div className="bg-gray-400 rounded-lg p-1 font-serif" key={i}>
                    {ele}
                  </div>
                ))
              )
              }
            </div>
          </div>
        </div>
        <Button type="submit">
          {submitting?<Loader/>:"Submit"}
        </Button>
      </form>
    </Form>
  </div>
  </>
);
}

export default PostfromEdit;
