import { BlogPosts } from '@/components/blog-posts';
import { Hero } from '@/components/hero';
import { LatestInsights } from '@/components/latest-insights';

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <LatestInsights />
      <BlogPosts />
    </div>
  );
}