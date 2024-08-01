import BlogModel from "@/Model/Blog";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";
import { UploadImage } from "@/utils/UploadImage";

export async function POST(
    req:Request,
    {params}:{params:{blogid:string}}
) {
    await DbConnect();
    try {
        console.log(params);
        const {username,title,sub_title,description}=await req.json();
        // console.log(params);
        const blog_id=params.blogid;
        const blodmodel=await BlogModel.findById(blog_id);
        // const newblogmodel={...blodmodel,username:username,title:title,sub_title:sub_title,description:description};
        // console.log(newblogmodel);
        await BlogModel.findByIdAndUpdate(blog_id,
            {username:username,title:title,sub_title:sub_title,description:description},
            {
                new:true
            }
        )
        return ApiResponse(200,"Successfully edited the blog",true)
    } catch (error) {
        return ApiResponse(400,"Error while editing the blog",false)
    }
}