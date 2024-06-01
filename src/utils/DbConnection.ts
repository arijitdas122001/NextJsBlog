import mongoose, { mongo } from "mongoose";
type connectionObject={
    isConnected?:number
}
const connnecton :connectionObject ={};
export const DbConnect=async()=>{
    if(connnecton.isConnected){
        console.log("Db already connected");
        return;
    }
    try {
        const db=await mongoose.connect(process.env.MONGO_URI!);
        connnecton.isConnected=db.connections[0].readyState;
        console.log("Db Successfully Connected")
    } catch (error) {
        console.log("Error While setting up connection to db");
    } 
}