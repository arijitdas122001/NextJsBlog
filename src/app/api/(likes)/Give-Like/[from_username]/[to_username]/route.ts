import LikeModel from "@/Model/Likes";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";

export async function POST(
    req:Request,
    {params }: { params: { 
        to_username: string,
        from_username:string
     } }
) {
    await DbConnect();
    try {
        const user_id=params.from_username
        const to_username=params.to_username
        const model=await LikeModel.findOne({to_username});
        model?.from_username.push(user_id)
        return ApiResponse(200,"Given Like",true);
    } catch (error) {
        return ApiResponse(400,"Error while giving like",false);
    }
}