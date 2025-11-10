'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Google Analytics ID - può essere sovrascritto da variabile d'ambiente
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-0PKBSWJH3V';

export default function Analytics() {
  const pathname = usePathname();
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  // Preconnect per migliorare velocità caricamento script third-party
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Preconnect a domini third-party
      const preconnectDomains = [
        'https://plausible.io',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
      ];

      preconnectDomains.forEach((url) => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        link.crossOrigin = 'anonymous';
        if (!document.querySelector(`link[href="${url}"]`)) {
          document.head.appendChild(link);
        }
      });
    }
  }, []);

  useEffect(() => {
    // Carica analytics solo dopo che la pagina è interattiva per non bloccare rendering
    const loadAnalytics = () => {
      // Plausible Analytics
      if (domain && typeof window !== 'undefined') {
        // Load Plausible script con defer
        const script = document.createElement('script');
        script.defer = true;
        script.dataset.domain = domain;
        script.src = 'https://plausible.io/js/script.js';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);

        return () => {
          // Cleanup
          const existing = document.querySelector(`[data-domain="${domain}"]`);
          if (existing) {
            existing.remove();
          }
        };
      }

      // Google Analytics 4 - Implementazione ottimizzata per performance
      if (GA4_ID && typeof window !== 'undefined' && !window.gtag) {
        // Inizializza dataLayer prima di caricare lo script
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(args);
        }
        window.gtag = gtag;
        gtag('js', new Date());

        // Carica lo script gtag.js in modo asincrono (non blocca rendering)
        const script1 = document.createElement('script');
        script1.async = true; // async è sufficiente, non serve anche defer
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
        script1.crossOrigin = 'anonymous';
        
        // Gestione errori per migliorare resilienza
        script1.onerror = () => {
          console.warn('Failed to load Google Analytics script');
        };
        
        document.head.appendChild(script1);

        // Configurazione GA4 con ottimizzazioni performance
        gtag('config', GA4_ID, {
          // Ottimizzazioni per migliorare performance
          send_page_view: false, // Gestiamo manualmente per Next.js
          // Riduce la frequenza di invio dati
          transport_type: 'beacon',
          // Abilita compressione
          anonymize_ip: true, // GDPR compliance
        });
      }
    };

    // Strategia di caricamento ottimizzata:
    // 1. Se la pagina è già caricata, carica subito (con piccolo delay per non bloccare)
    // 2. Altrimenti aspetta che la pagina sia interattiva
    // 3. Usa requestIdleCallback se disponibile per caricare quando il browser è idle
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        // Pagina già caricata - usa requestIdleCallback se disponibile
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(loadAnalytics, { timeout: 2000 });
        } else {
          setTimeout(loadAnalytics, 100);
        }
      } else {
        // Aspetta che la pagina sia interattiva
        window.addEventListener('load', () => {
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(loadAnalytics, { timeout: 2000 });
          } else {
            setTimeout(loadAnalytics, 100);
          }
        }, { once: true });
      }
    }
  }, []);

  // Track page views - ottimizzato per Next.js App Router
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Plausible Analytics
    if (window.plausible) {
      window.plausible('pageview', { u: window.location.href });
    }

    // Google Analytics 4 - Page view tracking
    if (window.gtag && GA4_ID) {
      window.gtag('config', GA4_ID, {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
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
    dataLayer?: any[];
    requestIdleCallback?: (
      callback: (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void,
      options?: { timeout?: number }
    ) => number;
  }
}

