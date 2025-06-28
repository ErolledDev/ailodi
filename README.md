# Professional Next.js Blog

A modern, professional blog built with Next.js, designed for Cloudflare Pages deployment. Features a clean, Medium-like design with dynamic content fetching and SEO optimization.

## 🚀 Features

- **Modern Design**: Clean, professional interface inspired by Medium
- **Dynamic Content**: Fetches content from external API without requiring redeployment
- **SEO Optimized**: Full SEO support with meta tags, Open Graph, and Twitter Cards
- **Responsive**: Mobile-first design that works on all devices
- **Fast Performance**: Optimized for Cloudflare Pages with proper caching headers
- **Search & Filter**: Built-in search and category filtering
- **Markdown Support**: Full markdown rendering with syntax highlighting
- **Type Safe**: Built with TypeScript for better development experience

## 🛠️ Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Content**: Markdown with react-markdown and syntax highlighting
- **Deployment**: Cloudflare Pages
- **Type Safety**: TypeScript
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Cloudflare account (for deployment)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nextjs-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and configure your settings.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Content API

The blog fetches content from your API endpoint. The expected format is:

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

## 🚀 Deployment to Cloudflare Pages

### Method 1: Git Integration (Recommended)

1. **Push your code to GitHub/GitLab**

2. **Connect to Cloudflare Pages**
   - Go to Cloudflare Dashboard > Pages
   - Click "Create a project" > "Connect to Git"
   - Select your repository

3. **Configure build settings**
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node.js version: `18.x`

4. **Set environment variables** (if needed)
   - Add any environment variables in the Pages dashboard

### Method 2: Direct Upload

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload the `out` directory** to Cloudflare Pages

## 🔧 Configuration

### Customizing the Design

- Edit `tailwind.config.ts` for theme customization
- Modify components in `components/` directory
- Update styles in `app/globals.css`

### API Configuration

- Update the API URL in `lib/content.ts`
- Modify the content structure in `types/blog.ts` if needed

### SEO Configuration

- Update meta tags in `app/layout.tsx`
- Customize Open Graph settings for each page

## 📱 Features

### Search & Filtering
- Real-time search across all content
- Category-based filtering
- Responsive design

### Content Management
- Automatic content fetching from API
- Client-side updates without redeployment
- Caching for improved performance

### SEO & Performance
- Automatic sitemap generation
- Optimized images and assets
- Proper meta tags and structured data
- Cloudflare Pages optimization

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `app/globals.css`:

```css
:root {
  --primary: your-color;
  --secondary: your-color;
  /* ... */
}
```

### Adding New Pages
Create new pages in the `app/` directory following Next.js App Router conventions.

### Modifying Components
All reusable components are in the `components/` directory and can be customized as needed.

## 🔍 SEO Features

- Dynamic meta tags based on content
- Open Graph and Twitter Card support
- Structured data for articles
- Automatic sitemap generation
- Optimized URLs and slugs

## 🚦 Performance

- Static site generation for fast loading
- Optimized images with Next.js Image component
- Proper caching headers for Cloudflare
- CSS and JavaScript optimization
- Lazy loading for better performance

## 📧 Contact & Support

For questions or support, please check the contact page or reach out through the configured contact methods.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and deployed on Cloudflare Pages.