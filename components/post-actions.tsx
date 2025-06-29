'use client';

import { useState } from 'react';
import { BookmarkPlus, Bookmark, MoreHorizontal, Flag, ExternalLink, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShareDialog } from '@/components/share-dialog';
import type { BlogPost } from '@/types/blog';

interface PostActionsProps {
  post: BlogPost;
  url: string;
}

export function PostActions({ post, url }: PostActionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Here you would typically save to localStorage or send to your backend
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (!isBookmarked) {
      bookmarks.push(post.id);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
      const filtered = bookmarks.filter((id: string) => id !== post.id);
      localStorage.setItem('bookmarks', JSON.stringify(filtered));
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Here you would typically send to your backend
  };

  const reportPost = () => {
    // Handle reporting functionality
    console.log('Post reported');
  };

  const openInNewTab = () => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex items-center gap-2">
      {/* Bookmark Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBookmark}
        className="text-muted-foreground"
        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        {isBookmarked ? (
          <Bookmark size={20} className="fill-current" />
        ) : (
          <BookmarkPlus size={20} />
        )}
      </Button>

      {/* Share Dialog - Using the new consistent component */}
      <ShareDialog post={post} url={url} />

      {/* More Options Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            aria-label="More options"
          >
            <MoreHorizontal size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleLike} className="cursor-pointer">
            <Heart size={16} className={`mr-2 ${isLiked ? 'fill-current text-red-500' : ''}`} />
            {isLiked ? 'Unlike' : 'Like'} this article
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openInNewTab} className="cursor-pointer">
            <ExternalLink size={16} className="mr-2" />
            Open in new tab
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={reportPost} className="cursor-pointer text-red-600">
            <Flag size={16} className="mr-2" />
            Report article
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}