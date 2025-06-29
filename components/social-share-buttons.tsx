'use client';

import { Twitter, Facebook, Linkedin, Share2, Copy, Check, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import type { BlogPost } from '@/types/blog';

interface SocialShareButtonsProps {
  post: BlogPost;
  url: string;
}

export function SocialShareButtons({ post, url }: SocialShareButtonsProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const shareOnTwitter = () => {
    const text = `${post.title} - ${post.metaDescription}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=AI,Tech,Innovation`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const shareOnLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
  };

  const shareOnReddit = () => {
    const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(post.title)}`;
    window.open(redditUrl, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
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

  return (
    <div className="flex flex-col gap-4 sm:gap-6 mt-8 p-4 sm:p-6 bg-muted/30 rounded-xl border border-border/50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
          <Share2 size={16} className="text-primary" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-foreground">Share this article</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <button 
          onClick={shareOnTwitter} 
          className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 text-white"
          aria-label="Share on Twitter"
        >
          <Twitter size={16} />
          <span className="hidden sm:inline">Twitter</span>
        </button>
        
        <button 
          onClick={shareOnFacebook} 
          className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white"
          aria-label="Share on Facebook"
        >
          <Facebook size={16} />
          <span className="hidden sm:inline">Facebook</span>
        </button>
        
        <button 
          onClick={shareOnLinkedIn} 
          className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-xs sm:text-sm bg-blue-700 hover:bg-blue-800 text-white"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={16} />
          <span className="hidden sm:inline">LinkedIn</span>
        </button>
        
        <button 
          onClick={shareOnReddit} 
          className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-xs sm:text-sm bg-orange-500 hover:bg-orange-600 text-white"
          aria-label="Share on Reddit"
        >
          <MessageCircle size={16} />
          <span className="hidden sm:inline">Reddit</span>
        </button>
        
        <button 
          onClick={copyToClipboard} 
          className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-xs sm:text-sm bg-muted hover:bg-muted/80 text-foreground border border-border col-span-2 sm:col-span-1"
          aria-label="Copy link"
        >
          {copySuccess ? (
            <>
              <Check size={16} className="text-green-600" />
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        Help others discover this AI & tech insight by sharing it with your network
      </p>
    </div>
  );
}