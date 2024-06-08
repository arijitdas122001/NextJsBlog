import cloudinary from "@/lib/cloudinary";
export const UploadImage=async(file:File,folder:string)=>{
    try{
    const buffer=await file.arrayBuffer();
    const byte=Buffer.from(buffer);
    return new Promise(async(resolve,reject)=>{
        await cloudinary.uploader.upload_stream({
            resource_type:'auto',
            folder:folder,
        },
        async (err,result)=>{
            if(err){
                return reject(err);
            }
            return resolve(result);
        }
    ).end(byte)
    })
}catch(err){
    console.log("error while uploading the image");
}
}