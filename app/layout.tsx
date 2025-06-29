import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.tech'),
  title: {
    default: 'AI Lodi - Your Global Tech Insights & AI Innovation Hub',
    template: '%s | AI Lodi'
  },
  description: 'AI Lodi is your ultimate guide to modern technology, AI breakthroughs, programming trends, and future science. Get in-depth analysis, tutorials, and insights on cutting-edge tech innovations shaping our world.',
  keywords: [
    'AI', 
    'artificial intelligence', 
    'machine learning', 
    'programming', 
    'web development', 
    'technology trends', 
    'automation', 
    'quantum computing', 
    'deep tech',
    'generative AI',
    'developer tools',
    'tech insights',
    'future science',
    'innovation',
    'tech news',
    'AI research',
    'coding tutorials',
    'tech analysis'
  ],
  authors: [{ name: 'AI Lodi Team' }],
  creator: 'AI Lodi',
  publisher: 'AI Lodi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.tech',
    title: 'AI Lodi - Your Global Tech Insights & AI Innovation Hub',
    description: 'AI Lodi is your ultimate guide to modern technology, AI breakthroughs, programming trends, and future science. Get in-depth analysis, tutorials, and insights on cutting-edge tech innovations.',
    siteName: 'AI Lodi',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Lodi - Global Tech Insights and AI Innovation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Lodi - Your Global Tech Insights & AI Innovation Hub',
    description: 'AI Lodi is your ultimate guide to modern technology, AI breakthroughs, programming trends, and future science. Get in-depth analysis, tutorials, and insights on cutting-edge tech innovations.',
    creator: '@ailodi_tech',
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
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.tech',
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
              "name": "AI Lodi",
              "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.tech',
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.tech'}/logo.png`,
              "description": "AI Lodi is your ultimate guide to modern technology, AI breakthroughs, programming trends, and future science. Get in-depth analysis, tutorials, and insights on cutting-edge tech innovations.",
              "sameAs": [
                "https://twitter.com/ailodi_tech",
                "https://linkedin.com/company/ailodi",
                "https://github.com/ailodi"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "hello@ailodi.tech"
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
              "name": "AI Lodi",
              "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.tech',
              "description": "AI Lodi is your ultimate guide to modern technology, AI breakthroughs, programming trends, and future science. Get in-depth analysis, tutorials, and insights on cutting-edge tech innovations.",
              "publisher": {
                "@type": "Organization",
                "name": "AI Lodi"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.tech'}/search?q={search_term_string}`
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