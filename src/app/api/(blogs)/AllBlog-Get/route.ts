import BlogModel from "@/Model/Blog";
import ApiResponse from "@/utils/ApiResponse";

export async function GET(){
    try {
        const All_Blogs=await BlogModel.find();
       return Response.json(
        {
            success:true,
            Blogs:All_Blogs

        },
        {status:200}
       )
    } catch (error) {
        return ApiResponse(400,"Error while getting blogs",false);
    }
}