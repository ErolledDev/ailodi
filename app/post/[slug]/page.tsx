import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { CalendarDays, Clock, User, Tag, FolderOpen, Share2, BookmarkPlus } from 'lucide-react';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { getContentBySlug, getAllContent } from '@/lib/content';
import type { Metadata } from 'next';
import Image from 'next/image';

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="fade-in">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <span>Home</span>
              <span>/</span>
              <span>Articles</span>
              <span>/</span>
              <span className="text-gray-900">{post.title}</span>
            </nav>

            {/* Categories */}
            {post.categories.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <FolderOpen size={16} className="text-gray-500" />
                <div className="flex gap-2">
                  {post.categories.map((category) => (
                    <span key={category} className="wp-category">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-8" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              {post.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <div className="wp-author-avatar w-10 h-10 text-sm">
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{post.author}</div>
                  <div className="text-sm text-gray-500">Author</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays size={18} />
                <span>{format(publishDate, 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="outline" size="sm" className="wp-btn wp-btn-secondary">
                <BookmarkPlus size={16} />
                Save Article
              </Button>
              <Button variant="outline" size="sm" className="wp-btn wp-btn-secondary">
                <Share2 size={16} />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImageUrl && (
        <div className="max-w-5xl mx-auto px-4 -mt-8 mb-16 fade-in">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={post.featuredImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 fade-in">
          <div className="prose prose-lg max-w-none">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Tag size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="wp-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Author Bio */}
        <div className="mt-12 fade-in">
          <div className="wp-author">
            <div className="flex items-start gap-6">
              <div className="wp-author-avatar w-20 h-20 text-xl">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="wp-author-name">
                  {post.author}
                </div>
                <div className="wp-author-bio">
                  Passionate writer and technology enthusiast. Dedicated to sharing knowledge 
                  and insights that help developers and creators build better digital experiences. 
                  Thank you for reading and being part of our community!
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <Button variant="outline" size="sm" className="wp-btn wp-btn-secondary">
                    Follow Author
                  </Button>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                    View All Posts
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 fade-in">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get the latest articles and insights delivered directly to your inbox. 
              Join our community of passionate learners and creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button className="wp-btn wp-btn-primary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}