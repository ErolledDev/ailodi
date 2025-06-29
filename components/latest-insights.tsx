'use client';

import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { EnhancedBlogCard } from '@/components/enhanced-blog-card';
import type { BlogPost } from '@/types/blog';

export function LatestInsights() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestPosts() {
      try {
        const response = await fetch('https://blogform.netlify.app/api/content.json');
        const data = await response.json();
        const publishedPosts = data
          .filter((post: BlogPost) => post.status === 'published')
          .sort((a: BlogPost, b: BlogPost) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
          .slice(0, 3); // Get only the latest 3 posts
        
        setPosts(publishedPosts);
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Zap size={20} className="text-primary" />
                <span className="text-sm font-medium text-primary">Latest Insights</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Fresh Tech Insights</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with our latest articles on AI breakthroughs, programming trends, and future science.
            </p>
          </div>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
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

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Zap size={20} className="text-primary" />
              <span className="text-sm font-medium text-primary">Latest Insights</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Fresh Tech Insights</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest articles on AI breakthroughs, programming trends, and future science.
          </p>
        </div>
        
        <div className="space-y-8">
          {posts.map((post, index) => (
            <EnhancedBlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}