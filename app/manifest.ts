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
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logo-enrico-rizzi.png',
        sizes: '120x40',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo-enrico-rizzi.png',
        sizes: '120x40',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

