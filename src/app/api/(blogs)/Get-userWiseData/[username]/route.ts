import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import BlogModel from "@/Model/Blog";
import ApiResponse from "@/utils/ApiResponse";
import { DbConnect } from "@/utils/DbConnection"
import { NextRequest } from "next/server";

export async function POST(
    req:NextRequest,
    {params }: { params: { 
        username:string
     } },
){
await DbConnect();
try {
    console.log(params);
    const username=params.username;
    const res=await BlogModel.find({username:username});
    return Response.json({
        res
    },{status:200});
} catch (error) {
    return ApiResponse(400,"Error while getting data",false);
}
}