'use client';

import Script from 'next/script';

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-0PKBSWJH3V';

export default function GoogleAnalytics() {
  return (
    <>
      {/* Script esterno Google Analytics - usa next/script per ottimizzazione */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
        id="ga-script"
      />
      {/* Script inline con configurazione - eseguito dopo che lo script esterno è caricato */}
      <Script
        id="ga-config"
        strategy="afterInteractive"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_ID}', {
              anonymize_ip: true,
            });
          `,
        }}
      />
    </>
  );
}

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

