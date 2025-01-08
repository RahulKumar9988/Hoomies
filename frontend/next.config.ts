import type { NextConfig } from "next";
export const BACKEND_URL = 'https://backend.stkwhy000.workers.dev/api/v1'
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: 'unsplash.com' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'plus.unsplash.com' },
      { hostname: 'res.cloudinary.com' }
    ], // Allow Unsplash images
  },
  // output: 'export',
  
};
export default nextConfig;
