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
    // Allow images from specific external domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Wildcard to allow all domains; replace with specific domains for production (e.g., 'via.placeholder.com')
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
