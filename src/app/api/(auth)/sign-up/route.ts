import {DbConnect} from "@/utils/DbConnection";
import UserModel from "@/Model/User";
import bcrypt from 'bcryptjs';
import ApiResponse from "@/utils/ApiResponse";
export async function POST(res:Response) {
    await DbConnect();
    try {
        const user_data=await res.json();
        const {username,email,password}=user_data
        const is_user_there=await UserModel.findOne({username,email});
        if(is_user_there){
            return ApiResponse(401,"Same Username or email already exists",false);
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user_body=new UserModel({...user_data,password:hashedPassword});
        const response=await user_body.save();
        return ApiResponse(200,"User Saved Successfully",true);
    } catch (error) {
        return ApiResponse(400,"Error occured while registering the user",false);
    }
}