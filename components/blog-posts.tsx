'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { CalendarDays, Clock, ArrowRight, Search, Filter, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              All Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse through our collection of articles and find content that interests you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="wp-card animate-pulse">
                <div className="wp-card-image bg-gray-200" />
                <div className="wp-card-content">
                  <div className="h-4 bg-gray-200 rounded mb-4" />
                  <div className="h-6 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            All Articles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Browse through our collection of articles and find content that interests you.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-6 mb-16 max-w-3xl mx-auto fade-in">
          <div className="wp-search flex-1">
            <Search size={18} className="wp-search-icon" />
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-gray-200 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-64 border-gray-200 focus:ring-blue-500 focus:border-blue-500">
              <Filter size={18} className="mr-2" />
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
          <div className="text-center py-16 fade-in">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 text-lg">
              Try adjusting your search terms or browse all categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article 
                key={post.id} 
                className="wp-card hover-lift slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {post.featuredImageUrl && (
                  <div className="wp-card-image">
                    <Image
                      src={post.featuredImageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                
                <div className="wp-card-content">
                  <div className="wp-card-meta">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDays size={14} />
                      <span>{format(new Date(post.publishDate), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.slice(0, 2).map((category) => (
                      <span key={category} className="wp-category">
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="wp-card-title hover:text-blue-600 transition-colors">
                    <Link href={`/post/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="wp-card-excerpt">
                    {post.metaDescription}
                  </p>
                  
                  <div className="wp-card-footer">
                    <Button asChild variant="ghost" className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800">
                      <Link href={`/post/${post.slug}`} className="flex items-center gap-2">
                        Read More
                        <ArrowRight size={16} />
                      </Link>
                    </Button>
                    
                    <div className="flex gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="wp-tag text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}