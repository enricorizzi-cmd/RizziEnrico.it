'use client';

import { useEffect } from 'react';

export default function SlideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Nascondi tutti gli elementi del layout principale, mostrando solo #slide-root
    const style = document.createElement('style');
    style.textContent = `
      /* Nascondi tutto tranne il container delle slide e il main che lo contiene */
      body > *:not(#slide-root):not(main) {
        display: none !important;
        visibility: hidden !important;
      }
      /* Dentro il main lascia solo #slide-root */
      main > *:not(#slide-root) {
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
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
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

