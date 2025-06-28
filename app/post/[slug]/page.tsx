import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { CalendarDays, Clock, User, Tag, FolderOpen } from 'lucide-react';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getContentBySlug } from '@/lib/content';
import type { Metadata } from 'next';
import Image from 'next/image';

interface PostPageProps {
  params: {
    slug: string;
  };
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
    <article className="max-w-4xl mx-auto px-4 py-12">
      <div className="fade-in">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span className="font-medium">{post.author}</span>
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

            {post.featuredImageUrl && (
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                  src={post.featuredImageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="flex flex-wrap gap-4 mb-8">
              {post.categories.length > 0 && (
                <div className="flex items-center gap-2">
                  <FolderOpen size={16} className="text-gray-500" />
                  <div className="flex gap-2">
                    {post.categories.map((category) => (
                      <Badge key={category} variant="outline">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {post.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-8">
                <Tag size={16} className="text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        <Separator className="mb-12" />

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>

        <Separator className="my-12" />

        {/* Footer */}
        <footer className="bg-gray-50 rounded-lg p-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={24} className="text-gray-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {post.author}
              </h3>
              <p className="text-gray-600">
                Thank you for reading! Stay tuned for more insights and updates.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}