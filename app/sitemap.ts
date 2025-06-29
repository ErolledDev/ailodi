import { MetadataRoute } from 'next';
import { getAllContent } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.tech';
  
  // Static pages with enhanced priority and frequency
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Dynamic blog posts with enhanced metadata
  let blogPosts: any[] = [];
  
  try {
    const posts = await getAllContent();
    
    // Blog post URLs only - no category URLs
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

  } catch (error) {
    console.error('Error fetching posts for sitemap:', error);
  }

  // Return only static pages and blog posts - no category filter URLs
  return [...staticPages, ...blogPosts];
}