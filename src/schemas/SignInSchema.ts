import {z} from "zod";
export const SignInSchema=z.object({
    email:z.string().email(),
    password:z.string()
               .min(3,{message:"Password Schould be atleast 3 characters"})

});