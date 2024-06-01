interface ApiResponse{
    status:number,
    message:String,
    type:String
}
const ApiResponse=(status:number,message:string,type:boolean)=>{
    return Response.json({success:type,message:message},{status});
}
export default ApiResponse;