import { CommentModel, MessageModel, ReplyModel, RevNestedReplies1 } from "@/Model/Comment";
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
        // console.log(cmt_id);
        // console.log("reaced till here");
        // console.log(blogid,username
        // console.log("reached till here 2");
        const newreply={
            give_username:username,
            reply_msg:replymsg
        }
        const NewModelReply=new ReplyModel(newreply);
        console.log("till here");
        const model=await CommentModel.findOne({blog_id:blog_id});
        model?.Comments.map((ele)=>{
            // console.log(ele);
            if(ele.id===cmt_id){
                // console.log("under if condition");
                ele.Replies.push(NewModelReply as RevNestedReplies1);
            }
          });
          await CommentModel.findByIdAndUpdate({_id:model?._id},
            {
                Comments:model?.Comments
            },
            {
                new:true,
            }
          )
        // console.log(model);
        return ApiResponse(200,"Replied",true);
    } catch (error) {
        return ApiResponse(400,"Error while commenting",false);
    }
}