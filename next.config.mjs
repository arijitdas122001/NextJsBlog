/** @type {import('next').NextConfig} */
const nextConfig = {reactStrictMode: true, 
    images: {
      domains: ['res.cloudinary.com','www.freepik.com','img.freepik.com'],
    },
    eslint:{
      ignoreDuringBuilds:true,
    }
  };
export default nextConfig;
