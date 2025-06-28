'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { CalendarDays, Clock } from 'lucide-react';
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
          .slice(0, 6);
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
      <section id="featured" className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="medium-card animate-pulse">
                <div className="medium-card-content">
                  <div className="h-4 bg-gray-200 rounded mb-4 w-1/4" />
                  <div className="h-8 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {posts.map((post, index) => (
            <article 
              key={post.id} 
              className="medium-card hover-lift slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={`/post/${post.slug}`} className="block">
                <div className="medium-card-content">
                  <div className="medium-card-meta">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{format(new Date(post.publishDate), 'MMM d')}</span>
                    <span>·</span>
                    <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
                  </div>
                  
                  <div className="flex items-start gap-8">
                    <div className="flex-1">
                      <h2 className="medium-card-title mb-2 hover:text-gray-700 transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="medium-card-excerpt mb-4">
                        {post.metaDescription}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        {post.categories.slice(0, 1).map((category) => (
                          <span key={category} className="medium-category">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {post.featuredImageUrl && (
                      <div className="w-32 h-32 flex-shrink-0">
                        <Image
                          src={post.featuredImageUrl}
                          alt={post.title}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}