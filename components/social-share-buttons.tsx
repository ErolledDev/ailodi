'use client';

import { Twitter, Facebook, Linkedin, Share2 } from 'lucide-react';
import type { BlogPost } from '@/types/blog';

interface SocialShareButtonsProps {
  post: BlogPost;
  url: string;
}

export function SocialShareButtons({ post, url }: SocialShareButtonsProps) {
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  return (
    <div className="flex items-center gap-2 mt-8">
      <span className="text-sm text-muted-foreground mr-2">Share:</span>
      <button onClick={shareOnTwitter} className="social-share-btn">
        <Twitter size={16} />
        Twitter
      </button>
      <button onClick={shareOnFacebook} className="social-share-btn">
        <Facebook size={16} />
        Facebook
      </button>
      <button onClick={shareOnLinkedIn} className="social-share-btn">
        <Linkedin size={16} />
        LinkedIn
      </button>
      <button onClick={copyToClipboard} className="social-share-btn">
        <Share2 size={16} />
        Copy Link
      </button>
    </div>
  );
}