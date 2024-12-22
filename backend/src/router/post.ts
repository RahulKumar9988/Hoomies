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





//--------------------------------user_Validation-----------------------------------------//
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

//---------------------------------uploading_post-----------------------------------------//
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
                price:body.price,
                phone:body.phone,
                image:body.image,
                authorId:authorId
                
            }
        })
        console.log(posts.authorId);

        return c.json({
            id:posts.authorId
        })
        

    }catch(err:any){
        return c.json({
            status:"error",
            message:"failed to create post",err,
        })
        
    }
    
})

//---------------------------------delete_posts-------------------------------------------//
postRoute.delete('/:id', async (c) => {
    const postId = c.req.param('id'); 
    const userId = c.get('userId'); 
    
    // Initialize Prisma client
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL, 
    }).$extends(withAccelerate());
    
    try {
      // Check post exists
        const post = await prisma.post.findUnique({
        where: { id: postId }
        });
  
        if (!post) {
        return c.json({
            status: 'error',
            message: 'Post not found',
        }, 404);
        }

        // Check if the user is authorized to delete the post
        if (post.authorId !== userId) {
        return c.json({
            status: 'error',
            message: 'Unauthorized',
        }, 403);
        }

        // Delete the post
        await prisma.post.delete({
        where: { id: postId }
        });

        return c.json({
        status: 'success',
        message: 'Post deleted successfully',
        postId: postId,
        }, 200);
  
    }catch (err) {

        console.error('Failed to delete post:', err);
        return c.json({
        status: 'error',
        message: 'Failed to delete post',
        }, 500);
    }
});

//----------------------------------update_post-------------------------------------------//
postRoute.put('/', async (c) => {
    const body = await c.req.json();
    const { success , error } = post_Schema.safeParse(body);
    
    if(!success){
        return c.json({
            status: 'error',
            message: 'schema is invalid',error
        })
    }
    
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const updated_post = await prisma.post.update({
            where:{
                id:body.id
            },data:{
                title:body.title,
                content:body.content,
                price:body.price,
                phone:body.phone,
                image:body.image,
                
            }
        })
        return c.json({
            status: 'success',
            message: 'Post updated successfully',
            id: updated_post.id
        })
    }catch(err){
        return c.json({
            status: 'error',
            message: 'Failed to update post',
        })
    }
})
  
//----------------------------------bulk_route--------------------------------------------//
postRoute.get('/', async (c)=>{
    
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const post = await prisma.post.findMany({
            select:{
                content:true,
                title:true,
                price:true,
                phone:true,
                image:true,
            }
        })
    
        return c.json({post})

    }catch(err){
        return c.json({
            status: 'error',
            message: 'Failed to fetch posts',
        })
    }
})

postRoute.get('/:id', async (c)=>{
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{

        const post = await prisma.post.findFirst({
            where:{
                authorId:id
            },
            select:{
                authorId:true,
                content:true,
                title:true,
                price:true,
                phone:true,
                image:true,
            }
        })

        return c.json({post});

    }catch(err){
        return c.json({
            status:'error',
            message:"unable to get data"
        })
    }

})