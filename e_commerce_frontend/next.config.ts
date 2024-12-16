import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Set to false to skip ESLint checks during `next build`
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
