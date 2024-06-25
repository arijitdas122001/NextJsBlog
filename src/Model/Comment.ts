import mongoose, { Schema,Document} from "mongoose";
export interface MessageInterface extends Document{
    user_id:string,
    comment:string
}
const MessageSchema=new Schema({
    user_id:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true,
    }
});
// const MessageModel=mongoose.models.Messages as mongoose.Model<> || mongoose.model<Message>('Messages',MessageSchema);  
export interface CommentInterface extends Document{
    to_username:string,
    Comments:MessageInterface[]
}
const CommentSchema:Schema<CommentInterface>=new Schema({
    to_username:{
        type:String,
        required:[true,"Please provide Commentname"]
    },  
    Comments:[MessageSchema]
});
const CommentModel=mongoose.models.Comments as mongoose.Model<CommentInterface> || mongoose.model<CommentInterface>('Comments',CommentSchema);  
export default CommentModel;  