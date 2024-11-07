import {z} from 'zod';
const post_Schema= z.object({
    title: z.string().min(2, { message: "please add title" }),
    content: z.string().min(2, { message: "please add content" }),
    image: z.string({ message: "import image" }),
});

export default post_Schema;
