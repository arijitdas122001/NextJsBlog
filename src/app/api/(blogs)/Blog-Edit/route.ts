import BlogModel from "@/Model/Blog";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";

export async function POST(res:Response) {
    await DbConnect();
    try {
        const{blog_id,username,title,sub_title,description,img,tags}=await res.json();
        const Blog_model={
            username,
            title,
            sub_title,
            description,
            img,
            tags
        };
        await BlogModel.findByIdAndUpdate(blog_id,
            Blog_model,
            {
                new:true
            }
        );
        return ApiResponse(200,"Successfully edited the blog",true)
    } catch (error) {
        return ApiResponse(400,"Error while editing the blog",false)
    }
}