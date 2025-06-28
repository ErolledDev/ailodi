'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Clock, TrendingUp } from 'lucide-react';
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

        // Sort by publish date and take first 8 (increased from 5)
        const sortedPosts = filteredPosts
          .sort((a: BlogPost, b: BlogPost) => 
            new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
          )
          .slice(0, 8);

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
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={18} />
            Related Articles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-muted rounded mb-2"></div>
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp size={18} className="text-primary" />
          Related Articles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.map((post, index) => (
          <Link 
            key={post.id} 
            href={`/post/${post.slug}`}
            className="block group"
          >
            <article className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
              {post.featuredImageUrl && (
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={post.featuredImageUrl}
                    alt={post.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span>{format(new Date(post.publishDate), 'MMM d')}</span>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Clock size={10} />
                    <span>{Math.ceil(post.content.split(' ').length / 200)} min</span>
                  </div>
                </div>
                {post.categories.length > 0 && (
                  <div className="mt-1">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                      {post.categories[0]}
                    </span>
                  </div>
                )}
              </div>
            </article>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}