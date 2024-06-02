import BlogModel from "@/Model/Blog";
import ApiResponse from "@/utils/ApiResponse";

export async function GET(
    req:Request,
    {params }: { params: { 
        id:string
     } }
) {
    try {
        const blogId=params.id;
        const blog=await BlogModel.findById(blogId);
        if(!blog){
            return ApiResponse(401,"No such blog is there",false);
        }
        return Response.json(
            {success:true,blog:blog},
            {status:200}
        )
    } catch (error) {
        return ApiResponse(400,"Error while getting blog",false);
    }
}