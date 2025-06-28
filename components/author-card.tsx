'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UserPlus, UserCheck, Twitter, Linkedin, Globe } from 'lucide-react';

interface AuthorCardProps {
  author: string;
  bio?: string;
  avatar?: string;
  isFollowing?: boolean;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export function AuthorCard({ 
  author, 
  bio = "Writer and technology enthusiast. Passionate about sharing knowledge and insights that help developers and creators build better digital experiences.",
  avatar,
  isFollowing: initialFollowing = false,
  socialLinks = {}
}: AuthorCardProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // Here you would typically send to your backend
  };

  // Generate a consistent avatar URL based on the author name
  const getAvatarUrl = () => {
    if (avatar) return avatar;
    // Use a service like DiceBear or UI Avatars for consistent avatars
    const seed = encodeURIComponent(author);
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=3b82f6&radius=50`;
  };

  const getInitials = () => {
    return author
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl p-6 border border-border/50">
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
            {avatar ? (
              <Image
                src={getAvatarUrl()}
                alt={`${author}'s avatar`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-lg font-semibold text-primary">
                {getInitials()}
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background"></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-1 leading-tight">
                {author}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {bio}
              </p>
              
              {/* Social Links */}
              {(socialLinks.twitter || socialLinks.linkedin || socialLinks.website) && (
                <div className="flex items-center gap-2 mb-4">
                  {socialLinks.twitter && (
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-blue-500 transition-colors"
                      aria-label="Twitter profile"
                    >
                      <Twitter size={16} />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-blue-600 transition-colors"
                      aria-label="LinkedIn profile"
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                  {socialLinks.website && (
                    <a
                      href={socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Website"
                    >
                      <Globe size={16} />
                    </a>
                  )}
                </div>
              )}
            </div>
            
            <Button
              onClick={handleFollow}
              variant={isFollowing ? "secondary" : "default"}
              size="sm"
              className="shrink-0 transition-all duration-200"
            >
              {isFollowing ? (
                <>
                  <UserCheck size={16} className="mr-2" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus size={16} className="mr-2" />
                  Follow
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}