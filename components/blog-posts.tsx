'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { CalendarDays, Clock, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EnhancedBlogCard } from '@/components/enhanced-blog-card';
import type { BlogPost } from '@/types/blog';

export function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://blogform.netlify.app/api/content.json');
        const data = await response.json();
        const publishedPosts = data
          .filter((post: BlogPost) => post.status === 'published')
          .sort((a: BlogPost, b: BlogPost) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
        
        setPosts(publishedPosts);
        setFilteredPosts(publishedPosts);
        
        // Extract unique categories with proper typing
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
    let filtered = posts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
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
  }, [posts, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="medium-search flex-1">
            <Search size={16} className="medium-search-icon" />
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-gray-200 focus:ring-gray-300 focus:border-gray-300"
            />
          </div>
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

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No articles found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredPosts.map((post, index) => (
              <EnhancedBlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}