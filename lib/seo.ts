import { Metadata } from 'next';

export function generateMetadata({
  title,
  description,
  path = '',
  image,
  keywords,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string;
}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';
  const url = `${baseUrl}${path}`;
  // Fallback temporaneo: usa logo se og-default.jpg non esiste
  // TODO: Creare og-default.jpg (1200x630px) per Open Graph
  const ogImage = image || `${baseUrl}/logo-enrico-rizzi.png`;
  
  // Keywords di default se non fornite
  const defaultKeywords = 'consulenza PMI Veneto, organizzazione aziendale, KPI, controllo di gestione, consulente Venezia, consulente Rovigo, consulente Padova, Enrico Rizzi, metodo OSM, leadership, mansionari, sviluppo persone';
  const metaKeywords = keywords || defaultKeywords;

  // Assicura che title sia <65 caratteri per SEO ottimale
  const optimizedTitle = title.length > 65 ? title.substring(0, 62) + '...' : title;
  // Assicura che description sia <160 caratteri per SEO ottimale
  const optimizedDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;

  return {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: metaKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: optimizedTitle,
      description: optimizedDescription,
      url,
      siteName: 'Enrico Rizzi - Consulente OSM PMI Veneto',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: optimizedTitle,
        },
      ],
      locale: 'it_IT',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: optimizedTitle,
      description: optimizedDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

