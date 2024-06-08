import { v2 as cloudinary } from "cloudinary"
export const UploadImage=async(file:File,folder:string)=>{
    const buffer=await file.arrayBuffer();
    const byte=Buffer.from(buffer);
    return new Promise(async(resolve,reject)=>{
        await cloudinary.uploader.upload_stream({
            resource_type:'auto',
            folder:folder,
        },
        async (err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        }
    ).end(byte)
    })
}