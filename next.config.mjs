/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ai-text-to-image-generator-api.p.rapidapi.com', 'firebasestorage.googleapis.com'],
  },
  env: {
    RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
