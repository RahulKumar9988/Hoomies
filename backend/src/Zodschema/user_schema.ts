import { Hono } from "hono";
import { z } from 'zod';

const user_Schema_signup = z.object({
    username: z.string().min(2,{message:"username must be gratern then 2 size"}),
    email: z.string().email({message:"email should be valid and unique"}),
    password: z.string().min(7,{message:"password must be grater then 6 size"}),
})

const user_Schema_signin = z.object({
    email: z.string().email({message:"email should be valid and unique"}),
    password: z.string().min(7,{message:"password must be grater then 6 size"}),
})

const post_Schema= z.object({
    title: z.string().min(2, { message: "please add title" }),
    content: z.string().min(2, { message: "please add content" }),
    image: z.string({ message: "import image" }),
});

  
export default user_Schema_signin ; user_Schema_signup; post_Schema;

