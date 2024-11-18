import { z } from 'zod';

const user_Schema_signin = z.object({
    email: z.string().email({message:"email should be valid and unique"}),
    password: z.string().min(7,{message:"password must be grater then 6 size"}),
})

export default  user_Schema_signin ;

