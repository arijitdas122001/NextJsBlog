import BlogModel from "@/Model/Blog";
import LikeModel from "@/Model/Likes";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";

export async function POST(
    req:Request,
) {
    await DbConnect();
    try {
        //collect blog_id from parameter and to_username from data so pass on body
        //from_username will come from session pass on body
        const {recv_like_username,giving_like_id,blog_id}=await req.json();
        //find the model and with the blog username
        const model=await LikeModel.findOne({to_username:recv_like_username});
        // if there is no modal then create one
        if(!model){
            const newModel=new LikeModel({
                to_username:recv_like_username,
                from_username:[giving_like_id]
            });
            await newModel.save();
        }else{
        //push the session_user to the from_user
        model.from_username.push(giving_like_id);
        await model?.save();
        }
        //find the corresponding blog
        const cors_blog=await BlogModel.findById(blog_id);
        // push the giving like user to the like count
        cors_blog?.likecnt.push(giving_like_id);
        await cors_blog?.save();
        return ApiResponse(200,"Given Like",true);
    } catch (error) {
        return ApiResponse(400,"Error while giving like",false);
    }
}