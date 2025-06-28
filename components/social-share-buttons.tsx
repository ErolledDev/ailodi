'use client';

import { Twitter, Facebook, Linkedin, Share2, Copy, Check } from 'lucide-react';
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
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
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
    <div className="flex flex-col gap-4 mt-8 p-6 bg-muted/30 rounded-lg border border-border/50">
      <h3 className="text-lg font-semibold text-foreground">Share this article</h3>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted-foreground">Share on:</span>
        <button 
          onClick={shareOnTwitter} 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm bg-blue-500 hover:bg-blue-600 text-white"
          aria-label="Share on Twitter"
        >
          <Twitter size={16} />
          Twitter
        </button>
        <button 
          onClick={shareOnFacebook} 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm bg-blue-600 hover:bg-blue-700 text-white"
          aria-label="Share on Facebook"
        >
          <Facebook size={16} />
          Facebook
        </button>
        <button 
          onClick={shareOnLinkedIn} 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm bg-blue-700 hover:bg-blue-800 text-white"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={16} />
          LinkedIn
        </button>
        <button 
          onClick={copyToClipboard} 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm bg-muted hover:bg-muted/80 text-foreground border border-border"
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
              Copy Link
            </>
          )}
        </button>
      </div>
    </div>
  );
}