import {z} from 'zod'

const Signup_schmea = z.object({
    username : z.string().min(2,{message:"username length must be grater then 2"}),
    email : z.string().email({message:"email should be valid and correct"}),
    password : z.string().min(7,{message:"pass length must grater then 7"}),
})

const Signin_schema = z.object({    
    email : z.string().email({message:"email should be valid and correct"}),
    password : z.string().min(7,{message:"pass length must grater then 7"}),
})

export { Signup_schmea, Signin_schema };