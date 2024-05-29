import {z} from "zod";
export const RegisterSchema=z.object({
    username:z.string(),
    email:z.string().email(),
    ph_no:z.number().min(10,{message:"Ph number should be atleaset 10 digits"})
                     .max(10,{message:"Ph no should be only 10 digits"}),     
    password:z.string()
               .min(3,{message:"Password Schould be atleast 3 characters"}),
    img:z.string().optional(),
});