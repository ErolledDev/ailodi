'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Clock, BookmarkPlus, Bookmark, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { BlogPost } from '@/types/blog';

interface EnhancedBlogCardProps {
  post: BlogPost;
  index?: number;
}

export function EnhancedBlogCard({ post, index = 0 }: EnhancedBlogCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const readingTime = Math.ceil(post.content.split(' ').length / 200);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.metaDescription,
        url: `/post/${post.slug}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/post/${post.slug}`);
    }
  };

  const getAuthorInitials = () => {
    return post.author
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <article 
      className="group relative bg-card border border-border/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1"
      role="article"
      aria-labelledby={`post-title-${post.id}`}
    >
      <Link href={`/post/${post.slug}`} className="block">
        <div className="space-y-4">
          {/* Author and Meta Info */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
              {getAuthorInitials()}
            </div>
            <span className="font-medium text-foreground">{post.author}</span>
            <span>·</span>
            <time dateTime={post.publishDate}>
              {format(new Date(post.publishDate), 'MMM d')}
            </time>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{readingTime} min read</span>
            </div>
          </div>
          
          <div className="flex items-start gap-6">
            <div className="flex-1 space-y-3">
              <h2 
                id={`post-title-${post.id}`}
                className="text-xl md:text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2"
              >
                {post.title}
              </h2>
              
              <p className="text-muted-foreground leading-relaxed line-clamp-3 text-base">
                {post.metaDescription}
              </p>
              
              <div className="flex items-center gap-2">
                {post.categories.slice(0, 2).map((category) => (
                  <span 
                    key={category} 
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {category}
                  </span>
                ))}
                {post.categories.length > 2 && (
                  <span className="text-xs text-muted-foreground">
                    +{post.categories.length - 2} more
                  </span>
                )}
              </div>
            </div>
            
            {post.featuredImageUrl && (
              <div className="w-32 h-32 md:w-40 md:h-32 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={post.featuredImageUrl}
                  alt={post.title}
                  width={160}
                  height={128}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`text-muted-foreground hover:text-red-500 transition-colors ${isLiked ? 'text-red-500' : ''}`}
            aria-label={isLiked ? 'Unlike post' : 'Like post'}
          >
            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`text-muted-foreground hover:text-primary transition-colors ${isBookmarked ? 'text-primary' : ''}`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            {isBookmarked ? <Bookmark size={16} className="fill-current" /> : <BookmarkPlus size={16} />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Share post"
          >
            <Share2 size={16} />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="More options"
            >
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save for later</DropdownMenuItem>
            <DropdownMenuItem>Hide this post</DropdownMenuItem>
            <DropdownMenuItem>Report post</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </article>
  );
}