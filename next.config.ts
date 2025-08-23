import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable image optimization to fix sharp issues
  images: {
    unoptimized: true,
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

  // Disable problematic optimizations
  experimental: {
    // Remove optimizeCss - it's causing the critters error
  },
};

export default nextConfig;