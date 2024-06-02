import BlogModel from "@/Model/Blog";
import LikeModel from "@/Model/Likes";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";

export async function DELETE(req:Request) {
    await DbConnect();
    try {
        const {recv_dislike_username,giving_dislike_id,blog_id}=await req.json();
        const model=await LikeModel.findOne({to_username:recv_dislike_username});
        // console.log(model?.id);
        if(!model){
            return ApiResponse(401,"CanNot find the model in db",false);
        }
        await BlogModel.findByIdAndUpdate(
            blog_id,
            {$pull:{likecnt:"665cbbcdbfdc08026c6a215b"}},
            {new:true}
        );
        // console.log(updated_blogmodel);
        await LikeModel.findByIdAndUpdate(
            model?._id,
            {$pull:{from_username:"665cbbcdbfdc08026c6a215b"}},
            {new:true}
        );
        // console.log(updated_LikeMode);
        return ApiResponse(200,"Disliked succefully",true);
    } catch (error) {
        return ApiResponse(400,"Error while Disliking",false);
    }
}