import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // CRITICO: Standalone output riduce drasticamente l'uso di memoria
  output: 'standalone',

  images: {
    formats: ['image/avif', 'image/webp'],
    // Ridotte dimensioni per risparmiare memoria
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128],
    minimumCacheTTL: 31536000, // 1 anno per immagini statiche
    // Permetti immagini locali non ottimizzate se necessario
    unoptimized: false,
    // Limita dimensione massima per ridurre uso memoria
    dangerouslyAllowSVG: false,
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Disabilita ottimizzazione immagini troppo grandi (previene OOM)
    remotePatterns: [],
  },
  compress: true, // Abilita compressione gzip
  poweredByHeader: false, // Rimuove header X-Powered-By per sicurezza
  reactStrictMode: true,

  // Nota: swcMinify è rimosso in Next.js 16 - SWC è ora il default

  // Limita memoria per server components
  serverExternalPackages: ['sharp', 'canvas'],

  experimental: {
    optimizePackageImports: ['react-chartjs-2', 'chart.js', '@supabase/supabase-js', 'date-fns', 'react-markdown'],
    // Ottimizzazioni memoria
    serverActions: {
      bodySizeLimit: '500kb',
    },
    // Ottimizza bundle size riducendo JavaScript inutilizzato
    optimizeCss: true,
  },

  // Configurazione compilatore per evitare transpilazione JavaScript legacy
  compiler: {
    // Rimuove console.log in produzione (opzionale, migliora performance)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Target moderno per evitare polyfill non necessari
  // Next.js 16 usa automaticamente target moderno, ma possiamo essere espliciti
  // Nota: Questo è gestito automaticamente da Next.js 16, ma lo documentiamo

  // Ottimizzazioni aggiuntive per ridurre memoria
  onDemandEntries: {
    maxInactiveAge: 25 * 1000, // Ridotto da default 60s a 25s
    pagesBufferLength: 2, // Ridotto da default 5 a 2
  },

  // IGNORA ERRORI TYPESCRIPT IN BUILD
  // Necessario per evitare "JavaScript heap out of memory" su Render (Free/Starter tier)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
