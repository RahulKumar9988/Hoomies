import type { NextConfig } from "next";
export const BACKEND_URL = 'http://127.0.0.1:8787/api/v1'
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
