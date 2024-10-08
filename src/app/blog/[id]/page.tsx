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
import {RevFeedBack1} from "@/Model/Comment";
import RTE from "@/components/Editor";
import {useForm } from "react-hook-form";
import { z } from "zod";
import { CommentSchema } from "@/schemas/CommentSchema";
import { Form } from "@/components/ui/form";
import {Heart, Loader, MessageCircle, X } from "lucide-react";
import Loadingblog from "@/components/skelitons/Loadingblog";
import { loadComponents } from "next/dist/server/load-components";
const Blog = () => {
  const params = useParams();
  const blog_id = params.id;
  const { toast } = useToast();
  const [loadpage,setloadingpage]=useState(false);
  const [loading, setloading] = useState(false);
  const [commentLoader, setcommentLoader] = useState(false);
  const [openReplies,setOpenReplies]=useState(false);
  const [Data, setData] = useState<BlogInterface>();
  const [storeReplyId,setstoreReplyId]=useState("");
  const [reply,setreply]=useState("");
  const [showcomment, setshowcomment] = useState(false);
  const [givenLike,setGivenLike]=useState(false);
  const [comments, setComments] = useState<RevFeedBack1>();
  const [description, setdescription] = useState("");
  const [error, seterror] = useState(false);
  const [openPostReply,setOpenPostReply]=useState(false);
  const [CmtGivenLike,SetCmtGivenLike]=useState(false);
  const [BlogGivenLike,setBlogGivenLike]=useState(false);
  const { data: session } = useSession();
  const form=useForm<z.infer<typeof CommentSchema>>();
  const fetchData = async () => {
    try {
      setloadingpage(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/Get-Blog/${blog_id}`
      );
      setData(res.data.blog);
      setdescription(res.data.blog.description);  
      setloadingpage(false);
      // console.log(data);
    } catch (error) {
      seterror(true);
      toast({
        title: "Failure",
        description: "Failed to Fetch the blog",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(()=>{
    Data?.likecnt.map((ele)=>{
      if(ele===session?.user.username){
        // console.log("found");
        setBlogGivenLike(true);
      }
    })
    comments?.Comments.map((ele)=>{
      ele.Likes.map((ele1)=>{
        if(ele1===session?.user.username){
          // console.log("found");
          SetCmtGivenLike(true)
        }
      })
    })
  },[Data,comments])
  const date = new Date(Data?.createdAt!).toLocaleDateString();
  const LoadComment = async () => {
    setshowcomment(!showcomment);
    // console.log(showcomment);
    setloading(true);
    const commentsRes = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/Fetch-Comments/${blog_id}`
    );
    setComments(commentsRes.data.model);
    setloading(false);
  };
  const GiveComment=async(data: z.infer<typeof CommentSchema>)=>{
    // console.log(data);
    setcommentLoader(true)
    const commentBody={
    "blogid":blog_id,
    "username":session?.user.username,
    "comment":data.comment
    }
    // console.log("till here");
    const res=await axios.post(`${process.env.NEXT_PUBLIC_URL}/Give-Comment`,commentBody);
    LoadComment();
    setshowcomment(true);
    toast({
      title:res.data.message,
    })
    setcommentLoader(false);
  }
  const GiveLike=async()=>{
    setGivenLike(true);
    const res=await axios.post(`${process.env.NEXT_PUBLIC_URL}/Give-Like`,{
      "recv_like_username":session?.user.username,
    "from_username":session?.user.username,
    "blog_id":blog_id
    });
    toast({
      title:res.data.message
    })
  }
  const handelOpenReplies=async(cmt_id:any)=>{
    // setOpenReplies(cmt_id)
    // console.log(parent_cmt_id);
    // trackReplyMap.get(data.parent_cmtid).map((ele:any)=>console.log(ele));
    // console.log(trackReplyMap.has(parent_cmt_id));
    // return cmt_id;
    // if(storeRepliesMap.has(cmt_id)){
    //   storeRepliesMap.set(cmt_id,"close");
    // }else{
    //   storeRepliesMap.set(cmt_id,"open")
    // }
    // console.log(storeRepliesMap.has(cmt_id))
    setOpenReplies(!openReplies)
    setstoreReplyId(cmt_id)
  }
  const openEditor=async(cmt_id:any)=>{
    setOpenPostReply(!openPostReply);
    setstoreReplyId(cmt_id);
  }
  const handelReply=async(username:string,cmt_id:any)=>{
    const body={
    "blog_id":blog_id,
    "username":session?.user.username,
    "replymsg":reply
    }
    // console.log(data?.username);
    const res=await axios.post(`${process.env.NEXT_PUBLIC_URL}/Reply-sent/${cmt_id}`,body);
    LoadComment();
    toast({
      title:res.data.message
    });
  }
  const handelLike=async(cmt_id:any)=>{
      const body={
        "cmt_id":cmt_id,
        "from_username":session?.user.username
      }
      const res=await axios.post(`${process.env.NEXT_PUBLIC_URL}/Give-cmt-like/${blog_id}`,body);
      SetCmtGivenLike(true);
  }
  const handelClose=()=>{
    setshowcomment(false);
  }
  return (
    <>
    {loadpage?<Loadingblog/>:
    <div>
    <div className="flex flex-col min-h-screen items-center justify-center h-full relative">
      {showcomment && (
        <div className="fixed top-0 left-2/3 right-0 h-screen bg-white shadow-2xl overflow-x-scroll transition-transfrom ease-in-out delay-500">
        <div className="flex justify-end pr-4">
        <div className="bg-slate-200 rounded-full" onClick={handelClose}>
        <X className="cursor-pointer" size={50}/>
        </div>
        </div>
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
    {loading?<Loader className=" flexl justify-center items-center animate-spin"/>:comments?.Comments.map((ele, i) => (
            <div className="flex-2 flex flex-col gap-2" key={ele._id as string}>
            <div>
            <div className="text-lg">{ele.give_username}</div>
            <div className="">{ele.createdAt?new Date(ele.createdAt).toLocaleTimeString():"posting date"}</div>  
            </div>
            <div dangerouslySetInnerHTML={{ __html: ele?.comment}}></div>
            <div className="flex justify-between">
            <div className="flex gap-2">
            <div className="flex gap-1 justify-center items-center hover:cursor-pointer">
              <Heart size={20} fill={CmtGivenLike?"Green":"white"} color="green" onClick={()=>handelLike(ele._id)}/>
              {ele.Likes.length}
              </div>  
            {ele.Replies.length>0 && <div className="font-semibold hover:cursor-pointer" onClick={()=>handelOpenReplies(ele._id)}>{openReplies?"Hide ":"View "}replies</div>}
            </div>
              <div className="font-semibold hover:cursor-pointer" onClick={()=>openEditor(ele._id)}>Post a Reply</div>
            </div>
            {openPostReply && storeReplyId===ele._id && <div className="flex gap-4">
             <textarea className="border-2 border-black rounded-lg pl-2" onChange={(e)=>setreply(e.target.value)}/>
              <button className="bg-green-400 rounded-lg pt-2 pb-2 pl-4 pr-4" onClick={()=>handelReply(ele.give_username,ele._id)}>Post</button>
            </div>}
             <div>
            {openReplies && storeReplyId===ele._id && ele.Replies.map((ele)=>(
              <div className="ml-4 border-l-2 border-black flex flex-col" key={ele._id as string}>
                <div className="p-3">
                <div className="">{ele.give_username}</div>
                <div className="" key={i}>{ele.reply_msg}</div>
                <div className="text-xs">{new Date(ele.createdAt).toLocaleDateString()}</div>
                </div>
                <hr />
            </div>
            ))
            }
            </div>
            <hr className="bg-black"/>
          </div>
        ))}
        </div>
        </div>
        </div>
    )}
      <div className="w-full max-w-screen-lg space-y-8 bg-white p-6  flex-2">
        <div className="text-4xl font-bold">{Data?.title}</div>
        <div>
          <div className="text-xl">{Data?.username}</div>
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
            <Heart color="red" fill={givenLike ||  BlogGivenLike?"red":"white"} onClick={GiveLike}/>
            <span>{givenLike?Data?.likecnt.length!+1:Data?.likecnt.length}</span>
            </div>
            <div className="hover:cursor-pointer" onClick={LoadComment}>
              <MessageCircle/>
              <span>{}</span>
            </div>
          </div>
          <hr />
        </div>
        <div className="flex justify-center">
          <Image src={Data?.img?Data?.img:"/"} height={300} width={500} style={{ width: 'auto'}} alt="No image"  priority={true} />
        </div>  
        {/* <div dangerouslySetInnerHTML={{ __html: data?.description!}}></div> */}
        <div>{parse(description)}</div>
        <div className="flex flex-col gap-2">
          <hr className="bg-black" />
          <div>
            <div className="flex gap-3 font-bold">
            <div className="hover:cursor-pointer flex gap-2">
            <Heart color="red" fill={givenLike || BlogGivenLike?"red":"white"} onClick={GiveLike}/>
            <span>{givenLike?Data?.likecnt.length!+1:Data?.likecnt.length}</span>
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
    </div>
    }
    </>
  );
};

export default Blog;
