import mongoose, { Schema,Document} from "mongoose";
const MessageSchema=new Schema({
    give_username:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true,
    }
});
// const MessageModel=mongoose.models.Messages as mongoose.Model<Message> || mongoose.model<Message>('Messages',MessageSchema);  
// const CommentObject={
//     give_username:{
//         type:String,
//         required:true
//     },
//     comment:{
//         type:String,
//         required:true,
//     }
// }
export interface CommentInterface extends Document{
    to_username:string,
    from_userid:string,
    comments:string[]
}
const CommentSchema:Schema<CommentInterface>=new Schema({
    to_username:{
        type:String,
        required:[true,"Please provide Commentname"]
    },
    from_userid:{
        type:String,
        required:[true,"Please provide Commentname"]
    },
    comments:[String]
});
const CommentModel=mongoose.models.Comment as mongoose.Model<CommentInterface> || mongoose.model<CommentInterface>('Comment',CommentSchema);  
export default CommentModel;  