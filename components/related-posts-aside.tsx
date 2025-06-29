'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Clock, TrendingUp, ArrowRight } from 'lucide-react';
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
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <TrendingUp size={18} className="text-primary" />
            Related Articles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-12 sm:h-16 bg-muted rounded mb-2"></div>
              <div className="h-3 sm:h-4 bg-muted rounded w-3/4 mb-1"></div>
              <div className="h-2 sm:h-3 bg-muted rounded w-1/2"></div>
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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <TrendingUp size={18} className="text-primary" />
          Related Articles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {posts.map((post, index) => (
          <Link 
            key={post.id} 
            href={`/post/${post.slug}`}
            className="block group"
          >
            <article className="flex gap-3 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
              {post.featuredImageUrl && (
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={post.featuredImageUrl}
                    alt={post.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover transition-transform duration-200"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-xs sm:text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors mb-1 sm:mb-2">
                  {post.title}
                </h4>
                <div className="flex items-center gap-x-0.5 sm:gap-x-1 text-xs text-muted-foreground mb-1 sm:mb-2">
                  <span>{format(new Date(post.publishDate), 'MMM d')}</span>
                  <span>·</span>
                  <div className="flex items-center gap-x-0.5">
                    <Clock size={8} className="sm:w-2.5 sm:h-2.5" />
                    <span>{Math.ceil(post.content.split(' ').length / 200)} min</span>
                  </div>
                </div>
                {post.categories.length > 0 && (
                  <div>
                    <span className="inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs bg-primary/10 text-primary">
                      {post.categories[0]}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-shrink-0">
                <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors mt-1" />
              </div>
            </article>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}