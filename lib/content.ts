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

// Helper function to normalize text for better matching
function normalizeText(text: string): string {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
}

// Helper function to calculate similarity score between two strings
function calculateSimilarity(str1: string, str2: string): number {
  const words1 = normalizeText(str1).split(' ');
  const words2 = normalizeText(str2).split(' ');
  
  let matches = 0;
  for (const word1 of words1) {
    for (const word2 of words2) {
      if (word1.includes(word2) || word2.includes(word1)) {
        matches++;
        break;
      }
    }
  }
  
  return matches / Math.max(words1.length, words2.length);
}

// Enhanced search function with keyword matching and scoring
export async function searchPosts(query: string): Promise<BlogPost[]> {
  try {
    const posts = await getAllContent();
    
    if (!query.trim()) {
      return posts;
    }
    
    const normalizedQuery = normalizeText(query);
    const searchTerms = normalizedQuery.split(' ').filter(term => term.length > 0);
    
    // Score each post based on relevance
    const scoredPosts = posts.map(post => {
      let score = 0;
      const normalizedTitle = normalizeText(post.title);
      const normalizedDescription = normalizeText(post.metaDescription);
      const normalizedContent = normalizeText(post.content);
      const normalizedTags = post.tags.map(tag => normalizeText(tag));
      const normalizedCategories = post.categories.map(cat => normalizeText(cat));
      
      // Exact phrase matches (highest priority)
      if (normalizedTitle.includes(normalizedQuery)) score += 100;
      if (normalizedDescription.includes(normalizedQuery)) score += 80;
      if (normalizedContent.includes(normalizedQuery)) score += 40;
      
      // Individual keyword matches
      for (const term of searchTerms) {
        if (term.length < 2) continue; // Skip very short terms
        
        // Title matches (high priority)
        if (normalizedTitle.includes(term)) score += 20;
        
        // Description matches
        if (normalizedDescription.includes(term)) score += 15;
        
        // Tag exact matches
        if (normalizedTags.some(tag => tag === term)) score += 25;
        
        // Tag partial matches
        if (normalizedTags.some(tag => tag.includes(term))) score += 15;
        
        // Category exact matches
        if (normalizedCategories.some(cat => cat === term)) score += 25;
        
        // Category partial matches
        if (normalizedCategories.some(cat => cat.includes(term))) score += 15;
        
        // Content matches (lower priority)
        const contentMatches = (normalizedContent.match(new RegExp(term, 'g')) || []).length;
        score += Math.min(contentMatches * 2, 10); // Cap content score
      }
      
      // Fuzzy matching for title and description
      const titleSimilarity = calculateSimilarity(normalizedQuery, normalizedTitle);
      const descriptionSimilarity = calculateSimilarity(normalizedQuery, normalizedDescription);
      
      if (titleSimilarity > 0.3) score += titleSimilarity * 30;
      if (descriptionSimilarity > 0.3) score += descriptionSimilarity * 20;
      
      // Bonus for multiple term matches
      const matchingTerms = searchTerms.filter(term => 
        normalizedTitle.includes(term) || 
        normalizedDescription.includes(term) || 
        normalizedTags.some(tag => tag.includes(term)) ||
        normalizedCategories.some(cat => cat.includes(term))
      );
      
      if (matchingTerms.length > 1) {
        score += matchingTerms.length * 10;
      }
      
      return { post, score };
    });
    
    // Filter posts with score > 0 and sort by score (descending)
    const filteredPosts = scoredPosts
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ post }) => post);
    
    return filteredPosts;
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
}