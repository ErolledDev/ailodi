import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="medium-hero">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="medium-hero-title fade-in">
            Human stories & ideas
          </h1>
          
          <p className="medium-hero-subtitle fade-in">
            A place to read, write, and deepen your understanding
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in">
            <Button size="lg" asChild className="medium-btn medium-btn-primary">
              <Link href="#featured">
                Start reading
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}