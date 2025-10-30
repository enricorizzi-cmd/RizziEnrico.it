'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Analytics() {
  const pathname = usePathname();
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  useEffect(() => {
    // Plausible Analytics
    if (domain && typeof window !== 'undefined') {
      // Load Plausible script
      const script = document.createElement('script');
      script.defer = true;
      script.dataset.domain = domain;
      script.src = 'https://plausible.io/js/script.js';
      document.head.appendChild(script);

      return () => {
        // Cleanup
        const existing = document.querySelector(`[data-domain="${domain}"]`);
        if (existing) {
          existing.remove();
        }
      };
    }

    // GA4 alternative (if needed)
    const gaId = process.env.NEXT_PUBLIC_GA4_ID;
    if (gaId && typeof window !== 'undefined' && !window.gtag) {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      document.head.appendChild(script2);
    }
  }, []);

  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('pageview', { u: window.location.href });
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA4_ID || '', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}

// Helper functions per event tracking
export function trackEvent(eventName: string, props?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    // Plausible
    if (window.plausible) {
      window.plausible(eventName, { props });
    }

    // GA4
    if (window.gtag) {
      window.gtag('event', eventName, props);
    }
  }
}

declare global {
  interface Window {
    plausible?: (event: string, options?: { u?: string; props?: Record<string, any> }) => void;
    gtag?: (...args: any[]) => void;
  }
}

