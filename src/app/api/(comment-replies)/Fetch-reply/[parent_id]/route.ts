import ReplyModel from "@/Model/Reply";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";

export async function POST(
    req:Request,
    {params}:{params:{parent_id:string}}
) {
    await DbConnect();
    try{
        const parent_cmtid=params.parent_id;
        console.log(parent_cmtid);
        const model=await ReplyModel.findOne({parent_cmtid:parent_cmtid}).exec();
        console.log(model);
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