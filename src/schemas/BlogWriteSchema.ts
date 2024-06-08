import {z} from "zod";
export const BlogSchema=z.object({
    username:z.string(),
    title:z.string(),
    sub_title:z.string(),
    description:z.string()
});