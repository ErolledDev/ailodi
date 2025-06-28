import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { CalendarDays, Clock, BookmarkPlus, Share2, MoreHorizontal } from 'lucide-react';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { Button } from '@/components/ui/button';
import { SocialShareButtons } from '@/components/social-share-buttons';
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

  return (
    <div className="min-h-screen bg-background">
      <article className="max-w-3xl mx-auto px-4 py-16">
        <div className="fade-in">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-8">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="medium-author-avatar w-12 h-12 text-sm">
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-foreground">{post.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {format(publishDate, 'MMM d')} · {readingTime} min read
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <BookmarkPlus size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Share2 size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={20} />
                </Button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImageUrl && (
            <div className="mb-12">
              <Image
                src={post.featuredImageUrl}
                alt={post.title}
                width={800}
                height={400}
                className="w-full rounded-lg"
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
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="medium-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="medium-author">
              <div className="flex items-start gap-4">
                <div className="medium-author-avatar w-16 h-16 text-lg">
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="medium-author-name">
                    {post.author}
                  </div>
                  <div className="medium-author-bio">
                    Writer and technology enthusiast. Passionate about sharing knowledge 
                    and insights that help developers and creators build better digital experiences.
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <Button variant="outline" size="sm" className="medium-btn medium-btn-secondary">
                      Follow
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <RelatedPosts posts={relatedPosts} />
        </div>
      </article>
    </div>
  );
}