import mongoose, { Schema,Document} from "mongoose";
export interface InterMessage extends Document{
    give_username:string,
    comment:string,
    createdAt:Date,
    updatedAt:Date
}
const MessageSchema:Schema<InterMessage>=new Schema({
    give_username:{
        type:String,
        required:[true,"Please provide username"]
    },
    comment:{
        type:String,
        required:true,
    },
},{timestamps:true});
const MessageModel=mongoose.models.Comments as mongoose.Model<InterMessage> || mongoose.model<InterMessage>('Messages',MessageSchema);  
// const MessageModel=mongoose.models.Messages as mongoose.Model<> || mongoose.model<Message>('Messages',MessageSchema);  
export interface FeedBack extends Document{
    blog_id:string,
    Comments:InterMessage[],
}
const CommentSchema:Schema<FeedBack>=new Schema({
    blog_id:{
        type:String,
        required:[true,"Please provide Commentname"]
    },  
    Comments:[MessageSchema],
},{timestamps:true});
const CommentModel=mongoose.models.Comments as mongoose.Model<FeedBack> || mongoose.model<FeedBack>('Comments',CommentSchema);  
export {CommentModel,MessageModel};  