import { BlogPosts } from '@/components/blog-posts';
import { Hero } from '@/components/hero';
import { LatestInsights } from '@/components/latest-insights';
import { getAllContent } from '@/lib/content';
import type { BlogPost } from '@/types/blog';

export default async function Home() {
  // Fetch all content at build time for optimal performance
  const allPosts = await getAllContent();
  
  // Prepare data for components
  const latestPosts = allPosts.slice(0, 3);
  const allPostsForBlogSection = allPosts.slice(0, 5); // Initial posts for blog section

  return (
    <div className="space-y-16">
      <Hero />
      <LatestInsights posts={latestPosts} />
      <BlogPosts initialPosts={allPostsForBlogSection} allPosts={allPosts} />
    </div>
  );
}