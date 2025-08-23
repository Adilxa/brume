import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Completely disable image optimization to fix sharp issues
  images: {
    unoptimized: true,
    disableStaticImages: true,
  },

  // Production optimizations
  poweredByHeader: false,
  reactStrictMode: true,

  // Server configuration
  env: {
    PORT: "3000",
  },

  // Output configuration for production
  output: "standalone",

  // Compression
  compress: true,

  // Webpack configuration to exclude sharp
  webpack: (config, { isServer }) => {
    // Exclude sharp from client-side bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        sharp: false,
      };
    }
    return config;
  },

  // Disable problematic optimizations
  experimental: {
    // Remove optimizeCss - it's causing the critters error
  },
};

export default nextConfig;