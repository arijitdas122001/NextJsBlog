import { CommentModel } from "@/Model/Comment";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";

export async function POST(
    req:Request,
    {params}:{params:{blogid:string}}
) {
    await DbConnect();
    try {
        // console.log("reaced till here");
        // console.log(recv_cmt_username);
        const BlogId=params.blogid;
        const model=await CommentModel.findOne({blog_id:BlogId}).exec();
        // console.log("reached till here 2");
        if(!model){
            return ApiResponse(401,"Error while getting comments",false);
        }
        return Response.json(
            {
                model
            },
            {status:200}
        );
    } catch (error) {
        return ApiResponse(400,"Error while getting all comments",false);
    }
}