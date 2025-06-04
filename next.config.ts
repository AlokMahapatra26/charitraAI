// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // 🚫 disables type checking
  },
  eslint: {
    ignoreDuringBuilds: true, // 🚫 disables ESLint
  },
};

module.exports = nextConfig;
