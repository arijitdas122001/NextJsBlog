"use client";
import tags from "@/data/Tagsarray";
import { BlogInterface } from "@/Model/Blog";
import axios from "axios";
import { Heart, Loader, MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashBoard = () => {
  const [blogs, setBlogs] = useState<[BlogInterface]>();
  const [Loading,setLoading]=useState(false);
  const {data:session}=useSession();
  const router=useRouter();
  useEffect(() => {
    const LoadData = async () => {
      setLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}AllBlog-Get/all`);
      setBlogs(res.data.All_Blogs);
      setLoading(false);
    };
    LoadData();
  }, []);
  const isFill=(ele:any)=>{
    let flag=false;
    ele.likecnt.map((e:any)=>{
      if(e===session?.user.username){
        // console.log(e)
        flag=true;
        return;
      }
    })
    return flag;
  }
  const handelclick=(ele:string):any=>{
    router.push(`/blogs/all-blogs/${ele}`)
  }
  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-6xl space-y-8 flex gap-8">
        <div className="flex-2 p-2">
         {Loading?<Loader width={200} height={200}/>:<div className="mt-8">
          <div className="text-xl font-bold">For you</div>
          <hr />
          {blogs?.map((ele,i)=>(
            <div key={i}>
            <div className="flex flex-col gap-4 p-7">
              <div className="flex flex-1 gap-8 justify-between items-center">
                <div className="flex flex-col gap-3">
                  <div className="text-xl">{ele.username}</div>
                  <div className="text-2xl font-bold hover:cursor-pointer">
                    <Link href={`/blog/${ele._id}`}>
                    {ele.title}
                    </Link>
                  </div>
                  <div>{ele.sub_title}</div>
                </div>
                <div className="flex-2">
                  <Image
                    src={ele.img}
                    alt="no-image"
                    style={{ width: 'auto', height:'auto'}}
                    height={100}
                    width={100}
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div>{new Date(ele.createdAt).toLocaleDateString()}</div>
                <div className="flex gap-2 hover:cursor-pointer">
                  <Heart fill={isFill(ele)?"red":"white"} color={isFill(ele)?"red":"black"} />
                  <span>{ele.likecnt.length}</span>
                </div>
                <div className="flex gap-2 hover:cursor-pointer">
                  <MessageCircle />
                  <span>12</span>
                </div>
              </div>
              <hr />
            </div>
            </div>
          ))}
          </div>
        }
        </div>
        <div className="">
          <div className="">
            <div className="p-5 flex flex-col gap-7">
              <div className="text-xl font-bold">Follow our top writers</div>
              <div className="flex">
                <div className="flex-3">
                  <div className="text-xl font-bold">Arijit Das</div>
                  <div className="">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Consequatur molestias nesciunt
                  </div>
                </div>
                <div className="flex-1">
                  <button className="bg-blue-300 p-2 rounded-xl text-lg">
                    Follow
                  </button>
                </div>
              </div>
              <div className="flex">
                <div className="flex-3">
                  <div className="text-xl font-bold">Arijit Das</div>
                  <div className="">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Consequatur molestias nesciunt
                  </div>
                </div>
                <div className="flex-1">
                  <button className="bg-blue-300 p-2 rounded-xl text-lg">
                    Follow
                  </button>
                </div>
              </div>
              <div className="flex">
                <div className="flex-3">
                  <div className="text-xl font-bold">Arijit Das</div>
                  <div className="">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Consequatur molestias nesciunt
                  </div>
                </div>
                <div className="flex-1">
                  <button className="bg-blue-300 p-2 rounded-xl text-lg">
                    Follow
                  </button>
                </div>
              </div>
              <div className="flex gap-3 flex-col">
                <div className="text-xl font-bold">
                  Search with popular tags
                </div>
                <div className="flex gap-5 flex-wrap">
                  {tags.map((ele,i) => (
                    <div className="rounded-xl bg-blue-100 p-2 hover:cursor-pointer" key={i} onClick={()=>handelclick(ele)}>
                      {ele}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
