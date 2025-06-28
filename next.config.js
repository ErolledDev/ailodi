/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable SWC completely for WebContainer compatibility
  swcMinify: false,
  compiler: {
    // Disable SWC transforms
    removeConsole: false,
  },
  
  // Cloudflare Workers optimization
  experimental: {
    optimizeCss: true,
    // Disable SWC in experimental features too
    swcTraceProfiling: false,
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
      'via.placeholder.com',
      'api.dicebear.com'
    ]
  },
  
  // Webpack configuration for WebContainer compatibility
  webpack: (config, { dev, isServer }) => {
    // Disable SWC loader
    config.module.rules.forEach((rule) => {
      if (rule.use && rule.use.loader === 'next-swc-loader') {
        rule.use.loader = 'babel-loader';
      }
    });
    
    // Add fallbacks for Node.js modules
    if (!isServer) {
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

module.exports = nextConfig;