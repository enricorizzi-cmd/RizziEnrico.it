'use client';

import { useLayoutEffect } from 'react';

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-0PKBSWJH3V';

export default function GoogleAnalytics() {
  useLayoutEffect(() => {
    // Inserisce Google Analytics direttamente nell'head seguendo ESATTAMENTE le istruzioni ufficiali di Google
    // useLayoutEffect viene eseguito prima del paint, garantendo inserimento immediato
    if (typeof window === 'undefined') return;

    // Verifica se già presente per evitare duplicati
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA4_ID}"]`)) {
      return;
    }

    // ORDINE UFFICIALE GOOGLE ANALYTICS:
    // 1. Script esterno (async) - PRIMO come da istruzioni Google
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(script1);

    // 2. Script inline con dataLayer, gtag, config - SECONDO come da istruzioni Google
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA4_ID}', {
        anonymize_ip: true,
      });
    `;
    document.head.appendChild(script2);
  }, []);

  return null;
}

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

