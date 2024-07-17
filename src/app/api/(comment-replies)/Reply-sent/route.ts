import RevRepliesModel from "@/Model/RevReplies";
import { RevNestedReplies } from "@/Model/RevReplies";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";

export async function POST(req:Request) {
    await DbConnect();
    try {
        const {blog_id,parent_cmtid,username,replymsg}=await req.json();
        // console.log("reaced till here");
        // console.log(blogid,username);
        const model=await RevRepliesModel.findOne({blog_id:blog_id}).exec();
        // console.log("reached till here 2");
        if(!model){
            const newreply={
                give_username:username,
                reply_msg:replymsg
            }
            const newModel={
                blog_id:blog_id,
                parent_cmtid:parent_cmtid,
                reply:[newreply as RevNestedReplies]
            }
            const NewModelReply=new RevRepliesModel(newModel);
            // console.log(newCommentModel);
            // newModel.Comments.push(newComment as Message);
            // console.log("recheanig hereh blall");
            await NewModelReply.save();
            // return Response.json({
            //     NewModelReply
            // },{status:200})
        }else{
            const newreply={
                give_username:username,
                reply_msg:replymsg
            }
            await RevRepliesModel.findByIdAndUpdate(
                model._id,
                {$push:{reply:newreply as RevNestedReplies}}
            )
            // return Response.json({
            //     model
            // },{status:200})
        }
        return ApiResponse(200,"Replied",true);
    } catch (error) {
        return ApiResponse(400,"Error while commenting",false);
    }
}