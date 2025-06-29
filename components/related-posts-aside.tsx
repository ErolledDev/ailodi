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
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <TrendingUp size={18} className="text-primary" />
            Related Articles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse border-b border-border/50 last:border-b-0 pb-4 mb-4 last:pb-0 last:mb-0">
              <div className="h-12 sm:h-16 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded w-3/4 mb-1"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
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
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <TrendingUp size={18} className="text-primary" />
          Related Articles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-0">
        {posts.map((post, index) => (
          <Link 
            key={post.id} 
            href={`/post/${post.slug}`}
            className="block group p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200"
          >
            <article className="flex gap-3 border-b border-border/50 last:border-b-0 pb-3 sm:pb-4 mb-3 sm:mb-4 last:pb-0 last:mb-0">
              {post.featuredImageUrl && (
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={post.featuredImageUrl}
                    alt={post.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground text-sm sm:text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors mb-2">
                  {post.title}
                </h4>
                <div className="flex items-center gap-1 sm:gap-2 text-xs text-muted-foreground mb-2">
                  <span>{format(new Date(post.publishDate), 'MMM d')}</span>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Clock size={10} className="sm:w-3 sm:h-3" />
                    <span>{Math.ceil(post.content.split(' ').length / 200)} min</span>
                  </div>
                </div>
                {post.categories.length > 0 && (
                  <div>
                    <span className="inline-block px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full text-sm bg-primary/10 text-primary">
                      {post.categories[0]}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-shrink-0 ml-auto self-center">
                <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </article>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}