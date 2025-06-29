# AI Lodi - Professional Next.js Tech Blog

A modern, professional blog built with Next.js 14, designed for optimal SEO performance and user experience. Features a clean, Medium-inspired design with dynamic content fetching, comprehensive SEO optimization, and production-ready deployment configuration for Cloudflare Workers.

## 🚀 Features

- **Modern Design**: Clean, professional interface inspired by Medium with enhanced typography
- **Dynamic Content**: Fetches content from external API without requiring redeployment
- **SEO Optimized**: Comprehensive SEO with meta tags, Open Graph, Twitter Cards, structured data, and RSS feeds
- **Responsive Design**: Mobile-first approach that works flawlessly on all devices
- **Fast Performance**: Optimized for Cloudflare Workers with proper caching headers and image optimization
- **Advanced Search**: Enhanced search functionality with fuzzy matching and relevance scoring
- **Progressive Web App**: Full PWA support with offline capabilities and app-like experience
- **Type Safe**: Built with TypeScript for better development experience and fewer runtime errors
- **Accessibility**: WCAG compliant with proper focus management and screen reader support
- **Social Sharing**: Comprehensive social sharing with 10+ platforms including WhatsApp, Telegram, Pinterest

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with App Router (Static Export for Cloudflare Workers)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Content**: Markdown with react-markdown and syntax highlighting
- **Deployment**: Cloudflare Workers (recommended) or Cloudflare Pages
- **Type Safety**: TypeScript
- **Icons**: Lucide React
- **Fonts**: Inter (body) + Playfair Display (headings)

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Cloudflare account with Wrangler CLI installed globally: `npm install -g wrangler`

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd ai-lodi-blog
npm install
```

### 2. Environment Setup

Copy the environment template and configure your settings:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Blog API Configuration
NEXT_PUBLIC_API_URL=https://blogform.netlify.app/api/content.json

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://ailodi.tech
NEXT_PUBLIC_SITE_NAME=AI Lodi
NEXT_PUBLIC_SITE_DESCRIPTION=AI Lodi is your ultimate guide to modern technology, AI breakthroughs, programming trends, and future science.

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=ailodi.tech

# Contact Form (optional)
CONTACT_EMAIL=hello@ailodi.tech
COLLABORATE_EMAIL=collaborate@ailodi.tech
```

### 3. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your site.

### 4. Build for Production

```bash
npm run build
```

This will:
1. Generate static sitemap.xml and feed.xml files
2. Create a static export optimized for Cloudflare Workers
3. Process the build with @cloudflare/next-on-pages

## 🚀 Deployment to Cloudflare Workers

### Prerequisites

1. **Install Wrangler CLI** (if not already installed):
   ```bash
   npm install -g wrangler
   ```

2. **Authenticate with Cloudflare**:
   ```bash
   wrangler login
   ```

### Deployment Steps

1. **Configure your Worker name** in `wrangler.toml`:
   ```toml
   name = "your-blog-name"  # Change this to your preferred name
   ```

2. **Set environment variables** (optional):
   ```bash
   wrangler secret put NEXT_PUBLIC_SITE_URL
   # Enter your production URL when prompted
   ```

3. **Deploy to Cloudflare Workers**:
   ```bash
   npm run deploy
   ```

### Alternative: Cloudflare Pages (Legacy)

If you prefer to use Cloudflare Pages instead of Workers:

1. **Connect your repository** to Cloudflare Pages
2. **Set build settings**:
   - Build command: `npm run build`
   - Build output directory: `out`
3. **Configure environment variables** in the Cloudflare dashboard

## 📝 Content API Configuration

The blog fetches content from your API endpoint. The expected JSON format is:

```json
[
  {
    "id": "unique-id",
    "title": "Article Title",
    "slug": "article-slug", 
    "content": "# Markdown content here...",
    "featuredImageUrl": "https://example.com/image.jpg",
    "metaDescription": "SEO description",
    "seoTitle": "SEO Title",
    "keywords": ["keyword1", "keyword2"],
    "author": "Author Name",
    "categories": ["Category 1", "Category 2"],
    "tags": ["tag1", "tag2"],
    "status": "published",
    "publishDate": "2025-01-01T00:00:00Z",
    "createdAt": "2025-01-01T00:00:00Z", 
    "updatedAt": "2025-01-01T00:00:00Z"
  }
]
```

### API Configuration Files

- **`lib/content.ts`**: Contains all API fetching logic with retry mechanisms and error handling
- **`types/blog.ts`**: TypeScript interfaces for blog post structure

## 🗺️ SEO Metadata Generation

The project uses a custom build-time script to generate SEO metadata files:

### Static Metadata Files

- **`public/sitemap.xml`**: Generated during build from API content
- **`public/feed.xml`**: RSS feed generated during build
- **`app/robots.ts`**: Dynamic robots.txt (compatible with static export)

### Generation Process

1. **Build Time**: `scripts/generate-metadata.js` runs before Next.js build
2. **API Fetch**: Retrieves latest content from your API endpoint
3. **File Generation**: Creates optimized sitemap.xml and feed.xml in public/
4. **Static Export**: Files are included in the final static build

### Manual Generation

You can manually regenerate metadata files:

```bash
npm run generate-metadata
```

## 🎨 Asset Files Setup

After development, you need to add specific asset files to the `public/` directory for optimal SEO and PWA functionality:

### Required Image Assets

Place these files directly in the `public/` directory:

- **`og-image.jpg`** (1200x630px) - Main Open Graph image for social sharing
- **`og-image-square.jpg`** (1200x1200px) - Square Open Graph image
- **`logo.png`** (512x512px) - High-resolution logo for structured data
- **`screenshot-wide.png`** (1280x720px) - PWA screenshot (desktop)
- **`screenshot-narrow.png`** (640x1136px) - PWA screenshot (mobile)

### Required Icon Assets

- **`favicon.ico`** (32x32px) - Standard favicon
- **`favicon.svg`** - Scalable vector favicon
- **`apple-touch-icon.png`** (180x180px) - iOS home screen icon
- **`icon-192.png`** (192x192px) - PWA icon (medium)
- **`icon-512.png`** (512x512px) - PWA icon (large)
- **Microsoft Tile Icons**:
  - `mstile-70x70.png` (70x70px)
  - `mstile-150x150.png` (150x150px)
  - `mstile-310x310.png` (310x310px)
  - `mstile-310x150.png` (310x150px)

## ⚙️ Configuration Files

### Core Configuration

- **`next.config.js`**: Next.js configuration optimized for Cloudflare Workers
- **`wrangler.toml`**: Cloudflare Workers configuration
- **`tailwind.config.ts`**: Tailwind CSS configuration with custom colors and animations
- **`components.json`**: shadcn/ui configuration
- **`tsconfig.json`**: TypeScript configuration

### SEO & Performance

- **`_headers`**: Cloudflare Pages headers for caching and security (if using Pages)
- **`app/robots.ts`**: Dynamic robots.txt generation
- **`scripts/generate-metadata.js`**: Build-time sitemap and RSS generation
- **`public/manifest.json`**: PWA manifest
- **`public/browserconfig.xml`**: Microsoft browser configuration

## 🔧 Customization

### Design Customization

1. **Colors**: Edit CSS variables in `app/globals.css`:
   ```css
   :root {
     --primary: 142 76% 36%; /* Green theme */
     --secondary: 240 4.8% 95.9%;
     /* ... */
   }
   ```

2. **Typography**: Modify font imports in `app/layout.tsx` and `app/globals.css`

3. **Components**: Customize components in `components/` directory

### Content Customization

1. **API Endpoint**: Update `API_URL` in `lib/content.ts` and `scripts/generate-metadata.js`
2. **Content Structure**: Modify interfaces in `types/blog.ts`
3. **Search Logic**: Enhance search functionality in `lib/content.ts`

### SEO Customization

1. **Meta Tags**: Update default metadata in `app/layout.tsx`
2. **Structured Data**: Modify JSON-LD schemas in layout and post pages
3. **Social Media**: Update Open Graph and Twitter Card settings
4. **Metadata Generation**: Customize `scripts/generate-metadata.js` for different sitemap priorities

## 📊 SEO Features

### Comprehensive SEO Implementation

- **Meta Tags**: Dynamic title, description, keywords for each page
- **Open Graph**: Facebook, LinkedIn sharing optimization
- **Twitter Cards**: Twitter sharing optimization
- **Structured Data**: JSON-LD for articles, organization, website, breadcrumbs
- **Sitemap**: Static XML sitemap with proper priorities and frequencies (includes category pages)
- **RSS Feed**: Full-content RSS feed for subscribers
- **Robots.txt**: Dynamic robots.txt with proper directives
- **Canonical URLs**: Proper canonical URL management
- **Image Optimization**: Next.js Image component with proper alt tags

### Performance Optimizations

- **Static Export**: Optimized for Cloudflare Workers edge deployment
- **Image Optimization**: Automatic WebP/AVIF conversion and lazy loading
- **Caching Headers**: Optimized caching strategy for Cloudflare
- **Code Splitting**: Automatic code splitting for optimal bundle sizes
- **Font Optimization**: Preloaded fonts with font-display: swap

## 🔍 Search Functionality

The enhanced search system includes:

- **Fuzzy Matching**: Finds relevant content even with typos
- **Relevance Scoring**: Prioritizes title and description matches
- **Category/Tag Filtering**: Search within specific topics
- **Error Handling**: Graceful fallbacks for API issues
- **Performance**: Optimized search algorithms

## 📱 Progressive Web App

Full PWA support includes:

- **App Manifest**: Complete PWA manifest with icons and screenshots
- **Service Worker**: Automatic service worker for caching (via Next.js)
- **Offline Support**: Basic offline functionality
- **Install Prompt**: Native app installation on supported devices
- **App-like Experience**: Standalone display mode

## 🔗 Social Sharing

Comprehensive social sharing with 10+ platforms:

- **Major Platforms**: Twitter, Facebook, LinkedIn, Reddit
- **Visual Platforms**: Pinterest (with image support)
- **Messaging**: WhatsApp, Telegram, SMS
- **Professional**: Email sharing
- **Utility**: Copy link with success feedback
- **Responsive Design**: Optimized for all screen sizes

## 🔒 Security Features

- **Content Security Policy**: Configured for external image domains
- **Security Headers**: XSS protection, frame options, content type sniffing prevention
- **HTTPS Enforcement**: Strict transport security headers
- **Input Sanitization**: Proper handling of user inputs and search queries

## 📈 Analytics Integration

Ready for analytics integration:

- **Google Analytics 4**: Environment variable configuration
- **Plausible Analytics**: Privacy-focused alternative
- **Custom Events**: Track user interactions and engagement

## 🧪 Testing & Quality

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code quality and consistency
- **Responsive Design**: Tested across all device sizes
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimized Core Web Vitals

## 📞 Support & Maintenance

### Regular Maintenance Tasks

1. **Content Updates**: API content is automatically fetched
2. **Dependency Updates**: Regular npm package updates
3. **Performance Monitoring**: Monitor Core Web Vitals
4. **SEO Monitoring**: Track search rankings and indexing
5. **Security Updates**: Keep dependencies and headers current

### Troubleshooting

- **Build Issues**: Check Node.js version and dependencies
- **API Issues**: Verify API endpoint and content format
- **SEO Issues**: Validate structured data and meta tags
- **Performance Issues**: Analyze bundle size and image optimization
- **Cloudflare Issues**: Check Wrangler configuration and deployment logs

## 🎯 Production Checklist

- ✅ **Cloudflare Workers**: Optimized for edge deployment
- ✅ **Static Export**: Compatible with Cloudflare Workers
- ✅ **TypeScript**: ES2020 target for modern features
- ✅ **Static Metadata**: Build-time sitemap and RSS generation
- ✅ **Related Articles**: Enhanced design with better spacing and hover effects
- ✅ **Social Sharing**: 10+ platforms with responsive design
- ✅ **Sitemap**: Static generation including category pages
- ✅ **SEO**: Comprehensive meta tags and structured data
- ✅ **Performance**: Optimized images and caching headers
- ✅ **PWA**: Full Progressive Web App support
- ✅ **Accessibility**: WCAG 2.1 AA compliance
- ✅ **Responsive**: Mobile-first design
- ✅ **Security**: Proper headers and CSP

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for any improvements.

---

**Built with ❤️ using Next.js 14 and optimized for Cloudflare Workers deployment.**

For questions or support, please check the contact page or reach out through the configured contact methods.