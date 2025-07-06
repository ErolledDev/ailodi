import { getAllContent } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  // Safely extract query parameter
  const queryParam = searchParams.q;
  const query = Array.isArray(queryParam) ? queryParam[0] : queryParam;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.xyz';

  if (query) {
    return {
      title: `Search Results for "${query}" | AI Lodi - Tech Insights & AI Innovation`,
      description: `Find articles and insights on AI, programming, automation, and future science matching your search for "${query}" on AI Lodi. Discover relevant tech content and tutorials.`,
      keywords: [
        query.toLowerCase(),
        `${query} search`,
        `${query} articles`,
        'AI Lodi search',
        'tech search',
        'AI articles',
        'programming search',
        'technology search',
        'search results'
      ],
      openGraph: {
        title: `Search Results for "${query}" | AI Lodi`,
        description: `Find articles and insights matching your search for "${query}" on AI Lodi.`,
        type: 'website',
        url: `${baseUrl}/search?q=${encodeURIComponent(query)}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: `Search Results for "${query}" | AI Lodi`,
        description: `Find articles and insights matching your search for "${query}" on AI Lodi.`,
      },
      alternates: {
        canonical: `${baseUrl}/search?q=${encodeURIComponent(query)}`,
      },
      robots: {
        index: false, // Don't index search result pages
        follow: true,
      },
    };
  } else {
    return {
      title: 'Search AI Lodi - Discover Tech Insights',
      description: 'Search AI Lodi for in-depth articles, tutorials, and news on artificial intelligence, programming, automation, and future science. Find exactly what you\'re looking for.',
      keywords: [
        'search',
        'AI Lodi search',
        'tech search',
        'find articles',
        'AI search',
        'programming search',
        'technology search',
        'discover content',
        'tech insights'
      ],
      openGraph: {
        title: 'Search AI Lodi - Discover Tech Insights',
        description: 'Search for in-depth articles, tutorials, and news on artificial intelligence, programming, and future science.',
        type: 'website',
        url: `${baseUrl}/search`,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Search AI Lodi - Discover Tech Insights',
        description: 'Search for in-depth articles, tutorials, and news on artificial intelligence, programming, and future science.',
      },
      alternates: {
        canonical: `${baseUrl}/search`,
      },
    };
  }
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}