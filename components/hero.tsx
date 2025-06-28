import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to Our 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500">
              {' '}Professional Blog
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Discover insights, tutorials, and stories about web development, technology, 
            and digital innovation. Join our community of developers and creators.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="#featured">
                Explore Articles
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-green-600 text-green-600 hover:bg-green-50">
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}