import BlogModel from "@/Model/Blog";
import UserModel from "@/Model/User";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";

export async function POST(req:Request) {
    await DbConnect();
    try {
        const Blog_data=await req.json();
        const username=Blog_data.username;
        const Blog_model=new BlogModel(Blog_data);
        const blog_res=await Blog_model.save();
        const user=await UserModel.findOne({username});
        // console.log(user);
        const str=blog_res._id?.toString();
        // console.log(str)
        user?.all_blogs.push(str!);
        await user?.save();
        return ApiResponse(200,"Blog successfully created",true);
    } catch (error) {
        return ApiResponse(400,"Error while creating the blog",false);
    }
}