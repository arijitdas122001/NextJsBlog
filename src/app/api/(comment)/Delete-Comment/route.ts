import CommentModel from "@/Model/Comment";
import ApiResponse from "@/utils/ApiResponse";

export async function GET(req:Request) {
    try {
        const {username}=await req.json();
        const model=await CommentModel.findOne({to_username:username});
        return ApiResponse(200,"Got it",true);
    } catch (error) {
        return ApiResponse(400,"Error",false);
    }
}