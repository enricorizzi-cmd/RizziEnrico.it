import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // Permetti immagini locali non ottimizzate se necessario
    unoptimized: false,
    // Limita dimensione massima per ridurre uso memoria
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['react-chartjs-2', 'chart.js', '@supabase/supabase-js', 'date-fns'],
    // Ottimizzazioni memoria
    serverActions: {
      bodySizeLimit: '1mb', // Limita dimensione body per server actions
    },
  },
  // Turbopack config (Next.js 16 usa Turbopack di default)
  // Configurazione vuota per silenziare warning webpack
  turbopack: {},
};

export default nextConfig;
