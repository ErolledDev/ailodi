import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="wp-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 slide-up">
            <Sparkles size={16} />
            Welcome to our professional blog
          </div>
          
          <h1 className="wp-hero-title fade-in">
            Discover Stories That 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
              {' '}Inspire & Educate
            </span>
          </h1>
          
          <p className="wp-hero-subtitle fade-in">
            Dive into a world of insights, tutorials, and stories about web development, 
            technology, and digital innovation. Join our community of passionate creators 
            and lifelong learners.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in">
            <Button size="lg" asChild className="wp-btn wp-btn-primary">
              <Link href="#featured">
                Explore Articles
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="wp-btn wp-btn-secondary">
              <Link href="/about">
                Learn More About Us
              </Link>
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center fade-in">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">100+</div>
              <div className="text-gray-600">Articles Published</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">50K+</div>
              <div className="text-gray-600">Monthly Readers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">5+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}