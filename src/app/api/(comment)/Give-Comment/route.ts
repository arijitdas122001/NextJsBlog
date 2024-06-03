import CommentModel from "@/Model/Comment";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";

export async function POST(req:Request) {
    await DbConnect();
    try {
        const {recv_cmt_username,give_cmt_userid,comment}=await req.json();
        // console.log("reaced till here");
        // console.log(recv_cmt_username);
        const model=await CommentModel.findOne({recv_cmt_username}).exec();
        // console.log("reached till here 2");
        if(!model){
            console.log(model);
            const newModel=new CommentModel({
                to_username:recv_cmt_username,
                from_userid:give_cmt_userid,
                comments:[comment]
            })
            // newModel.Comments.push(newComment as Message);
            // console.log("recheanig hereh blall");
            await newModel.save();
        }else{
            const model1=await CommentModel.findOne({from_userid:give_cmt_userid});
            model1?.comments.push(comment);
            await model1?.save();
        }
        return ApiResponse(200,"Commented successfully",true);
    } catch (error) {
        return ApiResponse(400,"Error while commenting",false);
    }
}