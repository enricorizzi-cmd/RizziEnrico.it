'use client';

import { useEffect } from 'react';

export default function SlideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Nascondi solo elementi di layout (header/footer/banner/widget), non il main contenuto
    const style = document.createElement('style');
    style.textContent = `
      header,
      footer,
      nav,
      .skip-to-content,
      .cookie-banner,
      .workshop-banner,
      .client-widgets,
      .whatsapp,
      [id*="cookie"],
      [id*="banner"],
      [class*="cookie"],
      [class*="banner"] {
        display: none !important;
        visibility: hidden !important;
      }

      /* Rimuovi padding e margin dal body e imposta fullscreen */
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        width: 100vw !important;
        height: 100vh !important;
        background: #000 !important;
      }

      /* Assicura che il main non abbia padding */
      main {
        padding: 0 !important;
        margin: 0 !important;
        padding-top: 0 !important;
        background: #000 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup: rimuovi lo stile quando il componente viene smontato
      document.head.removeChild(style);
    };
  }, []);

  return <>{children}</>;
}

