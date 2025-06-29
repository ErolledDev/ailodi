import type { BlogPost } from '@/types/blog';

const API_URL = 'https://blogform.netlify.app/api/content.json';

async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      console.warn(`Fetch attempt ${i + 1} failed:`, error);
      
      if (i === retries - 1) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
  
  throw new Error('All fetch attempts failed');
}

export async function getAllContent(): Promise<BlogPost[]> {
  try {
    const response = await fetchWithRetry(API_URL, {
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': 'application/json',
      },
    });
    
    const data = await response.json();
    const publishedPosts = data.filter((post: BlogPost) => post.status === 'published');
    
    return publishedPosts;
  } catch (error) {
    console.error('Error fetching content:', error);
    return [];
  }
}

export async function getContentBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetchWithRetry(API_URL, {
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': 'application/json',
      },
    });
    
    const data = await response.json();
    const publishedPosts = data.filter((post: BlogPost) => post.status === 'published');
    const post = publishedPosts.find((p: BlogPost) => p.slug === slug);
    
    return post || null;
  } catch (error) {
    console.error('Error fetching content by slug:', error);
    return null;
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const posts = await getAllContent();
    return posts.filter(post => post.categories.includes(category));
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  try {
    const posts = await getAllContent();
    const lowercaseQuery = query.toLowerCase();
    
    return posts.filter(post =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.metaDescription.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      post.categories.some(category => category.toLowerCase().includes(lowercaseQuery))
    );
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
}