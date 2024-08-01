'use client'
import PostfromEdit from "@/components/PostEditForm";
import {useParams} from "next/navigation";
const page = () => {
  const params=useParams();
  const blogid=params.blogid;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-400">
      <div className="bg-gray-100 p-20 rounded-xl">
        <div className="text-center text-4xl">Upload your thoughts from here</div>
        <PostfromEdit blogid={blogid}/>
      </div>
    </div>
  );
};

export default page;
