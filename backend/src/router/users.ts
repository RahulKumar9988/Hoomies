import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from "@prisma/extension-accelerate";
import {z} from 'zod';
import user_Schema_signup from "../Zodschema/user_schema";
import user_Schema_signin from "../Zodschema/user_schema";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET: string;

    }
}>();



//------------------SIGNUP ROUTE -----------------------------//

userRouter.post('/signup',async(c)=>{    
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const data = await c.req.json()
        user_Schema_signup.safeParse(data)
        
        const newUser = await prisma.user.create({
            data:{
                username:data.username,
                email:data.email,
                password:data.password
            }

        })
        const jwt = await sign({
            id:newUser.id
        },c.env.JWT_SECRET)
        return c.json({
            message:"user created",
            jwt:jwt,
        })
        
    }catch(err:any){

        if(err instanceof z.ZodError){
            return c.json({errors:err.errors},400)
        }
        else if (err.code === 'P2002' && err.meta.target.includes('email')){
            return c.json({message:"user already exist"},400)
        }
        else{
            return c.json({message:"internal server error"})
        }
        
    }
     
})



//------------------SIGNIN ROUTE -----------------------------//

userRouter.post('/signin',async(c)=>{    
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const data = await c.req.json()
        user_Schema_signin.safeParse(data)
        
        const { email, password } = data;

        const userfind = await prisma.user.findUnique({
            where: { email: email },
        })  
        if(!userfind || userfind.password !== password){
            return c.json({message:"invalid credentials"},401)
        }
        const jwt = await sign({
            id:userfind.id
        },c.env.JWT_SECRET)
        return c.json({ jwt}, 200);

        
        
    }catch(err:any){

        if(err instanceof z.ZodError){
            return c.json({errors:err.errors},400)
        }
        else if (err.code === 'P2002' && err.meta.target.includes('email')){
            return c.json({message:"user already exist"},400)
        }
        else{
            return c.json({message:"internal server error"})
        }
        
    }
     
})