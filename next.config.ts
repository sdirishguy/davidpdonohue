import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Ensure all assets are properly handled
  assetPrefix: '',
  basePath: '',
  // Disable features that don't work with static export
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure client-side code is properly bundled
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
