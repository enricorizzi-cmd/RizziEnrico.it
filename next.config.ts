import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    // Ridotte dimensioni per risparmiare memoria
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 anno per immagini statiche
    // Permetti immagini locali non ottimizzate se necessario
    unoptimized: false,
    // Limita dimensione massima per ridurre uso memoria
    dangerouslyAllowSVG: false,
    contentDispositionType: 'inline', // Cambiato da 'attachment' a 'inline' per migliorare caching
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Disabilita ottimizzazione immagini troppo grandi (previene OOM)
    remotePatterns: [],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Next.js 16 usa webpack per i build di produzione (Turbopack è solo per sviluppo con --turbopack)
  // Configurazione webpack per ottimizzare la generazione dei chunk
  webpack: (config, { isServer, dev }) => {
    // Solo per build di produzione client-side
    if (!isServer && !dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
          },
        },
      };
    }
    return config;
  },
  // Limita memoria per server components (spostato da experimental in Next.js 16)
  serverExternalPackages: ['sharp', 'canvas'],
  experimental: {
    optimizePackageImports: ['react-chartjs-2', 'chart.js', '@supabase/supabase-js', 'date-fns'],
    // Ottimizzazioni memoria
    serverActions: {
      bodySizeLimit: '500kb', // Ridotto da 1mb a 500kb per ridurre memoria
    },
    // Ottimizza bundle size riducendo JavaScript inutilizzato
    optimizeCss: true,
  },
  // swcMinify è il default in Next.js 16 e l'opzione è stata rimossa
  // Turbopack è il bundler di default in Next.js 16 e non richiede configurazione
};

export default nextConfig;
