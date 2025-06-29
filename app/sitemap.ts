import { MetadataRoute } from 'next';
import { getAllContent } from '@/lib/content';

// Force dynamic rendering to ensure fresh data from external API
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.tech';
  
  // Static pages with enhanced priority and frequency
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic blog posts with enhanced metadata
  let blogPosts: MetadataRoute.Sitemap = [];
  let categoryPages: MetadataRoute.Sitemap = [];
  
  try {
    console.log('🗺️ SITEMAP: Fetching fresh content from API...');
    
    // Fetch fresh content with no caching to ensure latest data
    const posts = await getAllContent({ 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    console.log(`🗺️ SITEMAP: Successfully fetched ${posts.length} posts`);
    
    // Blog post URLs
    blogPosts = posts.map((post) => {
      const postDate = new Date(post.updatedAt);
      const now = new Date();
      const daysSinceUpdate = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Adjust change frequency based on post age
      let changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly';
      if (daysSinceUpdate < 7) changeFrequency = 'daily';
      else if (daysSinceUpdate < 30) changeFrequency = 'weekly';
      else if (daysSinceUpdate < 365) changeFrequency = 'monthly';
      else changeFrequency = 'yearly';

      return {
        url: `${baseUrl}/post/${post.slug}`,
        lastModified: postDate,
        changeFrequency,
        priority: 0.9,
      };
    });

    // Category pages
    const categories = [...new Set(posts.flatMap(post => post.categories))];
    categoryPages = categories.map((category) => ({
      url: `${baseUrl}/categories?filter=${encodeURIComponent(category)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    console.log(`🗺️ SITEMAP: Generated ${blogPosts.length} blog post URLs and ${categoryPages.length} category URLs`);

  } catch (error) {
    console.error('🗺️ SITEMAP ERROR: Failed to fetch posts for sitemap:', error);
    
    // Return static pages even if dynamic content fails
    // This ensures the sitemap is still functional for core pages
    console.log('🗺️ SITEMAP: Falling back to static pages only due to API error');
  }

  const allPages = [...staticPages, ...blogPosts, ...categoryPages];
  
  console.log(`🗺️ SITEMAP: Final sitemap contains ${allPages.length} total URLs`);
  
  return allPages;
}