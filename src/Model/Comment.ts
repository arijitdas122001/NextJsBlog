import mongoose, { Schema } from "mongoose";
export interface CommentInterface extends Document{
    to_username:string,
    from_username:[
        {
            name:string,
            message:string
        }
    ],
} 
const CommentSchema : Schema<CommentInterface>=new Schema({
    to_username:{
        type:String,
        required:[true,"Please provide Commentname"]
    },
    from_username:[{name:String,message:String}],
});
const CommentModel=mongoose.models.Comments as mongoose.Model<CommentInterface> || mongoose.model<CommentInterface>('Comments',CommentSchema);  
export default CommentModel;   