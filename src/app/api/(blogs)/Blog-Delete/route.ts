import BlogModel from "@/Model/Blog";
import UserModel from "@/Model/User";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";

export async function POST(res:Response) {
    await DbConnect();
    try {
        const {user_id,blog_id}=await res.json();
        await BlogModel.findByIdAndDelete(blog_id);
        await UserModel.findByIdAndUpdate(
            user_id,
            {$pull:{all_blogs:blog_id}}
        );
        return ApiResponse(200,"Succefully Deleted Blog",true);
    } catch (error) {
        return ApiResponse(400,"Error while deleting the blog",false);
    }
}