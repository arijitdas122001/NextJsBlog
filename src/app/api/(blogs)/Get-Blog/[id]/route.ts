import BlogModel from "@/Model/Blog";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";

export async function POST(
    req:Request,
    {params }: { params: { 
        id:string
     } }
) {
    await DbConnect();
    try {
        const blogId=params.id;
        console.log(blogId)
        // const {blogId}=await req.json();
        const blog=await BlogModel.findById(blogId).exec();
        if(!blog){
            return ApiResponse(401,"No such blog is there",false);
        }
        return Response.json(
            {
                success:true,
                blog:blog
            },
            {status:200}
        )
    } catch (error) {
        return ApiResponse(400,"Error while getting blog",false);
    }
}