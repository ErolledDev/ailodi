import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { CalendarDays, Clock } from 'lucide-react';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { SocialShareButtons } from '@/components/social-share-buttons';
import { PostActions } from '@/components/post-actions';
import { AuthorCard } from '@/components/author-card';
import { getContentBySlug, getAllContent } from '@/lib/content';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const posts = await getAllContent();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const post = await getContentBySlug(params.slug);
    
    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    return {
      title: post.seoTitle || post.title,
      description: post.metaDescription,
      keywords: post.keywords,
      authors: [{ name: post.author }],
      openGraph: {
        title: post.seoTitle || post.title,
        description: post.metaDescription,
        type: 'article',
        publishedTime: post.publishDate,
        modifiedTime: post.updatedAt,
        authors: [post.author],
        images: post.featuredImageUrl ? [post.featuredImageUrl] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.seoTitle || post.title,
        description: post.metaDescription,
        images: post.featuredImageUrl ? [post.featuredImageUrl] : undefined,
      },
    };
  } catch (error) {
    return {
      title: 'Post Not Found',
    };
  }
}

async function getRelatedPosts(currentPost: BlogPost): Promise<BlogPost[]> {
  try {
    const allPosts = await getAllContent();
    const relatedPosts = allPosts
      .filter(post => 
        post.id !== currentPost.id && 
        post.status === 'published' &&
        post.categories.some(category => currentPost.categories.includes(category))
      )
      .slice(0, 3);
    
    return relatedPosts;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="related-posts">
      <h3 className="text-2xl font-bold text-foreground mb-6">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/post/${post.slug}`} className="related-post-card">
            {post.featuredImageUrl && (
              <div className="mb-4">
                <Image
                  src={post.featuredImageUrl}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            )}
            <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
              {post.title}
            </h4>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {post.metaDescription}
            </p>
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <span>{format(new Date(post.publishDate), 'MMM d')}</span>
              <span>·</span>
              <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function PostPage({ params }: PostPageProps) {
  let post;
  
  try {
    post = await getContentBySlug(params.slug);
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }

  if (!post || post.status !== 'published') {
    notFound();
  }

  const publishDate = new Date(post.publishDate);
  const readingTime = Math.ceil(post.content.split(' ').length / 200);
  const relatedPosts = await getRelatedPosts(post);
  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/post/${post.slug}`;

  // Get author avatar based on name
  const getAuthorAvatar = (authorName: string) => {
    const seed = encodeURIComponent(authorName);
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=3b82f6&radius=50`;
  };

  const getAuthorInitials = () => {
    return post.author
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      <article className="max-w-3xl mx-auto px-4 py-16">
        <div className="fade-in">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              {post.title}
            </h1>
            
            {/* Meta Description */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 border-l-4 border-primary pl-4 bg-primary/5 py-3 rounded-r-lg">
              {post.metaDescription}
            </p>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-sm font-semibold text-primary">
                    {getAuthorInitials()}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-foreground">{post.author}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span>{format(publishDate, 'MMM d, yyyy')}</span>
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{readingTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <PostActions post={post} url={currentUrl} />
            </div>

            {/* Categories */}
            {post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.categories.map((category) => (
                  <span 
                    key={category} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground border border-border"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {post.featuredImageUrl && (
            <div className="mb-12">
              <Image
                src={post.featuredImageUrl}
                alt={post.title}
                width={800}
                height={400}
                className="w-full rounded-lg shadow-lg"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose max-w-none">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Social Sharing */}
          <SocialShareButtons post={post} url={currentUrl} />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Author Bio */}
          <div className="mt-12 pt-8 border-t border-border">
            <AuthorCard
              author={post.author}
              avatar={getAuthorAvatar(post.author)}
              socialLinks={{
                twitter: "https://twitter.com/professionalblog",
                linkedin: "https://linkedin.com/company/professionalblog",
                website: "https://professionalblog.com"
              }}
            />
          </div>

          {/* Related Posts */}
          <RelatedPosts posts={relatedPosts} />
        </div>
      </article>
    </div>
  );
}