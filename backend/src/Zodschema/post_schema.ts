import { z } from 'zod';

const post_Schema = z.object({
  title: z.string().min(2, { message: "Please add title" }),
  content: z.string().min(2, { message: "Please add content" }),
  image: z.any().refine((val) => val instanceof File, {
    message: "Please upload a valid image file",
  }), // Expecting a file object, will handle upload later
  price: z.string().min(1, { message: "Enter the price" }),
  phone: z.string().min(10, { message: "Enter a valid phone number" }),
});

export default post_Schema;
