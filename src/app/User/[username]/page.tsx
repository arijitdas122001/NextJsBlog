"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useParams } from "next/navigation";
import { BlogInterface } from "@/Model/Blog";
import Image from "next/image";
import { ExternalLink, Heart, Loader, PencilLine, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
const UserPage = () => {
  const [blogs, setblogs] = useState<[BlogInterface]>();
  const [Loading, SetLoading] = useState(false);
  const params = useParams();
  // console.log(params.username);
  const { toast } = useToast();
  const { data: session } = useSession();
  const LoadBlogs = async () => {
    SetLoading(true);
    const response = await axios.post(
      `http://localhost:3000/api/Get-userWiseData/${params.username}`
    );
    setblogs(response.data.res);
    SetLoading(false);
  };
  useEffect(() => {
    LoadBlogs();
  }, []);
  const DeleteBlog = async (id: string) => {
    const newobj = {
      user_id: session?.user._id!,
      blog_id: id,
    };
    const res = await axios.post(
      "http://localhost:3000/api/Blog-Delete",
      newobj
    );
    LoadBlogs();
    toast({
      title: res.data.message,
    });
  };
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
  return (
    <div>
      <div className="flex justify-evenly">
        <div className="flex-1">
          <div>
            <div className="text-7xl p-8">Arijit Das</div>
            <div className="p-8 text-2xl">
              <span>Blogs</span>
              <hr />
            </div>
            {Loading ? (
              <div className="flex justify-center items-center ">
                <Loader className="animate-spin h-[100px] w-[100px]"/>
              </div>
            ) : (
              <div className="p-8 flex gap-6 flex-wrap bg-slate-300 rounded-2xl">
                {!blogs?.length ? (
                  <div className="text-xl">You haven&apos; written anything</div>
                ) : (
                  blogs?.map((ele, i) => (
                    <div key={i}>
                      <Card className="h-[400px] w-[350px] flex flex-col gap-3">
                      {session?.user.username === params.username && (
                             <div className="flex justify-end pt-2 pr-2">
                            <Link href={`/blogs/edit/${ele._id}`}>
                             <PencilLine className="hover:cursor-pointer"/>
                             </Link>
                             </div>
                            )}
                        <CardHeader>
                          <CardTitle>{ele.title!}</CardTitle>
                          <CardDescription>{ele.sub_title}</CardDescription>
                        </CardHeader>
                        <div className="flex justify-center h-[100px] w-full">
                          <Image
                            src={ele.img}
                            alt="no-image"
                            height={100}
                            width={200}
                            className="flex justify-center align-middle"
                          />
                        </div>
                        <div className="flex justify-between align-middle p-4">
                          <div className="flex justify-center align-middle gap-2">
                            <Heart fill={isFill(ele)?"red":"white"} color={isFill(ele)?"red":"black"} />
                            <span>{ele.likecnt.length}</span>
                          </div>
                          <div className="flex gap-2 hover:cursor-pointer">
                            {session?.user.username === params.username && (
                              <Trash onClick={() => DeleteBlog(ele._id)} />
                            )}
                            <Link href={`/blog/${ele._id}`}>
                              <ExternalLink />
                            </Link>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <div></div>
        </div>
        <div className="flex-2 text-4xl">
          <div>
            <Image
              src={`https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-854.jpg?t=st=1719863122~exp=1719866722~hmac=6902bffb658a27d8a61252b84ef990418210aafc72c5be8542dd03a74d07a2d4&w=740`}
              alt="No_user_image"
              height={200}
              width={200}
              priority={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
