import BlogModel from "@/Model/Blog";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";

export async function GET(){
    await DbConnect();
    try {
        const All_Blogs=await BlogModel.find().sort({createdAt:-1});
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