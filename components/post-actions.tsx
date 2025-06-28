'use client';

import { useState } from 'react';
import { BookmarkPlus, Bookmark, Share2, MoreHorizontal, Copy, Flag, ExternalLink, Heart, Check } from 'lucide-react';
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
  const [copySuccess, setCopySuccess] = useState(false);

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
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
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
        <DialogContent className="sm:max-w-lg">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl font-semibold">Share this article</DialogTitle>
            <DialogDescription className="text-base">
              Share "{post.title}" with others
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Social Share Buttons */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">Share on social media</h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    const text = `${post.title} - ${post.metaDescription}`;
                    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                    window.open(twitterUrl, '_blank', 'width=600,height=400');
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                  </svg>
                  Twitter
                </button>
                
                <button
                  onClick={() => {
                    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    window.open(facebookUrl, '_blank', 'width=600,height=400');
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  Facebook
                </button>
                
                <button
                  onClick={() => {
                    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                    window.open(linkedinUrl, '_blank', 'width=600,height=400');
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </button>
                
                <button
                  onClick={copyLink}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  {copySuccess ? (
                    <>
                      <Check size={16} className="text-green-600" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Direct Copy Link */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Or copy link</h4>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <input
                  type="text"
                  value={url}
                  readOnly
                  className="flex-1 bg-transparent text-sm text-muted-foreground outline-none"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyLink}
                  className="shrink-0"
                >
                  {copySuccess ? (
                    <Check size={16} className="text-green-600" />
                  ) : (
                    <Copy size={16} />
                  )}
                </Button>
              </div>
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