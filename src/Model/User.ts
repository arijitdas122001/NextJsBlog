import mongoose, { Schema,Document } from "mongoose";
export interface UserInterface extends Document{
    username:string,
    email:string,
    ph_no:Number,
    password:string,
    img:string,
} 
const UserSchema : Schema<UserInterface>=new Schema({
    username:{
        type:String,
        trim:true,
        unique:true,
        required:[true,"Please provide username"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please provide email"]
    },
    ph_no:{
        type:Number,
        unique:true
    },
    password:{
        type:String,
        unique:true,
        required:[true,"Please provide a password"]
    },
    img:{
        type:String,
    }
},{timestamps:true});
const UserModel=mongoose.models.User as mongoose.Model<UserInterface> || mongoose.model<UserInterface>('User',UserSchema);  
export default UserModel;   