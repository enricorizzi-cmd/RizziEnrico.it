import { Metadata } from 'next';

export function generateMetadata({
  title,
  description,
  path = '',
  image,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';
  const url = `${baseUrl}${path}`;
  // Fallback temporaneo: usa logo se og-default.jpg non esiste
  // TODO: Creare og-default.jpg (1200x630px) per Open Graph
  const ogImage = image || `${baseUrl}/logo-enrico-rizzi.png`;

  return {
    title: title.length > 60 ? title.substring(0, 57) + '...' : title,
    description: description.length > 160 ? description.substring(0, 157) + '...' : description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Enrico Rizzi - Consulente OSM',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'it_IT',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

