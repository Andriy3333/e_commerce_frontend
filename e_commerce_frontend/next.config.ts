import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
    reactStrictMode: false, // Turn off strict mode

};

export default nextConfig;
