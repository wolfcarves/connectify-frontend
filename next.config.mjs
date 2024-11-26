/* eslint-disable import/no-anonymous-default-export */

/** @type {import('next').NextConfig} */
export default {
  images: {
    remotePatterns: [
      {
        hostname: 'scontent.fmnl4-7.fna.fbcdn.net',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
      {
        hostname: 'res.cloudinary.com',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
      {
        hostname: 'github.com',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
      {
        hostname: 'rodelcrisosto.vercel.app',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
      {
        hostname: 'images.unsplash.com',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
};
