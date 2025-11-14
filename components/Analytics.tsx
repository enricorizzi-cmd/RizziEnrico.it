'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Google Analytics ID - può essere sovrascritto da variabile d'ambiente
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-0PKBSWJH3V';

export default function Analytics() {
  const pathname = usePathname();
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  // Preconnect per migliorare velocità caricamento script third-party
  // Rimossi perché già gestiti nel layout.tsx per evitare manipolazioni DOM durante hydration
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     // Preconnect a domini third-party
  //     const preconnectDomains = [
  //       'https://plausible.io',
  //       'https://www.googletagmanager.com',
  //       'https://www.google-analytics.com',
  //     ];

  //     preconnectDomains.forEach((url) => {
  //       const link = document.createElement('link');
  //       link.rel = 'preconnect';
  //       link.href = url;
  //       link.crossOrigin = 'anonymous';
  //       if (!document.querySelector(`link[href="${url}"]`)) {
  //         document.head.appendChild(link);
  //       }
  //     });
  //   }
  // }, []);

  useEffect(() => {
    // Carica Plausible Analytics solo dopo che la pagina è interattiva per non bloccare rendering
    // Google Analytics è ora caricato direttamente nel layout.tsx
    const loadAnalytics = () => {
      // Plausible Analytics
      if (domain && typeof window !== 'undefined') {
        // Verifica se lo script esiste già per evitare duplicati
        const existing = document.querySelector(`[data-domain="${domain}"]`);
        if (existing) {
          return;
        }

        // Load Plausible script con defer
        const script = document.createElement('script');
        script.defer = true;
        script.dataset.domain = domain;
        script.src = 'https://plausible.io/js/script.js';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }
    };

    // Strategia di caricamento ottimizzata per evitare problemi di hydration:
    // Usa requestAnimationFrame per assicurarsi che l'hydration sia completa
    if (typeof window !== 'undefined') {
      const scheduleLoad = () => {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(loadAnalytics, { timeout: 2000 });
        } else {
          setTimeout(loadAnalytics, 100);
        }
      };

      if (document.readyState === 'complete') {
        // Pagina già caricata - aspetta che l'hydration sia completa
        requestAnimationFrame(() => {
          setTimeout(scheduleLoad, 0);
        });
      } else {
        // Aspetta che la pagina sia interattiva
        window.addEventListener('load', () => {
          requestAnimationFrame(() => {
            setTimeout(scheduleLoad, 0);
          });
        }, { once: true });
      }
    }
  }, [domain]);

  // Track page views - ottimizzato per Next.js App Router
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Plausible Analytics
    if (window.plausible) {
      window.plausible('pageview', { u: window.location.href });
    }

    // Google Analytics 4 - Page view tracking
    // Aggiorna la configurazione per tracciare il cambio di pagina in Next.js
    if (window.gtag && GA4_ID) {
      window.gtag('config', GA4_ID, {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [pathname, GA4_ID]);

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
    dataLayer?: any[];
  }
}

