import BlogModel from "@/Model/Blog";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";
import { UploadImage } from "@/utils/UploadImage";

export async function POST(
    req:Request,
    {params}:{params:{slugs:string,blogid:string}}
) {
    await DbConnect();
    try {
        const blog_data=await req.formData();
        console.log(params);
        const slugString=params.slugs;
        const tags=slugString.split('-');
        const img=blog_data.get("img") as unknown as File
        const username=blog_data.get("username")as unknown as string
        const title=blog_data.get("title")as unknown as string
        const sub_title=blog_data.get("sub_title")as unknown as string
        const description=blog_data.get("description")as unknown as string
        const img_data:any=await UploadImage(img,'blog-gallery');
        const Blog_model={
            username:username,
            title:title,
            sub_title:sub_title,
            description:description,
            tags:tags   
        };
        const blog_id=params.blogid;
        await BlogModel.findByIdAndUpdate(blog_id,
            Blog_model,
            {
                new:true
            }
        );
        return ApiResponse(200,"Successfully edited the blog",true)
    } catch (error) {
        return ApiResponse(400,"Error while editing the blog",false)
    }
}