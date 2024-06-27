import {CommentModel} from "@/Model/Comment";
import ApiResponse from "@/utils/ApiResponse";

export async function DELETE(req:Request) {
    try {
        const {blogid,del_user_name}=await req.json();
        const model=await CommentModel.findOne({blog_id:blogid});
        await CommentModel.findByIdAndUpdate(
            model?._id,
            {$pull:{Comments:{give_username:del_user_name}}},
        )
        return ApiResponse(200,"Deleted It",true);
    } catch (error) {
        return ApiResponse(400,"Error while deleting the comment",false);
    }
}