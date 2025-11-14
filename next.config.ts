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
  
  // Ottimizzazioni performance aggiuntive
  swcMinify: true, // Usa SWC per minificazione (più veloce di Terser)
  
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
  
  // Ottimizzazioni aggiuntive per ridurre memoria
  onDemandEntries: {
    maxInactiveAge: 25 * 1000, // Ridotto da default 60s a 25s
    pagesBufferLength: 2, // Ridotto da default 5 a 2
  },
};

export default nextConfig;
