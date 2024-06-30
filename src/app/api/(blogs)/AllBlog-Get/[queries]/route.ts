import BlogModel from "@/Model/Blog";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection";

export async function POST(
    req:Request,
    {params }: { params: { 
        queries:string
     } }
) {
    await DbConnect();
    try {
        const slugString=params?.queries;
        if(slugString==="all"){
            const All_Blogs=await BlogModel.find();
            return Response.json(
             {
                 All_Blogs
     
             },
             {status:200}
           )
    }
    else{
      const all_tags=slugString.split('-');
        console.log(all_tags);
        const All_Blogs=await BlogModel.find({tags:{$exists:true,$in:all_tags}}).sort({createdAt:-1});
       return Response.json(
        {
            All_Blogs

        },
        {status:200}
       )
    }
    } catch (error) {
        return ApiResponse(400,"Error while getting blogs",false);
    }
}