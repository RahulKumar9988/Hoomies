import {z} from 'zod';
const post_Schema= z.object({
    title: z.string().min(2, { message: "please add title" }),
    content: z.string().min(2, { message: "please add content" }),
    image: z.string({ message: "import image" }),
    price:z.number({message:"enter the price"}),
    phone:z.number().min(10)
});

export default post_Schema;
