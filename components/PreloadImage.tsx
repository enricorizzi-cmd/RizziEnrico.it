'use client';

import { useEffect } from 'react';

interface PreloadImageProps {
  href: string;
  as?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
}

export default function PreloadImage({ 
  href, 
  as = 'image', 
  fetchPriority = 'high' 
}: PreloadImageProps) {
  useEffect(() => {
    // Verifica se il link esiste già
    const existingLink = document.querySelector(`link[rel="preload"][href="${href}"]`);
    if (existingLink) {
      return; // Link già presente, non aggiungere duplicati
    }

    // Aggiungi preload solo client-side per evitare problemi di hydration
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = href;
    if (fetchPriority) {
      link.setAttribute('fetchpriority', fetchPriority);
    }
    document.head.appendChild(link);

    return () => {
      // Cleanup: rimuovi il link quando il componente viene smontato
      const linkToRemove = document.querySelector(`link[rel="preload"][href="${href}"]`);
      if (linkToRemove && linkToRemove === link) {
        document.head.removeChild(linkToRemove);
      }
    };
  }, [href, as, fetchPriority]);

  return null;
}

