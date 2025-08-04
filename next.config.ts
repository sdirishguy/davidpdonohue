import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Re-enabled for production deployment
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
