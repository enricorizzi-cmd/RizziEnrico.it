import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Enrico Rizzi - Consulente OSM',
    short_name: 'ER Consulenza',
    description: 'Consulenza OSM per PMI: persone, KPI e processi',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#A72868',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

