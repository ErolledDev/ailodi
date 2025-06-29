import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Clock, Calendar, User, Tag, Eye } from 'lucide-react';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { SocialShareButtons } from '@/components/social-share-buttons';
import { PostActions } from '@/components/post-actions';
import { AuthorCard } from '@/components/author-card';
import { SubscribeForm } from '@/components/subscribe-form';
import { SponsorSection } from '@/components/sponsor-section';
import { RelatedArticles } from '@/components/related-articles';
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
        title: 'Post Not Found | AI Lodi',
        description: 'The requested blog post could not be found.',
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.tech';
    const postUrl = `${baseUrl}/post/${post.slug}`;
    const readingTime = Math.ceil(post.content.split(' ').length / 200);

    return {
      title: post.seoTitle || `${post.title} | AI Lodi`,
      description: post.metaDescription,
      keywords: post.keywords?.join(', '),
      authors: [{ name: post.author, url: `${baseUrl}/author/${encodeURIComponent(post.author.toLowerCase().replace(/\s+/g, '-'))}` }],
      creator: post.author,
      publisher: 'AI Lodi',
      category: post.categories[0] || 'Technology',
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
        section: post.categories[0] || 'Technology',
        tags: post.tags,
        images: post.featuredImageUrl ? [{
          url: post.featuredImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/jpeg',
        }] : [{
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/jpeg',
        }],
        url: postUrl,
        siteName: 'AI Lodi',
      },
      twitter: {
        card: 'summary_large_image',
        title: post.seoTitle || post.title,
        description: post.metaDescription,
        images: post.featuredImageUrl ? [post.featuredImageUrl] : [`${baseUrl}/og-image.jpg`],
        creator: '@ailodi_tech',
        site: '@ailodi_tech',
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
      other: {
        'article:reading_time': readingTime.toString(),
        'article:word_count': post.content.split(' ').length.toString(),
      },
    };
  } catch (error) {
    return {
      title: 'Post Not Found | AI Lodi',
      description: 'The requested blog post could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  let post: BlogPost | null;
  
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
  const updatedDate = new Date(post.updatedAt);
  const readingTime = Math.ceil(post.content.split(' ').length / 200);
  const wordCount = post.content.split(' ').length;
  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.tech'}/post/${post.slug}`;

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 xl:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="max-w-none lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
              <div>
                {/* Breadcrumb Navigation */}
                <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <li>
                      <Link href="/" className="hover:text-primary transition-colors">
                        Home
                      </Link>
                    </li>
                    <li>/</li>
                    {post.categories[0] && (
                      <>
                        <li>
                          <Link 
                            href={`/categories?filter=${encodeURIComponent(post.categories[0])}`}
                            className="hover:text-primary transition-colors"
                          >
                            {post.categories[0]}
                          </Link>
                        </li>
                        <li>/</li>
                      </>
                    )}
                    <li className="text-foreground font-medium line-clamp-1">
                      {post.title}
                    </li>
                  </ol>
                </nav>

                {/* Header */}
                <header className="mb-8 sm:mb-10 lg:mb-12">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6 sm:mb-8">
                    {post.title}
                  </h1>
                  
                  {/* Meta Description */}
                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-l-4 border-primary rounded-r-lg p-4 sm:p-6 mb-6 sm:mb-8 lg:mb-10">
                    <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed italic">
                      {post.metaDescription}
                    </p>
                  </div>
                  
                  {/* Enhanced Article Meta */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-sm sm:text-base font-semibold text-primary">
                          {getAuthorInitials()}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-foreground text-base sm:text-lg flex items-center gap-2">
                          <User size={14} />
                          {post.author}
                        </div>
                        <div className="text-sm sm:text-base text-muted-foreground space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <time dateTime={post.publishDate}>
                              Published {format(publishDate, 'MMMM d, yyyy')}
                            </time>
                          </div>
                          {post.updatedAt !== post.publishDate && (
                            <div className="flex items-center gap-2">
                              <Clock size={14} />
                              <time dateTime={post.updatedAt}>
                                Updated {format(updatedDate, 'MMMM d, yyyy')}
                              </time>
                            </div>
                          )}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{readingTime} min read</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye size={14} />
                              <span>{wordCount} words</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <PostActions post={post} url={currentUrl} />
                    </div>
                  </div>

                  {/* Categories */}
                  {post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 lg:mb-10">
                      {post.categories.map((category) => (
                        <Link
                          key={category}
                          href={`/categories?filter=${encodeURIComponent(category)}`}
                          className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Tag size={12} className="mr-1" />
                          {category}
                        </Link>
                      ))}
                    </div>
                  )}
                </header>

                {/* Featured Image */}
                {post.featuredImageUrl && (
                  <div className="mb-8 sm:mb-10 lg:mb-12">
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
                <div className="prose prose-lg max-w-none mb-8 sm:mb-10 lg:mb-12">
                  <MarkdownRenderer content={post.content} />
                </div>

                {/* Social Sharing */}
                <div className="mb-8 sm:mb-10 lg:mb-12">
                  <SocialShareButtons post={post} url={currentUrl} />
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="mb-8 sm:mb-10 lg:mb-12 pt-6 sm:pt-8 border-t border-border">
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">Tags</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm font-medium bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Author Bio */}
                <div className="mb-6 sm:mb-8 lg:mb-10 pt-6 sm:pt-8 border-t border-border">
                  <AuthorCard
                    author={post.author}
                    avatar={getAuthorAvatar(post.author)}
                    socialLinks={{
                      twitter: "https://twitter.com/ailodi_tech",
                      linkedin: "https://linkedin.com/company/ailodi",
                      website: "https://ailodi.tech"
                    }}
                  />
                </div>

                {/* Newsletter Subscription */}
                <div className="mb-8 sm:mb-10 lg:mb-12">
                  <SubscribeForm />
                </div>

                {/* Related Articles - Always shown below main content */}
                <RelatedArticles 
                  currentPostId={post.id} 
                  categories={post.categories} 
                />
              </div>
            </article>
          </div>

          {/* Sidebar - Hidden on mobile, visible on large screens */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-20 space-y-6 sm:space-y-8">
              {/* Sponsor Section */}
              <SponsorSection />
            </div>
          </aside>
        </div>

        {/* Mobile-only sponsor section - Shown below related articles on small screens */}
        <div className="lg:hidden mt-8 sm:mt-10">
          <SponsorSection />
        </div>
      </div>

      {/* Enhanced Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.metaDescription,
            "image": post.featuredImageUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.tech'}/og-image.jpg`,
            "author": {
              "@type": "Person",
              "name": post.author,
              "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.tech'}/author/${encodeURIComponent(post.author.toLowerCase().replace(/\s+/g, '-'))}`
            },
            "publisher": {
              "@type": "Organization",
              "name": "AI Lodi",
              "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.tech'}/logo.png`,
                "width": 512,
                "height": 512
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
            "wordCount": wordCount,
            "timeRequired": `PT${readingTime}M`,
            "inLanguage": "en-US",
            "isAccessibleForFree": true,
            "copyrightYear": new Date(post.publishDate).getFullYear(),
            "copyrightHolder": {
              "@type": "Organization",
              "name": "AI Lodi"
            },
            "about": post.categories.map(category => ({
              "@type": "Thing",
              "name": category
            })),
            "mentions": post.tags.map(tag => ({
              "@type": "Thing",
              "name": tag
            }))
          })
        }}
      />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.tech'
              },
              ...(post.categories[0] ? [{
                "@type": "ListItem",
                "position": 2,
                "name": post.categories[0],
                "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.tech'}/categories?filter=${encodeURIComponent(post.categories[0])}`
              }] : []),
              {
                "@type": "ListItem",
                "position": post.categories[0] ? 3 : 2,
                "name": post.title,
                "item": currentUrl
              }
            ]
          })
        }}
      />
    </div>
  );
}