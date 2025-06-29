'use client'; // This directive is necessary for client-side components in Next.js

import { ExternalLink, Star, Zap, Brain } from 'lucide-react'; // Assuming you have lucide-react installed
import { Card, CardContent } from '@/components/ui/card';     // Path to your ShadCN Card component
import { Button } from '@/components/ui/button';             // Path to your ShadCN Button component

export function SponsorSection() {
  const ads = [
    {
      id: 1,
      title: "AI & Machine Learning Mastery",
      description: "Master cutting-edge AI technologies with our comprehensive course. From neural networks to LLMs.",
      image: "https://www.investopedia.com/thmb/lVM0xLRchf-SU6kjEPV_EucULX0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-652553849-8c6576b265644ebdb68e47064d4fb276.jpg",
      cta: "Start Learning",
      badge: "Featured",
      link: "#"
    },
    {
      id: 2,
      title: "Premium Developer Tools",
      description: "Boost your productivity with AI-powered coding assistants and advanced development environments.",
      image: "https://images.pexels.com/photos/32438148/pexels-photo-32438148.jpeg",
      cta: "Try Free",
      badge: "New",
      link: "#"
    },
    // You can add more ads here to see how the grid adjusts:
    // {
    //   id: 3,
    //   title: "Cloud Computing Fundamentals",
    //   description: "Learn the essentials of AWS, Azure, and Google Cloud for modern infrastructure.",
    //   image: "https://images.unsplash.com/photo-1582234032333-e91b0f19c118?w=300&h=200&fit=crop",
    //   cta: "Explore Courses",
    //   badge: "Trending",
    //   link: "#"
    // },
    // {
    //   id: 4,
    //   title: "Cybersecurity Essentials",
    //   description: "Protect your digital assets with our cybersecurity principles and practices course.",
    //   image: "https://images.unsplash.com/photo-1549448092-231bb18b622c?w=300&h=200&fit=crop",
    //   cta: "Secure Your Future",
    //   badge: "Hot",
    //   link: "#"
    // }
  ];

  return (
    <div className="w-full"> {/* Ensures the section takes full width of its parent */}
      <div className="text-center mb-6 sm:mb-8"> {/* Margin bottom for spacing below the heading */}
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Sponsored</h3>
        <div className="w-8 sm:w-12 h-0.5 bg-primary mx-auto"></div> {/* Decorative line */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {ads.map((ad) => (
          <Card
            key={ad.id}
            className="overflow-hidden transition-shadow duration-300 border-border/50 hover:shadow-lg"
          >
            <div className="relative">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-24 sm:h-32 object-cover" // Responsive image height
              />
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                  {ad.badge === "Featured" && <Star size={10} />}
                  {ad.badge === "New" && <Zap size={10} />}
                  {ad.badge === "Popular" && <Brain size={10} />} {/* Example for a 'Popular' badge */}
                  {ad.badge}
                </span>
              </div>
            </div>
            <CardContent className="p-3 sm:p-4"> {/* Responsive padding */}
              <h4 className="font-semibold text-foreground mb-2 line-clamp-2 text-sm sm:text-base">
                {ad.title}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-3">
                {ad.description}
              </p>
              <Button
                size="sm"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm"
                asChild
              >
                <a href={ad.link} target="_blank" rel="noopener noreferrer">
                  {ad.cta}
                  <ExternalLink size={12} className="ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* The "Advertise Here" card, designed to center its content within its grid cell */}
        <Card className="bg-muted/30 border-dashed border-2 border-muted-foreground/20 flex items-center justify-center text-center">
          <CardContent className="p-4 sm:p-6"> {/* Apply padding directly to CardContent for this specific card */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain size={18} className="text-muted-foreground" />
            </div>
            <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">Advertise Here</h4>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">
              Reach our engaged community of AI enthusiasts and tech professionals.
            </p>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              Contact Us
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}