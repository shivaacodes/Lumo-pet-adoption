/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**', // For development, you might want to be more specific in production
      }
    ],
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig 