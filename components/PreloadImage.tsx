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
    // Aspetta che l'hydration sia completa prima di manipolare il DOM
    if (typeof window === 'undefined') return;

    // Usa requestAnimationFrame per assicurarsi che l'hydration sia completa
    const addPreload = () => {
      // Verifica se il link esiste già
      const existingLink = document.querySelector(`link[rel="preload"][href="${href}"]`);
      if (existingLink) {
        return; // Link già presente, non aggiungere duplicati
      }

      // Aggiungi preload solo client-side dopo l'hydration
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = as;
      link.href = href;
      if (fetchPriority) {
        link.setAttribute('fetchpriority', fetchPriority);
      }
      document.head.appendChild(link);
    };

    // Aspetta che il DOM sia completamente idratato
    if (document.readyState === 'complete') {
      // Usa requestAnimationFrame per evitare problemi di hydration
      requestAnimationFrame(() => {
        setTimeout(addPreload, 0);
      });
    } else {
      window.addEventListener('load', () => {
        requestAnimationFrame(() => {
          setTimeout(addPreload, 0);
        });
      }, { once: true });
    }
  }, [href, as, fetchPriority]);

  return null;
}

