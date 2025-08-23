/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export to bypass image optimization
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
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