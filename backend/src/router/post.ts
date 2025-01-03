import { Context, Env, Hono, Input } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import post_Schema from "../Zodschema/post_schema";
import { v2 as cloudinary } from "cloudinary";
// import { encodeBase64 } from "hono/utils/encode";
import { rateLimiter } from "hono-rate-limiter";

const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dw4ua6wpq/image/upload';
const cloudinaryPreset = 'ml_default';

export const postRoute = new Hono<{
    Bindings:{
        CLOUDINARY_CLOUD_NAME: string;
        CLOUDINARY_API_KEY: string;
        CLOUDINARY_API_SECRET: string
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
        userId: string;
    }
    
}>()

postRoute.use(async(c,next)=>{
    cloudinary.config({
        cloud_name: c.env.CLOUDINARY_CLOUD_NAME,
        api_key: c.env.CLOUDINARY_API_KEY,
        api_secret: c.env.CLOUDINARY_API_SECRET,
    });
    await next();
})

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
// postRoute.post('/upload',async(c)=>{

//     const body = await c.req.json();
//     console.log(body);
    
//     const { success , error } = post_Schema.safeParse(body);
//     if(!success){
//         return c.json({ 
//             status: "error",
//             message: "Invalid request body",
//             errors: error.errors
//         });
//     }

    
//     const authorId = c.get("userId");
//     const prisma = new PrismaClient({
//         datasourceUrl:c.env.DATABASE_URL,
//     }).$extends(withAccelerate())
    
//     try{
//         const posts = await prisma.post.create({
//             data:{
//                 title:body.title,
//                 content:body.content,
//                 price:body.price,
//                 phone:body.phone,
//                 imageURl:body.image,
//                 authorId:authorId
                
//             }
//         })
//         console.log(posts.authorId);

//         return c.json({
//             id:posts.authorId
//         })

//     }catch(err:any){
//         return c.json({
//             status:"error",
//             message:"failed to create post",err,
//         })
//     }
// })

postRoute.post('/upload',
    async (c) => {
    const formData = await c.req.formData();
    console.log(formData);

    const formDataObj: { [key: string]: any } = {};
    formData.forEach((value, key) => {
        formDataObj[key] = value;
    });

    const { success, error } = post_Schema.safeParse(formDataObj);

    if (!success) {
        return c.json({
            status: "error",
            message: "Invalid request body",
            errors: error.errors,
        });
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    if (!authorId) {
        return c.json({
            status: 'error',
            message: 'User ID not found in context. Are you logged in?',
        }, 401);
    }

    try {
        // Image upload logic
        const image = formData.get('image') as File;
        if (!image) {
            return c.json({
                status: 'error',
                message: 'Image file is required',
            }, 400);
        }

        // Prepare data for Cloudinary upload using FormData
        const uploadData = new FormData();
        uploadData.append('file', image);
        uploadData.append('upload_preset', cloudinaryPreset);

        // Upload image to Cloudinary using fetch
        const cloudinaryResponse = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: uploadData,
        });

        // Log full response for troubleshooting
        interface CloudinaryResponse {
            secure_url: string;
            message?: string;
        }
        const cloudinaryResponseBody = await cloudinaryResponse.json() as CloudinaryResponse;
        console.log('Cloudinary Response:', cloudinaryResponseBody);

        if (!cloudinaryResponse.ok) {
            throw new Error(`Failed to upload image to Cloudinary: ${cloudinaryResponseBody?.message || 'Unknown error'}`);
        }

        const imageUrl = cloudinaryResponseBody.secure_url;

        // Create post in the database
        const post = await prisma.post.create({
            data: {
                title: formData.get('title')?.toString() || '',
                content: formData.get('content')?.toString() || '',
                price: formData.get('price') ? String(formData.get('price')) : '0',
                phone: formData.get('phone')?.toString() || '',
                imageURl: imageUrl, // Use the URL from Cloudinary
                authorId: authorId, // Use the logged-in user ID
            }
        });

        return c.json({
            status: 'success',
            message: 'Post created successfully',
            postId: post.id,
            imageURL: imageUrl, // Return the image URL from Cloudinary
        });
    } catch (err) {
        console.error('Error in /upload route:', err);
        return c.json({
            status: "error",
            message: "Failed to create post",
            error: (err as any).message || "Unknown error"
        }, 500);
    }
});

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
postRoute.put('/update', async (c) => {
    const formData = await c.req.formData();

    const formDataObj: { [key: string]: any } = {};
    formData.forEach((value, key) => {
        formDataObj[key] = value;
    });

    const { success, error } = post_Schema.safeParse(formDataObj);

    if (!success) {
        return c.json({
            status: "error",
            message: "Invalid request body",
            errors: error.errors,
        }, 400);
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const postId = formData.get("id")?.toString();
    if (!postId) {
        return c.json({
            status: "error",
            message: "Post ID is required",
        }, 400);
    }

    try {
        // Fetch the current post to ensure it exists
        const existingPost = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!existingPost) {
            return c.json({
                status: "error",
                message: "Post not found",
            }, 404);
        }

        let imageUrl = existingPost.imageURl; // Retain current image URL if no new image is uploaded

        // Check if a new image is provided
        const image = formData.get('image') as File;
        if (image) {
            const uploadData = new FormData();
            uploadData.append('file', image);
            uploadData.append('upload_preset', cloudinaryPreset);

            const cloudinaryResponse = await fetch(cloudinaryUrl, {
                method: 'POST',
                body: uploadData,
            });

            const cloudinaryResponseBody = await cloudinaryResponse.json() as {
                secure_url: string;
                message?: string;
            };

            if (!cloudinaryResponse.ok) {
                throw new Error(
                    `Failed to upload image to Cloudinary: ${cloudinaryResponseBody?.message || 'Unknown error'}`
                );
            }

            imageUrl = cloudinaryResponseBody.secure_url; // Update with new image URL
        }

        // Update the post in the database
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                title: formData.get('title')?.toString() || existingPost.title,
                content: formData.get('content')?.toString() || existingPost.content,
                price: formData.get('price') ? String(formData.get('price')) : existingPost.price,
                phone: formData.get('phone')?.toString() || existingPost.phone,
                imageURl: imageUrl, // Use the updated or existing image URL
            },
        });

        return c.json({
            status: "success",
            message: "Post updated successfully",
            post: updatedPost,
        });
    } catch (err) {
        console.error("Error in /update route:", err);
        return c.json({
            status: "error",
            message: "Failed to update post",
            error: (err as any).message || "Unknown error",
        }, 500);
    }
});

  
//----------------------------------get posts--------------------------------------------//
postRoute.get('/bulk', async (c)=>{
    
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
                imageURl:true,
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
                imageURl:true,
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