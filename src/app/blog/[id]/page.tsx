"use client";
import { BlogInterface } from "@/Model/Blog";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { FeedBack} from "@/Model/Comment";
import RTE from "@/components/Editor";
import {useForm } from "react-hook-form";
import { z } from "zod";
import { CommentSchema } from "@/schemas/CommentSchema";
import { Form } from "@/components/ui/form";
import { AwardIcon, Heart, Loader, MessageCircle } from "lucide-react";
import { Replies } from "@/Model/Reply";
const Blog = () => {
  const params = useParams();
  const blog_id = params.id;
  const { toast } = useToast();
  const [loading, setloading] = useState(false);
  const [commentLoader, setcommentLoader] = useState(false);
  const [openReplies,setOpenReplies]=useState(false);
  const [replies,setReplies]=useState<Replies>()
  const [data, setData] = useState<BlogInterface>();
  const [showcomment, setshowcomment] = useState(false);
  const [givenLike,setGivenLike]=useState(false);
  const [comments, setComments] = useState<FeedBack>();
  const [description, setdescription] = useState("");
  const [error, seterror] = useState(false);
  const { data: session } = useSession();
  const form=useForm<z.infer<typeof CommentSchema>>();
  useEffect(() => {
    setloading(true); 
    const fetchData = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/Get-Blog/${blog_id}`
        );
        setData(res.data.blog);
        setdescription(res.data.blog.description);
        // console.log(data);
      } catch (error) {
        seterror(true);
        setloading(false);
        toast({
          title: "Failure",
          description: "Failed to Fetch the blog",
          variant: "destructive",
        });
      }
    };
    fetchData();
    setloading(false);
  }, []);
  const date = new Date(data?.createdAt!).toLocaleDateString();
  const LoadComment = async () => {
    setshowcomment(!showcomment);
    // console.log(showcomment);
    const commentsRes = await axios.post(
      `http://localhost:3000/api/Fetch-Comments/${blog_id}`
    );
    setComments(commentsRes.data.model);
    // console.log(comments)
  };
  const GiveComment=async(data: z.infer<typeof CommentSchema>)=>{
    // console.log(data);
    setcommentLoader(true)
    const commentBody={
    "blogid":blog_id,
    "username":session?.user.username,
    "comment":data.comment
    }
    console.log("till here");
    const res=await axios.post('http://localhost:3000/api/Give-Comment',commentBody);
    LoadComment();
    setshowcomment(true);
    toast({
      title:res.data.message,
    })
    setcommentLoader(false);
  }
  const GiveLike=async()=>{
    setGivenLike(true);
    const res=await axios.post('http://localhost:3000/api/Give-Like',{
      "recv_like_username":data?.username,
    "from_username":session?.user.username,
    "blog_id":blog_id
    });
    toast({
      title:res.data.message
    })
  }
  const handelOpenReplies=async(parent_cmt_id:any)=>{
    setOpenReplies(!openReplies);
    const res=await axios.post(`http://localhost:3000/api/Fetch-reply/${parent_cmt_id}`);
    setReplies(res.data.model);
  }
  return (
    <div className="flex flex-col min-h-screen items-center justify-center h-full relative">
      {showcomment && (
        <div className="fixed top-0 left-2/3 h-screen bg-white shadow-2xl overflow-x-scroll transition-transfrom ease-in-out delay-500">
        <div className="p-5">
        <div className="flex flex-col gap-6">
        <div className="flex-1">
      <div className="bg-white flex flex-col gap-2  p-5 shadow-xl">
        <div className="font-semibold">{session?.user.username}</div>
        {/* <input className="outline-none border-none pb-20 overflow-x-hidden" placeholder="write your coment here"></input> */}
        <label className="text-2xl">Comment Here</label>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(GiveComment)} className="space-y-8">
        <RTE control={form.control} name="comment" height={200}/>
        <Button type="submit" className="bg-green-500">{commentLoader?<Loader/>:"Submit"}</Button>
        </form> 
        </Form>
        <div>
        {/* <button className="bg-green-500 p-2 rounded-3xl" onClick={onSubmit}>Respond</button> */}
        </div>
      </div>
    </div>
          {comments?.Comments.map((ele, i) => (
            <div key={i} className="flex-2 flex flex-col gap-2">
            <div>
            <div className="text-lg">{ele.give_username}</div>
            <div className="">{ele.createdAt?new Date(ele.createdAt).toLocaleTimeString():"posting date"}</div>  
            </div>
            <div dangerouslySetInnerHTML={{ __html: ele?.comment}}></div>
            <div className="flex justify-between">
              <div className="font-semibold hover:cursor-pointer">Reply No</div>
              <div className="font-semibold hover:cursor-pointer" onClick={()=>handelOpenReplies(ele._id)}>Reply</div>
            </div>
            {openReplies && <div className="ml-4 border-l-2 border-black flex flex-col gap-3">
              {replies?.reply.map((ele,i)=>(
                <div className="p-3" key={i}>{ele.reply_msg}</div>
              ))}
            </div>}
            <hr className="bg-black"/>
          </div>
          ))}
          </div>
          </div>
        </div>
        )}
      <div className="w-full max-w-screen-lg space-y-8 bg-white p-6  flex-2">
        <div className="text-4xl font-bold">{data?.title}</div>
        <div>
          <div className="text-xl">{data?.username}</div>
          <div className="flex gap-3">
            <span>2 min read</span>
            <span>.</span>
            <span>{date}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <hr className="bg-black" />
          <div className="flex gap-7 font-bold">
            <div className="hover:cursor-pointer flex gap-2">
            <Heart color="red" fill={givenLike?"red":"white"} onClick={GiveLike}/>
            <span>{givenLike?data?.likecnt.length!+1:data?.likecnt.length}</span>
            </div>
            <div className="hover:cursor-pointer" onClick={LoadComment}>
              <MessageCircle/>
            </div>
          </div>
          <hr />
        </div>
        <div className="flex justify-center">
          <Image src={data?.img!} height={300} width={500} alt="No image" />
        </div>  
        {/* <div dangerouslySetInnerHTML={{ __html: data?.description!}}></div> */}
        <div>{parse(description)}</div>
        <div className="flex flex-col gap-2">
          <hr className="bg-black" />
          <div>
            <div className="flex gap-3 font-bold">
            <div className="hover:cursor-pointer flex gap-2">
            <Heart color="red" fill={givenLike?"red":"white"} onClick={GiveLike}/>
            <span>{givenLike?data?.likecnt.length!+1:data?.likecnt.length}</span>
            </div>
            <div className="hover:cursor-pointer" onClick={LoadComment}>
              <MessageCircle/>
            </div>
            </div>
          </div>
          <hr className="bg-black" />
        </div>
      </div>
    </div>
  );
};

export default Blog;
