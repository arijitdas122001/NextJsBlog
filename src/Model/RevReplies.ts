import mongoose,{ Schema } from "mongoose";
export interface RevNestedReplies extends Document{
    give_username:string,
    reply_msg:string,
    createdAt:Date,
    updatedAt:Date
}
const NewNestedRepliesSchema:Schema<RevNestedReplies>=new Schema({
    give_username:{
        type:String,
        required:[true,"Please provide username"]
    },
    reply_msg:{
        type:String,
        required:true,
    },
},{timestamps:true});
export interface RevReplies extends Document{
    blog_id:string,
    parent_cmtid:string,
    reply:RevNestedReplies[],
    createdAt:Date,
    updatedAt:Date,
}
const NewReplySchema:Schema<RevReplies>=new Schema({
    blog_id:{
        type:String,
        required:[true,"Please provide id"]
    },
    parent_cmtid:{
        type:String,
        required:[true,"Please provide id"]
    },
    reply:[NewNestedRepliesSchema],
},{timestamps:true});
const RevRepliesModel=mongoose.models.Nreplies as mongoose.Model<RevReplies> || mongoose.model<RevReplies>('Nreplies',NewReplySchema);
export default RevRepliesModel;