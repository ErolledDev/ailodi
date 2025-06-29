'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EnhancedBlogCard } from '@/components/enhanced-blog-card';
import { searchPosts, getAllContent } from '@/lib/content';
import type { BlogPost } from '@/types/blog';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        setLoading(true);
        
        if (query) {
          // Search for posts matching the query
          const searchResults = await searchPosts(query);
          setPosts(searchResults);
          setFilteredPosts(searchResults);
        } else {
          // If no query, show all posts
          const allPosts = await getAllContent();
          setPosts(allPosts);
          setFilteredPosts(allPosts);
        }
        
        // Extract unique categories
        const allPosts = await getAllContent();
        const allCategories: string[] = allPosts.flatMap((post: BlogPost) => post.categories);
        const uniqueCategories: string[] = Array.from(new Set(allCategories));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [query]);

  useEffect(() => {
    let filtered = posts;

    // Filter by search term
    if (searchTerm && searchTerm !== query) {
      filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.metaDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post =>
        post.categories.includes(selectedCategory)
      );
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory, query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm.trim())}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-background">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          {query ? `Search Results for "${query}"` : 'Search AI Lodi'}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {query 
            ? `Found ${filteredPosts.length} ${filteredPosts.length === 1 ? 'article' : 'articles'} matching your search`
            : 'Discover insights on AI, programming, automation, and future science'
          }
        </p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearchSubmit} className="medium-search flex-1">
            <Search size={16} className="medium-search-icon" />
            <Input
              type="search"
              placeholder="Search AI insights, tutorials, and tech trends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-gray-200 focus:ring-gray-300 focus:border-gray-300"
            />
          </form>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48 border-gray-200 focus:ring-gray-300 focus:border-gray-300">
              <Filter size={16} className="mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card border border-border/50 rounded-xl p-6 animate-pulse">
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded mb-4 w-1/4" />
                  <div className="h-8 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {query ? 'No results found' : 'Start your search'}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              {query 
                ? `We couldn't find any articles matching "${query}". Try different keywords or browse our categories.`
                : 'Enter a search term above to find articles on AI, programming, and technology trends.'
              }
            </p>
            {query && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Try searching for:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['AI', 'Machine Learning', 'Programming', 'Automation', 'Quantum Computing'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setSearchTerm(suggestion);
                        window.location.href = `/search?q=${encodeURIComponent(suggestion)}`;
                      }}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Results summary */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground pb-4 border-b border-border/50">
              <Clock size={14} />
              <span>
                {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} 
                {query && ` for "${query}"`}
                {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              </span>
            </div>

            {/* Results list */}
            {filteredPosts.map((post, index) => (
              <EnhancedBlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}