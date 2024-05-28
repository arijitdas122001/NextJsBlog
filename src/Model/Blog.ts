import mongoose, { Schema,Document } from "mongoose";
export interface BlogInterface extends Document{
    username:string,
    title:string,
    sub_title:string,
    description:string,
    img:string,
    tags:string[]
} 
const BlogSchema : Schema<BlogInterface>=new Schema({
    username:{
        type:String,
        required:[true,"Please provide username"]
    },
    title:{
        type:String,
        unique:true,
        required:[true,"Please provide title"]
    },
    sub_title:{
        type:String,
        unique:true,
        required:[true,"Please provide sub-title"]
    },
    description:{
        type:String,
        unique:true,
        required:[true,"Please provide a description"]
    },
    img:{
        type:String,
    },
    tags:[String]
},{timestamps:true});
const BlogModel=mongoose.models.Blogs as mongoose.Model<BlogInterface> || mongoose.model<BlogInterface>('Blogs',BlogSchema);  
export default BlogModel;   