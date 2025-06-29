'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UserPlus, UserCheck, Twitter, Linkedin, Globe, Mail } from 'lucide-react';

interface AuthorCardProps {
  author: string;
  bio?: string;
  avatar?: string;
  isFollowing?: boolean;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
    email?: string;
  };
}

export function AuthorCard({ 
  author, 
  bio = "Tech writer and AI enthusiast. Passionate about sharing insights on cutting-edge technology, artificial intelligence, and the future of innovation.",
  avatar,
  isFollowing: initialFollowing = false,
  socialLinks = {
    twitter: "https://twitter.com/ailodi_tech",
    linkedin: "https://linkedin.com/company/ailodi",
    website: "https://ailodi.tech"
  }
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
    <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl p-4 sm:p-6 lg:p-8 border border-border/50 hover-lift">
      {/* Mobile Layout (< sm) */}
      <div className="block sm:hidden">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
              {avatar ? (
                <Image
                  src={getAvatarUrl()}
                  alt={`${author}'s avatar`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-xl font-semibold text-primary">
                  {getInitials()}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background"></div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-foreground leading-tight">
              {author}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {bio}
            </p>
            
            {/* Social Links */}
            {(socialLinks.twitter || socialLinks.linkedin || socialLinks.website || socialLinks.email) && (
              <div className="flex items-center justify-center gap-3">
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-blue-50"
                    aria-label="Twitter profile"
                  >
                    <Twitter size={18} />
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {socialLinks.website && (
                  <a
                    href={socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                    aria-label="Website"
                  >
                    <Globe size={18} />
                  </a>
                )}
                {socialLinks.email && (
                  <a
                    href={`mailto:${socialLinks.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                    aria-label="Email"
                  >
                    <Mail size={18} />
                  </a>
                )}
              </div>
            )}
            
            <Button
              onClick={handleFollow}
              variant={isFollowing ? "secondary" : "default"}
              size="sm"
              className="w-full transition-all duration-200"
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

      {/* Tablet and Desktop Layout (>= sm) */}
      <div className="hidden sm:block">
        <div className="flex items-start gap-4 lg:gap-6">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
              {avatar ? (
                <Image
                  src={getAvatarUrl()}
                  alt={`${author}'s avatar`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-lg lg:text-xl font-semibold text-primary">
                  {getInitials()}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full border-2 border-background"></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2 leading-tight">
                  {author}
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground mb-4 leading-relaxed">
                  {bio}
                </p>
                
                {/* Social Links */}
                {(socialLinks.twitter || socialLinks.linkedin || socialLinks.website || socialLinks.email) && (
                  <div className="flex items-center gap-2 lg:gap-3">
                    {socialLinks.twitter && (
                      <a
                        href={socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-blue-50"
                        aria-label="Twitter profile"
                      >
                        <Twitter size={18} />
                      </a>
                    )}
                    {socialLinks.linkedin && (
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50"
                        aria-label="LinkedIn profile"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                    {socialLinks.website && (
                      <a
                        href={socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                        aria-label="Website"
                      >
                        <Globe size={18} />
                      </a>
                    )}
                    {socialLinks.email && (
                      <a
                        href={`mailto:${socialLinks.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                        aria-label="Email"
                      >
                        <Mail size={18} />
                      </a>
                    )}
                  </div>
                )}
              </div>
              
              <Button
                onClick={handleFollow}
                variant={isFollowing ? "secondary" : "default"}
                size="sm"
                className="shrink-0 transition-all duration-200 lg:mt-0"
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
    </div>
  );
}