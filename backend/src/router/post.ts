import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import post_Schema from "../Zodschema/post_schema";

export const postRoute = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
        userId: string;
    }
    
}>()

postRoute.use('/*',async(c,next)=>{
    const auth_header = c.req.header("authorization");
    console.log("kooo");
    
    console.log(auth_header);

    if (!auth_header) { 
        return c.json({ status: "error", 
        message: "Authorization header missing" }, 401); 
    }

    const user = await verify(auth_header, c.env.JWT_SECRET)
    
    try{
        if(user){
            c.set("userId",user.id as string);
            await next();
        }
        else{
            c.json({
                message:"you are not login"
            });

        }
    }catch(err){
        return c.json({
            status:"error",
            message:"invalid token"
        })
    }
})

postRoute.post('/',async(c)=>{

    const body = await c.req.json();
    console.log(body);
    
    const { success , error } = post_Schema.safeParse(body);
    if(!success){
        return c.json({ 
            status: "error",
            message: "Invalid request body",
            errors: error.errors
        });
    }
    

    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try{
        const posts = await prisma.post.create({
            data:{
                title:body.title,
                content:body.content,
                image:body.image,
                authorId: String(authorId)
            }
        })
        console.log(posts.id);

        return c.json({
            id:posts.id
        })
        

    }catch(err:any){
        return c.json({
            status:"error",
            message:"failed to create post"
        })
        
    }
    
})