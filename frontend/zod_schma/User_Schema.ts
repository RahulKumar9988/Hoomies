import {string, z} from 'zod'

const Signup_schmea = z.object({
    username : z.string().min(2,{message:"username length must be grater then 2"}),
    email : z.string().email({message:"email should be valid and correct"}),
    password : z.string().min(7,{message:"pass length must grater then 7"}),
})

const Signin_schema = z.object({    
    email : z.string().email({message:"email should be valid and correct"}),
    password : z.string().min(7,{message:"pass length must grater then 7"}),
})

const Post_schema = z.object({
    title : z.string().min(2,{message:"title length must be grater then"}),
    content : z.string().min(2,{message:"body length must be grater then"}),
    phone:z.string().min(10,{message:"must be 10 digits"}),
    price:z.string().min(2,{message:"must contain 2 digits"}),
    image:z.instanceof(File).refine((file) => file.size > 0,{message:"uplaod image"}),

})
export { Signup_schmea, Signin_schema, Post_schema};