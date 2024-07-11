import mongoose,{ Schema } from "mongoose";
export interface NestedReplies extends Document{
    give_username:string,
    reply_msg:string,
    createdAt:Date,
    updatedAt:Date
}
const NestedRepliesSchema:Schema<NestedReplies>=new Schema({
    give_username:{
        type:String,
        required:[true,"Please provide username"]
    },
    reply_msg:{
        type:String,
        required:true,
    },
},{timestamps:true});
export interface Replies extends Document{
    parent_cmtid:string,
    reply:NestedReplies[],
    createdAt:Date,
    updatedAt:Date,
}
const ReplySchema:Schema<Replies>=new Schema({
    parent_cmtid:{
        type:String,
        required:[true,"Please provide username"]
    },
    reply:[NestedRepliesSchema],
},{timestamps:true});
const ReplyModel=mongoose.models.Replies as mongoose.Model<Replies> || mongoose.model<Replies>('Replies',ReplySchema);
export default ReplyModel;