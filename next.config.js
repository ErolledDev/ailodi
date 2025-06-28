/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable SWC to fix loading issues in WebContainer environment
  swcMinify: false,
  
  // Cloudflare Workers optimization
  experimental: {
    optimizeCss: true,
  },
  
  // Output configuration for static export
  output: 'export',
  trailingSlash: true,
  
  // Asset prefix for static export
  assetPrefix: './',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
    domains: [
      'firebasestorage.googleapis.com',
      'images.unsplash.com',
      'cdn.jsdelivr.net',
      'via.placeholder.com'
    ]
  },
};

module.exports = nextConfig;