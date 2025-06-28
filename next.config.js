/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable SWC completely for WebContainer compatibility
  swcMinify: false,
  
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
      'via.placeholder.com',
      'api.dicebear.com'
    ]
  },
};

module.exports = nextConfig;