'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}

interface GoogleAnalyticsProps {
  gaId: string;
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId || !window.gtag) return;

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    
    // Send pageview event to Google Analytics
    window.gtag('config', gaId, {
      page_path: url,
      page_title: document.title,
    });

    console.log('📊 GA: Page view tracked:', url);
  }, [pathname, searchParams, gaId]);

  return null;
}