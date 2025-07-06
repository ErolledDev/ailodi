import { getAllContent } from '@/lib/content';
import type { Metadata } from 'next';
import type { BlogPost } from '@/types/blog';

export async function generateMetadata({ 
  searchParams 
}: { 
  searchParams: Record<string, string | string[] | undefined> 
}): Promise<Metadata> {
  // Safely extract filter parameter as a string
  const filterValue = Array.isArray(searchParams.filter) 
    ? searchParams.filter[0] 
    : searchParams.filter;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.xyz';

  if (filterValue) {
    try {
      const allPosts = await getAllContent();
      const categoryPosts = allPosts.filter(post => post.categories.includes(filterValue));
      const postCount = categoryPosts.length;

      return {
        title: `${filterValue} Articles | AI Lodi - Tech Insights & AI Innovation`,
        description: `Explore ${postCount} ${postCount === 1 ? 'article' : 'articles'} about ${filterValue} on AI Lodi. Discover cutting-edge insights, tutorials, and analysis in ${filterValue} and related technology topics.`,
        keywords: [
          filterValue.toLowerCase(),
          `${filterValue} articles`,
          `${filterValue} insights`,
          `${filterValue} technology`,
          'AI Lodi',
          'tech blog',
          'programming',
          'artificial intelligence',
          'technology trends'
        ],
        openGraph: {
          title: `${filterValue} Articles | AI Lodi`,
          description: `Explore ${postCount} ${postCount === 1 ? 'article' : 'articles'} about ${filterValue} on AI Lodi. Discover cutting-edge insights and analysis.`,
          type: 'website',
          url: `${baseUrl}/categories?filter=${encodeURIComponent(filterValue)}`,
        },
        twitter: {
          card: 'summary_large_image',
          title: `${filterValue} Articles | AI Lodi`,
          description: `Explore ${postCount} ${postCount === 1 ? 'article' : 'articles'} about ${filterValue} on AI Lodi.`,
        },
        alternates: {
          canonical: `${baseUrl}/categories?filter=${encodeURIComponent(filterValue)}`,
        },
      };
    } catch (error) {
      console.error('Error generating category metadata:', error);
      return {
        title: `${filterValue} Articles | AI Lodi - Tech Insights & AI Innovation`,
        description: `Explore articles about ${filterValue} on AI Lodi. Discover cutting-edge insights, tutorials, and analysis in ${filterValue} and related technology topics.`,
        alternates: {
          canonical: `${baseUrl}/categories?filter=${encodeURIComponent(filterValue)}`,
        },
      };
    }
  } else {
    return {
      title: 'All Categories | AI Lodi - Tech Insights & AI Innovation',
      description: 'Browse all categories on AI Lodi to discover articles organized by topics and areas of interest in AI, programming, automation, and future science.',
      keywords: [
        'categories',
        'tech topics',
        'AI categories',
        'programming topics',
        'technology categories',
        'AI Lodi',
        'tech blog',
        'artificial intelligence',
        'future science',
        'automation'
      ],
      openGraph: {
        title: 'All Categories | AI Lodi',
        description: 'Browse all categories to discover articles organized by topics and areas of interest in technology.',
        type: 'website',
        url: `${baseUrl}/categories`,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'All Categories | AI Lodi',
        description: 'Browse all categories to discover articles organized by topics and areas of interest in technology.',
      },
      alternates: {
        canonical: `${baseUrl}/categories`,
      },
    };
  }
}

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}