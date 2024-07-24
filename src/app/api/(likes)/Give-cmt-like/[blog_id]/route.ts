import { CommentModel } from "@/Model/Comment";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";
import { boolean } from "zod";

export async function POST(
    req:Request,
    {params}:{params:{blog_id:string}}
){
    DbConnect();
    try {
        const blog_id=params.blog_id;
        const {cmt_id,from_username}=await req.json();
        const model=await CommentModel.findOne({blog_id});
        if(!model){
            return ApiResponse(401,"Didn't got the model",false);
        }
         let flag=false;
        model?.Comments.map((ele)=>{
            console.log(ele._id);
            if(ele.id===cmt_id){
                console.log("found it");
                ele.Likes.push(from_username);
                flag=true;
            }
        });
        if(flag===false)console.log("didn't find the cmt_id");
        await CommentModel.findByIdAndUpdate(
            {_id:model?._id},
            {
                Comments:model?.Comments
            },
            {
                new:true,
            }
        )
        return ApiResponse(200,"Given Like",true);
    } catch (error) {
        return ApiResponse(400,"Error while giving like in comment",false);
    }
}