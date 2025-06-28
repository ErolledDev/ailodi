import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { SocialShareButtons } from '@/components/social-share-buttons';
import { PostActions } from '@/components/post-actions';
import { AuthorCard } from '@/components/author-card';
import { SubscribeForm } from '@/components/subscribe-form';
import { AdAside } from '@/components/ad-aside';
import { RelatedPostsAside } from '@/components/related-posts-aside';
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
        description: 'The requested blog post could not be found.',
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';
    const postUrl = `${baseUrl}/post/${post.slug}`;

    return {
      title: post.seoTitle || post.title,
      description: post.metaDescription,
      keywords: post.keywords?.join(', '),
      authors: [{ name: post.author }],
      creator: post.author,
      publisher: 'Professional Blog',
      alternates: {
        canonical: postUrl,
      },
      openGraph: {
        title: post.seoTitle || post.title,
        description: post.metaDescription,
        type: 'article',
        publishedTime: post.publishDate,
        modifiedTime: post.updatedAt,
        authors: [post.author],
        images: post.featuredImageUrl ? [{
          url: post.featuredImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }] : undefined,
        url: postUrl,
        siteName: 'Professional Blog',
      },
      twitter: {
        card: 'summary_large_image',
        title: post.seoTitle || post.title,
        description: post.metaDescription,
        images: post.featuredImageUrl ? [post.featuredImageUrl] : undefined,
        creator: '@professionalblog',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
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
    <section className="mt-16 pt-8 border-t border-border">
      <h3 className="text-2xl font-bold text-foreground mb-8">You might also like</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/post/${post.slug}`} className="group">
            <article className="bg-card border border-border/50 rounded-lg overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300">
              {post.featuredImageUrl && (
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={post.featuredImageUrl}
                    alt={post.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <h4 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {post.metaDescription}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{format(new Date(post.publishDate), 'MMM d')}</span>
                  <span>·</span>
                  <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
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

  const getAuthorInitials = () => {
    return post.author
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAuthorAvatar = (authorName: string) => {
    const seed = encodeURIComponent(authorName);
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=3b82f6&radius=50`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <nav className="border-b border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-foreground font-medium line-clamp-1">{post.title}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="max-w-3xl">
              <div className="fade-in">
                {/* Header */}
                <header className="mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                    {post.title}
                  </h1>
                  
                  {/* Meta Description */}
                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-l-4 border-primary rounded-r-lg p-4 mb-8">
                    <p className="text-lg text-muted-foreground leading-relaxed italic">
                      {post.metaDescription}
                    </p>
                  </div>
                  
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
                          <time dateTime={post.publishDate}>
                            {format(publishDate, 'MMMM d, yyyy')}
                          </time>
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
                        <Link
                          key={category}
                          href={`/categories?filter=${encodeURIComponent(category)}`}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-secondary text-secondary-foreground border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  )}
                </header>

                {/* Featured Image */}
                {post.featuredImageUrl && (
                  <div className="mb-12">
                    <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
                      <Image
                        src={post.featuredImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                      />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <MarkdownRenderer content={post.content} />
                </div>

                {/* Social Sharing */}
                <div className="mt-12">
                  <SocialShareButtons post={post} url={currentUrl} />
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Newsletter Subscription */}
                <div className="mt-12">
                  <SubscribeForm />
                </div>

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

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Related Posts Aside */}
            <RelatedPostsAside 
              currentPostId={post.id} 
              categories={post.categories} 
            />
            
            {/* Ad Aside */}
            <AdAside />
          </aside>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.metaDescription,
            "image": post.featuredImageUrl,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Professional Blog",
              "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/logo.png`
              }
            },
            "datePublished": post.publishDate,
            "dateModified": post.updatedAt,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": currentUrl
            },
            "keywords": post.keywords?.join(', '),
            "articleSection": post.categories.join(', '),
            "wordCount": post.content.split(' ').length
          })
        }}
      />
    </div>
  );
}