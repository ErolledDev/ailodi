import { BlogPosts } from '@/components/blog-posts';
import { Hero } from '@/components/hero';
import { FeaturedPosts } from '@/components/featured-posts';

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <FeaturedPosts />
      <BlogPosts />
    </div>
  );
}