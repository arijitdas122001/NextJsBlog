"use client";
import tags from "@/data/Tagsarray";
import { BlogInterface } from "@/Model/Blog";
import axios from "axios";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashBoard = () => {
  const [blogs, setBlogs] = useState<[BlogInterface]>();
  const router=useRouter();
  useEffect(() => {
    const LoadData = async () => {
      const res = await axios.post("http://localhost:3000/api/AllBlog-Get/all");
      setBlogs(res.data.All_Blogs);
    };
    LoadData();
  }, []);
  const handelclick=(ele:string):any=>{
    router.push(`/blogs/all-blogs/${ele}`)
  }
  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-6xl space-y-8 flex gap-8">
        <div className="flex-2 p-2">
          <div className="mt-8">
          <div className="text-xl font-bold">For you</div>
          <hr />
          {blogs?.map((ele,i)=>(
            <div key={i}>
            <div className="flex flex-col gap-4 p-7">
              <div className="flex gap-8">
                <div className="flex flex-1 flex-col gap-3">
                  <div className="text-xl">{ele.username}</div>
                  <div className="text-2xl font-bold">{ele.title}</div>
                  <div>{ele.sub_title}</div>
                </div>
                <div className="">
                  <Image
                    src={ele.img}
                    alt="no-image"
                    height={200}
                    width={200}
                    className="w-100 h-200"
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div>{new Date(ele.createdAt).toLocaleDateString()}</div>
                <div className="flex gap-2 hover:cursor-pointer">
                  <Heart />
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
