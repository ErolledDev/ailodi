'use client';

import { useEffect, useState } from 'react';
import { RefreshCw, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EnhancedBlogCard } from '@/components/enhanced-blog-card';
import type { BlogPost } from '@/types/blog';

const INITIAL_DISPLAY_COUNT = 5;
const POSTS_PER_LOAD = 5;

export function BlogPosts() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredAllPosts, setFilteredAllPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://blogform.netlify.app/api/content.json');
        const data = await response.json();
        const publishedPosts = data
          .filter((post: BlogPost) => post.status === 'published')
          .sort((a: BlogPost, b: BlogPost) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
        
        setAllPosts(publishedPosts);
        setFilteredAllPosts(publishedPosts);
        setDisplayedPosts(publishedPosts.slice(0, INITIAL_DISPLAY_COUNT));
        
        // Extract unique categories
        const allCategories: string[] = publishedPosts.flatMap((post: BlogPost) => post.categories);
        const uniqueCategories: string[] = Array.from(new Set(allCategories));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = allPosts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post =>
        post.categories.includes(selectedCategory)
      );
    }

    setFilteredAllPosts(filtered);
    setDisplayedPosts(filtered.slice(0, INITIAL_DISPLAY_COUNT));
  }, [allPosts, selectedCategory]);

  const loadMore = async () => {
    setLoadingMore(true);
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const currentCount = displayedPosts.length;
    const nextPosts = filteredAllPosts.slice(currentCount, currentCount + POSTS_PER_LOAD);
    setDisplayedPosts(prev => [...prev, ...nextPosts]);
    setLoadingMore(false);
  };

  const hasMorePosts = displayedPosts.length < filteredAllPosts.length;

  if (loading) {
    return (
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">All Articles</h2>
            <p className="text-lg text-muted-foreground">
              Explore our complete collection of tech insights and analysis.
            </p>
          </div>
          <div className="space-y-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-card border border-border/50 rounded-xl p-6 animate-pulse">
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded mb-4 w-1/4" />
                  <div className="h-8 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">All Articles</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our complete collection of tech insights and analysis. 
            {selectedCategory !== 'all' && ` Filtered by ${selectedCategory}.`}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
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

        {displayedPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No articles found matching your criteria.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-8">
              {displayedPosts.map((post, index) => (
                <EnhancedBlogCard key={post.id} post={post} index={index} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMorePosts && (
              <div className="text-center mt-12">
                <Button
                  onClick={loadMore}
                  disabled={loadingMore}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
                >
                  {loadingMore ? (
                    <>
                      <RefreshCw size={18} className="mr-2 animate-spin" />
                      Loading More...
                    </>
                  ) : (
                    <>
                      Load More Articles
                      <span className="ml-2 text-sm opacity-80">
                        ({filteredAllPosts.length - displayedPosts.length} remaining)
                      </span>
                    </>
                  )}
                </Button>
                
                <p className="text-sm text-muted-foreground mt-4">
                  Showing {displayedPosts.length} of {filteredAllPosts.length} articles
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}