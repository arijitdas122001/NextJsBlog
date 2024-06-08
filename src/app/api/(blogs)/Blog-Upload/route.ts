import BlogModel from "@/Model/Blog";
import UserModel from "@/Model/User";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";
import { UploadImage } from "@/utils/UploadImage";

export async function POST(req:Request) {
    await DbConnect();
    try {
        const blog_data=await req.formData();
        const img=blog_data.get("img") as unknown as File
        const username=blog_data.get("username")as unknown as string
        const title=blog_data.get("title")as unknown as string
        const sub_title=blog_data.get("sub_title")as unknown as string
        const description=blog_data.get("description")as unknown as string
        const img_data:any=await UploadImage(img,'blog-gallery');
        // console.log(img_data);
        const new_model={
            username:username,
            title:title,
            sub_title:sub_title,
            description:description,
            img:img_data.secure_url,
            tags:[]
        }
        const blogmodel=new BlogModel(new_model);
        // console.log("till here1")
        // console.log(blogmodel);
        const blog_res=await blogmodel.save();
        // console.log("till here2")
        const user=await UserModel.findOne({username});
        // console.log(user);
        const str=blog_res._id?.toString();
        // console.log(str)
        // console.log("till here 3")
        user?.all_blogs.push(str!);
        await user?.save();
        return ApiResponse(200,"Blog successfully created",true);
    } catch (error) {
        return ApiResponse(400,"Error while creating the blog",false);
    }
}