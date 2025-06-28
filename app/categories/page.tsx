'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FolderOpen, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/types/blog';

interface CategoryData {
  name: string;
  count: number;
  posts: BlogPost[];
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('https://blogform.netlify.app/api/content.json');
        const data = await response.json();
        const publishedPosts = data.filter((post: BlogPost) => post.status === 'published');
        
        const categoryMap = new Map<string, BlogPost[]>();
        
        publishedPosts.forEach((post: BlogPost) => {
          post.categories.forEach(category => {
            if (!categoryMap.has(category)) {
              categoryMap.set(category, []);
            }
            categoryMap.get(category)!.push(post);
          });
        });
        
        const categoryData = Array.from(categoryMap.entries()).map(([name, posts]) => ({
          name,
          count: posts.length,
          posts: posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()),
        })).sort((a, b) => b.count - a.count);
        
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Categories</h1>
          <p className="text-lg text-muted-foreground">Explore articles by category</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-muted rounded mb-4" />
                <div className="h-4 bg-muted rounded w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Categories</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover articles organized by topics and areas of interest. 
          Click on any category to explore related content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.name} className="hover-lift cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FolderOpen size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <FileText size={14} />
                    <span className="text-sm">
                      {category.count} {category.count === 1 ? 'article' : 'articles'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                {category.posts.slice(0, 3).map((post) => (
                  <Link
                    key={post.id}
                    href={`/post/${post.slug}`}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-1"
                  >
                    {post.title}
                  </Link>
                ))}
                {category.count > 3 && (
                  <p className="text-xs text-muted-foreground">
                    +{category.count - 3} more articles
                  </p>
                )}
              </div>
              
              <Badge variant="secondary" className="mt-4">
                {category.count} posts
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}