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
    dataLayer: any[];
  }
}

interface GoogleAnalyticsProps {
  gaId: string;
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId) {
      console.warn('⚠️ GA: No GA ID provided');
      return;
    }

    if (typeof window === 'undefined') {
      console.warn('⚠️ GA: Window not available (SSR)');
      return;
    }

    if (!window.gtag) {
      console.warn('⚠️ GA: gtag function not available');
      return;
    }

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    
    // Send pageview event to Google Analytics
    window.gtag('config', gaId, {
      page_path: url,
      page_title: document.title,
    });

    console.log('📊 GA: Page view tracked:', url);
  }, [pathname, searchParams, gaId]);

  // Debug effect to check GA status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('🔍 GA Component Debug:');
      console.log('- GA ID:', gaId);
      console.log('- gtag available:', typeof window.gtag);
      console.log('- dataLayer available:', typeof window.dataLayer);
      console.log('- Current pathname:', pathname);
    }
  }, [gaId, pathname]);

  return null;
}