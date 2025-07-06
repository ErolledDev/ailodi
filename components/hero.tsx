import { Zap, Brain, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="min-h-screen min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
              <Brain size={20} className="text-primary" />
              <span className="text-sm font-medium text-primary">AI Innovation Hub</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Your Global Tech
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover cutting-edge AI breakthroughs, programming trends, and future science. 
            Stay ahead with in-depth analysis and insights that matter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Link href="#latest-insights">
                <Zap size={20} className="mr-2" />
                Explore Latest Insights
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-2 border-primary/20 hover:border-primary/40 px-8 py-4 text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105">
              <Link href="/categories">
                <Code size={20} className="mr-2" />
                Browse Categories
              </Link>
            </Button>
          </div>
          
          <div className="pt-8 flex justify-center items-center gap-8 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>AI & Machine Learning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>Programming & Development</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>Future Science</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}