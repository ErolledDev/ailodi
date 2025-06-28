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
  
  // Webpack configuration for WebContainer compatibility
  webpack: (config, { dev, isServer }) => {
    // Replace SWC loader with Babel loader
    config.module.rules.forEach((rule) => {
      if (rule.use && Array.isArray(rule.use)) {
        rule.use.forEach((useItem) => {
          if (useItem.loader && useItem.loader.includes('next-swc-loader')) {
            useItem.loader = 'babel-loader';
            useItem.options = {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript'
              ]
            };
          }
        });
      } else if (rule.use && rule.use.loader && rule.use.loader.includes('next-swc-loader')) {
        rule.use.loader = 'babel-loader';
        rule.use.options = {
          presets: [
            ['@babel/preset-env', { targets: 'defaults' }],
            ['@babel/preset-react', { runtime: 'automatic' }],
            '@babel/preset-typescript'
          ]
        };
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