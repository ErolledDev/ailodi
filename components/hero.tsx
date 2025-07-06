import { Zap, Brain, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="medium-hero" role="banner" aria-labelledby="hero-title">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Brain size={20} className="text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-primary">AI Innovation Hub</span>
            </div>
          </div>
          
          <h1 id="hero-title" className="medium-hero-title">
            Your Global Tech Insights
          </h1>
          
          <p className="medium-hero-subtitle">
            Discover cutting-edge AI breakthroughs, programming trends, and future science. 
            Stay ahead with in-depth analysis and insights that matter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center" role="group" aria-label="Main actions">
            <Button size="lg" asChild className="medium-btn medium-btn-primary">
              <Link href="#featured" aria-describedby="explore-description">
                <Zap size={18} className="mr-2" aria-hidden="true" />
                Explore Latest Insights
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="medium-btn medium-btn-secondary">
              <Link href="/categories" aria-describedby="browse-description">
                <Code size={18} className="mr-2" aria-hidden="true" />
                Browse Categories
              </Link>
            </Button>
          </div>
          
          <div id="explore-description" className="sr-only">
            Explore our latest articles on AI and technology trends
          </div>
          <div id="browse-description" className="sr-only">
            Browse articles organized by technology categories
          </div>
          
          <div className="mt-8 flex justify-center items-center gap-8 text-sm text-muted-foreground" role="list" aria-label="Featured topics">
            <div className="flex items-center gap-2" role="listitem">
              <div className="w-2 h-2 bg-primary rounded-full" aria-hidden="true"></div>
              <span>AI & Machine Learning</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <div className="w-2 h-2 bg-primary rounded-full" aria-hidden="true"></div>
              <span>Programming & Development</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <div className="w-2 h-2 bg-primary rounded-full" aria-hidden="true"></div>
              <span>Future Science</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}