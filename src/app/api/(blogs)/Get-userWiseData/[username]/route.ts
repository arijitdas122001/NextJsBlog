import BlogModel from "@/Model/Blog";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection"

export async function POST(
    req:Request,
    res:Response,
    {params }: { params: { 
        username:string
     } },
){
await DbConnect();
try {
    const username=params.username;
    const res=await BlogModel.find({username:username});
    return Response.json({
        res
    },{status:200});
} catch (error) {
    return ApiResponse(400,"Error while getting data",false);
}
}