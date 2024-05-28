import mongoose, { Schema } from "mongoose";
export interface LikeInterface extends Document{
    to_username:string,
    from_username:[],
} 
const LikeSchema : Schema<LikeInterface>=new Schema({
    to_username:{
        type:String,
        required:[true,"Please provide Likename"]
    },
    from_username:[],
});
const LikeModel=mongoose.models.Likes as mongoose.Model<LikeInterface> || mongoose.model<LikeInterface>('Likes',LikeSchema);  
export default LikeModel;   