import { CommentModel, MessageModel, ReplyModel, RevNestedReplies } from "@/Model/Comment";
import RevRepliesModel from "@/Model/RevReplies";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";

export async function POST(
    req:Request,
    {params}:{params:{parentcmt_id:string}}
) {
    await DbConnect();
    try {
        const {username,replymsg,blog_id}=await req.json();
        const cmt_id=params.parentcmt_id;
        // console.log("reaced till here");
        // console.log(blogid,username
        // console.log("reached till here 2");
        const newreply={
            give_username:username,
            reply_msg:replymsg
        }
        const NewModelReply=new ReplyModel(newreply);
        console.log("till here");
        await CommentModel.findByIdAndUpdate(
            {cmt_id},
            {$push:{"Comments.Replies":{NewModelReply}}},
        )
        // console.log(model);
        return ApiResponse(200,"Replied",true);
    } catch (error) {
        return ApiResponse(400,"Error while commenting",false);
    }
}