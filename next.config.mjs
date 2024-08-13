/* eslint-disable import/no-anonymous-default-export */

/** @type {import('next').NextConfig} */
export default {
  optimizeFonts: true,
  basePath: '',
  crossOrigin: 'anonymous',
  distDir: 'build',
  trailingSlash: false,
  env: {
    STATE: process.env.STATE,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'scontent.fmnl4-7.fna.fbcdn.net',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
};
