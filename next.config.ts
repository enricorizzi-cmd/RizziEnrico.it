import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    // Ridotte dimensioni per risparmiare memoria
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
    // Permetti immagini locali non ottimizzate se necessario
    unoptimized: false,
    // Limita dimensione massima per ridurre uso memoria
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Disabilita ottimizzazione immagini troppo grandi (previene OOM)
    remotePatterns: [],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Ottimizzazioni webpack per ridurre memoria
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Limita memoria per webpack durante build
      config.optimization = {
        ...config.optimization,
        // Riduce memoria durante build
        minimize: true,
      };
    }
    return config;
  },
  experimental: {
    optimizePackageImports: ['react-chartjs-2', 'chart.js', '@supabase/supabase-js', 'date-fns'],
    // Ottimizzazioni memoria
    serverActions: {
      bodySizeLimit: '500kb', // Ridotto da 1mb a 500kb per ridurre memoria
    },
    // Limita memoria per server components
    serverComponentsExternalPackages: ['sharp', 'canvas'],
  },
  // Turbopack config (Next.js 16 usa Turbopack di default)
  // Configurazione vuota per silenziare warning webpack
  turbopack: {},
};

export default nextConfig;
