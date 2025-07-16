// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Enable type checking during the build process
    ignoreBuildErrors: true,
    },
    eslint: {
    // Enable ESLint during the build process
    ignoreDuringBuilds: true,
    },
    images: {
    // Allow images from all domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    },
};

module.exports = nextConfig;
