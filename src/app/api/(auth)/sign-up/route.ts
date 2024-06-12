import {DbConnect} from "@/utils/DbConnection";
import UserModel from "@/Model/User";
import bcrypt from 'bcryptjs';
import ApiResponse from "@/utils/ApiResponse";
import { UploadImage } from "@/utils/UploadImage";
export async function POST(req:Request) {
    await DbConnect();
    try {
        const user_data=await req.formData();
        const username=user_data.get("username")as unknown as string
        const email=user_data.get("email")as unknown as string
        const password=user_data.get("password")as unknown as string
        const img=user_data.get('img') as unknown as File
        const img_data:any=await UploadImage(img,'profile-gallery');
        const is_user_there=await UserModel.findOne({username,email});
        if(is_user_there){
            return ApiResponse(401,"Same Username or email already exists",false);
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user_body=new UserModel({
            username:username,
            email:email,
            password:hashedPassword,
            img:img_data.secure_url,
            all_blogs:[]
        });
        const response=await user_body.save();
        return ApiResponse(200,"User Saved Successfully",true);
    } catch (error) {
        return ApiResponse(400,"Error occured while registering the user",false);
    }
}