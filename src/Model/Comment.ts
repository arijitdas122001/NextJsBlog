import mongoose, { Schema,Document} from "mongoose";
export interface RevNestedReplies1 extends Document{
    give_username:string,
    reply_msg:string,
    Likes:[string],
    createdAt:Date,
    updatedAt:Date
}
const NewNestedRepliesSchema:Schema<RevNestedReplies1>=new Schema({
    give_username:{
        type:String,
        required:[true,"Please provide username"]
    },
    reply_msg:{
        type:String,
        required:true,
    },
    Likes:[String],
},{timestamps:true});
const ReplyModel=mongoose.models.Replies as mongoose.Model<RevNestedReplies1> || mongoose.model<RevNestedReplies1>('Replies',NewNestedRepliesSchema);
export interface InterMessageRev1 extends Document{
    give_username:string,
    comment:string,
    Replies:RevNestedReplies1[],
    Likes:[string],
    createdAt:Date,
    updatedAt:Date
}
const MessageSchema:Schema<InterMessageRev1>=new Schema({
    give_username:{
        type:String,
        required:[true,"Please provide username"]
    },
    comment:{
        type:String,
        required:true,
    },
    Replies:[NewNestedRepliesSchema],
    Likes:[String],
},{timestamps:true});
const MessageModel=mongoose.models.NMessage as mongoose.Model<InterMessageRev1> || mongoose.model<InterMessageRev1>('NMessage',MessageSchema);  
// const MessageModel=mongoose.models.Messages as mongoose.Model<> || mongoose.model<Message>('Messages',MessageSchema);  
export interface RevFeedBack1 extends Document{
    blog_id:string,
    Comments:InterMessageRev1[],
}
const CommentSchema:Schema<RevFeedBack1>=new Schema({
    blog_id:{
        type:String,
        required:[true,"Please provide Commentname"]
    },  
    Comments:[MessageSchema],
},{timestamps:true});
const CommentModel=mongoose.models.MComments as mongoose.Model<RevFeedBack1> || mongoose.model<RevFeedBack1>('MComments',CommentSchema);  
export {CommentModel,MessageModel,ReplyModel};  