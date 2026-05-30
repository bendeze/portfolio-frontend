import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Allow any path from this domain
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8001',
        pathname: '/**',
      },
    ],
  },

  allowedDevOrigins: ['192.168.1.68'],
};

export default nextConfig;
