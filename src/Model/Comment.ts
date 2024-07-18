import mongoose, { Schema,Document} from "mongoose";
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
const ReplyModel=mongoose.models.Replies as mongoose.Model<RevNestedReplies> || mongoose.model<RevNestedReplies>('Replies',NewNestedRepliesSchema);
export interface InterMessageRev extends Document{
    give_username:string,
    comment:string,
    Replies:RevNestedReplies[],
    createdAt:Date,
    updatedAt:Date
}
const MessageSchema:Schema<InterMessageRev>=new Schema({
    give_username:{
        type:String,
        required:[true,"Please provide username"]
    },
    comment:{
        type:String,
        required:true,
    },
    Replies:[NewNestedRepliesSchema],
},{timestamps:true});
const MessageModel=mongoose.models.Comments as mongoose.Model<InterMessageRev> || mongoose.model<InterMessageRev>('Messages',MessageSchema);  
// const MessageModel=mongoose.models.Messages as mongoose.Model<> || mongoose.model<Message>('Messages',MessageSchema);  
export interface RevFeedBack extends Document{
    blog_id:string,
    Comments:InterMessageRev[],
}
const CommentSchema:Schema<RevFeedBack>=new Schema({
    blog_id:{
        type:String,
        required:[true,"Please provide Commentname"]
    },  
    Comments:[MessageSchema],
},{timestamps:true});
const CommentModel=mongoose.models.NComments as mongoose.Model<RevFeedBack> || mongoose.model<RevFeedBack>('NComments',CommentSchema);  
export {CommentModel,MessageModel,ReplyModel};  