'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Clock, TrendingUp, ArrowRight, Calendar, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BlogPost } from '@/types/blog';

interface RelatedPostsAsideProps {
  currentPostId?: string;
  categories?: string[];
}

export function RelatedPostsAside({ currentPostId, categories = [] }: RelatedPostsAsideProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelatedPosts() {
      try {
        const response = await fetch('https://blogform.netlify.app/api/content.json');
        const data = await response.json();
        
        let filteredPosts = data.filter((post: BlogPost) => 
          post.status === 'published' && post.id !== currentPostId
        );

        // If categories are provided, prioritize posts with matching categories
        if (categories.length > 0) {
          const relatedPosts = filteredPosts.filter((post: BlogPost) =>
            post.categories.some(category => categories.includes(category))
          );
          
          const otherPosts = filteredPosts.filter((post: BlogPost) =>
            !post.categories.some(category => categories.includes(category))
          );
          
          filteredPosts = [...relatedPosts, ...otherPosts];
        }

        // Sort by publish date and take first 6
        const sortedPosts = filteredPosts
          .sort((a: BlogPost, b: BlogPost) => 
            new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
          )
          .slice(0, 6);

        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching related posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRelatedPosts();
  }, [currentPostId, categories]);

  if (loading) {
    return (
      <Card className="shadow-lg border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-bold">
            <TrendingUp size={20} className="text-primary" />
            Related Articles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-lg border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
          <TrendingUp size={20} className="text-primary" />
          Related Articles
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          More insights you might find interesting
        </p>
      </CardHeader>
      <CardContent className="space-y-0">
        {posts.map((post, index) => (
          <Link 
            key={post.id} 
            href={`/post/${post.slug}`}
            className="block group"
          >
            <article className={`flex gap-4 p-4 rounded-lg transition-all duration-200 hover:bg-muted/50 ${
              index !== posts.length - 1 ? 'border-b border-border/30' : ''
            }`}>
              {/* Featured Image */}
              {post.featuredImageUrl && (
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={post.featuredImageUrl}
                    alt={post.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="flex-1 min-w-0 space-y-2">
                {/* Title */}
                <h4 className="font-semibold text-sm leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                
                {/* Meta Information */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar size={10} />
                    <span>{format(new Date(post.publishDate), 'MMM d')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={10} />
                    <span>{Math.ceil(post.content.split(' ').length / 200)} min</span>
                  </div>
                </div>
                
                {/* Category Badge */}
                {post.categories.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Tag size={10} className="text-primary" />
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      {post.categories[0]}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Arrow Icon */}
              <div className="flex-shrink-0 flex items-center">
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
              </div>
            </article>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}