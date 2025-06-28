'use client';

import { useState } from 'react';
import { BookmarkPlus, Bookmark, Share2, MoreHorizontal, Copy, Flag, ExternalLink, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SocialShareButtons } from '@/components/social-share-buttons';
import type { BlogPost } from '@/types/blog';

interface PostActionsProps {
  post: BlogPost;
  url: string;
}

export function PostActions({ post, url }: PostActionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

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

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const reportPost = () => {
    // Handle reporting functionality
    console.log('Post reported');
  };

  return (
    <div className="flex items-center gap-2">
      {/* Bookmark Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBookmark}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        {isBookmarked ? (
          <Bookmark size={20} className="fill-current" />
        ) : (
          <BookmarkPlus size={20} />
        )}
      </Button>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Share post"
          >
            <Share2 size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this article</DialogTitle>
            <DialogDescription>
              Share "{post.title}" with others
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <SocialShareButtons post={post} url={url} />
            <div className="flex items-center gap-2 pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={copyLink}
                className="flex-1"
              >
                <Copy size={16} className="mr-2" />
                Copy Link
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* More Options Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground transition-colors"
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
          <DropdownMenuItem onClick={copyLink} className="cursor-pointer">
            <Copy size={16} className="mr-2" />
            Copy link
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
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