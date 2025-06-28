'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { CalendarDays, Clock, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/types/blog';

export function FeaturedPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://blogform.netlify.app/api/content.json');
        const data = await response.json();
        const publishedPosts = data
          .filter((post: BlogPost) => post.status === 'published')
          .sort((a: BlogPost, b: BlogPost) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
          .slice(0, 3);
        setPosts(publishedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section id="featured" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Featured Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular and recent articles covering various topics 
              in technology and web development.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
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
    <section id="featured" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Featured Articles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our most popular and recent articles covering various topics 
            in technology and web development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article 
              key={post.id} 
              className="wp-card hover-lift slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
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
      </div>
    </section>
  );
}