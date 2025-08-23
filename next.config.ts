/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: any) => {
    // Handle SVGs as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;