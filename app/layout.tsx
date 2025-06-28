import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'),
  title: {
    default: 'Professional Blog - Insights, Tutorials & Tech Stories',
    template: '%s | Professional Blog'
  },
  description: 'A modern, professional blog featuring insights, tutorials, and stories about web development, technology, and digital innovation. Join our community of developers and creators.',
  keywords: [
    'blog', 
    'nextjs', 
    'web development', 
    'technology', 
    'programming', 
    'tutorials', 
    'javascript', 
    'react', 
    'css', 
    'html',
    'software engineering',
    'tech insights',
    'digital innovation'
  ],
  authors: [{ name: 'Professional Blog Team' }],
  creator: 'Professional Blog',
  publisher: 'Professional Blog',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
    title: 'Professional Blog - Insights, Tutorials & Tech Stories',
    description: 'A modern, professional blog featuring insights, tutorials, and stories about web development, technology, and digital innovation.',
    siteName: 'Professional Blog',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Blog - Tech Insights and Tutorials',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Blog - Insights, Tutorials & Tech Stories',
    description: 'A modern, professional blog featuring insights, tutorials, and stories about web development, technology, and digital innovation.',
    creator: '@professionalblog',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
    languages: {
      'en-US': '/en-US',
    },
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#22c55e" />
        <meta name="color-scheme" content="light" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://api.dicebear.com" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://blogform.netlify.app" />
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Professional Blog",
              "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/logo.png`,
              "description": "A modern, professional blog featuring insights, tutorials, and stories about web development, technology, and digital innovation.",
              "sameAs": [
                "https://twitter.com/professionalblog",
                "https://linkedin.com/company/professionalblog",
                "https://github.com/professionalblog"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "hello@professionalblog.com"
              }
            })
          }}
        />
        
        {/* Structured Data for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Professional Blog",
              "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
              "description": "A modern, professional blog featuring insights, tutorials, and stories about web development, technology, and digital innovation.",
              "publisher": {
                "@type": "Organization",
                "name": "Professional Blog"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/search?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}