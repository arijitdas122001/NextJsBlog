
import { CommentModel, InterMessageRev1} from "@/Model/Comment";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";

export async function POST(req:Request) {
    await DbConnect();
    try {
        const {blogid,username,comment}=await req.json();
        // console.log("reaced till here");
        console.log(blogid,username);
        const model=await CommentModel.findOne({blog_id:blogid}).exec();
        console.log("reached till here 2");
        if(!model){
            const newcomment={
                give_username:username,
                comment:comment,
            }
            const newModel={
                blog_id:blogid,
                Comments:[newcomment as InterMessageRev1],
            }
            const newCommentModel=new CommentModel(newModel);
            // console.log(newCommentModel);
            // newModel.Comments.push(newComment as Message);
            // console.log("recheanig hereh blall");
            await newCommentModel.save();
        }else{
            const newcomment={
                give_username:username,
                comment:comment 
            }
            await CommentModel.findByIdAndUpdate(
                model._id,
                {$push:{Comments:newcomment as InterMessageRev1}}
            )
        }
        return ApiResponse(200,"Commented successfully",true);
    } catch (error) {
        return ApiResponse(400,"Error while commenting",false);
    }
}