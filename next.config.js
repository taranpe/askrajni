/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // 🔴 MOST IMPORTANT
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
