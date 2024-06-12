import {z} from "zod";
export const RegisterSchema=z.object({
    username:z.string(),
    email:z.string().email(),
    password:z.string()
               .min(3,{message:"Password Schould be atleast 3 characters"}),
               
});