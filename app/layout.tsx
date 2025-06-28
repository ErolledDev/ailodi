import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'),
  title: {
    default: 'Professional Blog',
    template: '%s | Professional Blog'
  },
  description: 'A modern, professional blog built with Next.js',
  keywords: ['blog', 'nextjs', 'web development', 'technology'],
  authors: [{ name: 'Professional Blog' }],
  creator: 'Professional Blog',
  publisher: 'Professional Blog',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
    title: 'Professional Blog',
    description: 'A modern, professional blog built with Next.js',
    siteName: 'Professional Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Blog',
    description: 'A modern, professional blog built with Next.js',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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