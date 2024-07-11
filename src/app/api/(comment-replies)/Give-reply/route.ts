import ReplyModel, { NestedReplies } from "@/Model/Reply";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";

export async function POST(req:Request) {
    await DbConnect();
    try {
        const {parent_cmtid,username,replymsg}=await req.json();
        // console.log("reaced till here");
        // console.log(blogid,username);
        const model=await ReplyModel.findOne({parent_cmtid:parent_cmtid}).exec();
        // console.log("reached till here 2");
        if(!model){
            const newreply={
                give_username:username,
                reply_msg:replymsg
            }
            const newModel={
                parent_cmtid:parent_cmtid,
                reply:[newreply as NestedReplies]
            }
            const newReplyModel=new ReplyModel(newModel);
            // console.log(newCommentModel);
            // newModel.Comments.push(newComment as Message);
            // console.log("recheanig hereh blall");
            await newReplyModel.save();
        }else{
            const newreply={
                give_username:username,
                reply_msg:replymsg
            }
            await ReplyModel.findByIdAndUpdate(
                model._id,
                {$push:{reply:newreply as NestedReplies}}
            )
        }
        return ApiResponse(200,"Replied",true);
    } catch (error) {
        return ApiResponse(400,"Error while commenting",false);
    }
}