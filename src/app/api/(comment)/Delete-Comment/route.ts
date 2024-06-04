import CommentModel from "@/Model/Comment";
import ApiResponse from "@/utils/ApiResponse";

export async function DELETE(req:Request) {
    try {
        const {username,del_user_id}=await req.json();
        const model=await CommentModel.findOne({to_username:username});
        await CommentModel.findByIdAndUpdate(
            model?._id,
            {$pull:{Comments:{user_id:del_user_id}}},
        )
        return ApiResponse(200,"Deleted It",true);
    } catch (error) {
        return ApiResponse(400,"Error while deleting the comment",false);
    }
}