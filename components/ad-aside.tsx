'use client';

import { ExternalLink, Star, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function AdAside() {
  const ads = [
    {
      id: 1,
      title: "Professional Web Development Course",
      description: "Master modern web development with our comprehensive course. Learn React, Next.js, and more.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
      cta: "Learn More",
      badge: "Featured",
      link: "#"
    },
    {
      id: 2,
      title: "Premium UI Components",
      description: "Beautiful, accessible React components for your next project. Save hours of development time.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
      cta: "Get Started",
      badge: "New",
      link: "#"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Sponsored</h3>
        <div className="w-12 h-0.5 bg-primary mx-auto"></div>
      </div>
      
      {ads.map((ad) => (
        <Card key={ad.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border/50">
          <div className="relative">
            <img
              src={ad.image}
              alt={ad.title}
              className="w-full h-32 object-cover"
            />
            <div className="absolute top-2 left-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                {ad.badge === "Featured" && <Star size={10} />}
                {ad.badge === "New" && <Zap size={10} />}
                {ad.badge}
              </span>
            </div>
          </div>
          <CardContent className="p-4">
            <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
              {ad.title}
            </h4>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
              {ad.description}
            </p>
            <Button 
              size="sm" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              asChild
            >
              <a href={ad.link} target="_blank" rel="noopener noreferrer">
                {ad.cta}
                <ExternalLink size={14} className="ml-2" />
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
      
      <Card className="bg-muted/30 border-dashed border-2 border-muted-foreground/20">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
            <ExternalLink size={20} className="text-muted-foreground" />
          </div>
          <h4 className="font-medium text-foreground mb-2">Advertise Here</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Reach our engaged audience of developers and tech enthusiasts.
          </p>
          <Button variant="outline" size="sm">
            Contact Us
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}