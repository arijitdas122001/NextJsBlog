import {z} from 'zod'
export const ReplySchema=z.object({
    replymsg:z.string()
})