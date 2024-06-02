import mongoose, { mongo } from "mongoose";
type connectionObject={
    isConnected?:number
}
const connecton :connectionObject ={};
export async function DbConnect(): Promise<void> {
    if (connecton.isConnected) {
      console.log('Already connected to the database');
      return;
    }
  
    try {
      const db = await mongoose.connect(process.env.MONGO_URI || '', {});
  
      connecton.isConnected = db.connections[0].readyState;
  
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection failed:', error);
      process.exit(1);
    }
  }