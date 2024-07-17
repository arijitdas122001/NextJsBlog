import ReplyModel from "@/Model/RevReplies";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";

export async function POST(
    req:Request,
    {params}:{params:{blog_id:string}}
) {
    await DbConnect();
    try{
        const blog_id=params.blog_id;
        // console.log(parent_cmtid);
        const model=await ReplyModel.findOne({blog_id:blog_id}).exec();
        // console.log(model);
        return Response.json(
        {
            model
        },
        {status:200}
    )
    }catch(error){
        return ApiResponse(400,"Error while getting replies",false);
    }
}