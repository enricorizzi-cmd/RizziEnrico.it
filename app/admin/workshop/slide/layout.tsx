'use client';

import { useEffect } from 'react';

export default function SlideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Nascondi completamente tutti gli elementi del sito tranne le slide
    const style = document.createElement('style');
    style.id = 'slide-isolation-style';
    style.textContent = `
      /* Nascondi header, footer, nav */
      header,
      footer,
      nav,
      .skip-to-content {
        display: none !important;
        visibility: hidden !important;
      }

      /* Nascondi banner e cookie */
      [id*="cookie"],
      [id*="banner"],
      [class*="cookie"],
      [class*="banner"],
      [class*="Cookie"],
      [class*="Banner"] {
        display: none !important;
        visibility: hidden !important;
      }

      /* Nascondi FAB buttons - WhatsApp e Chatbot */
      [class*="fixed"][class*="bottom"]:not(#slide-root):not(#slide-root *) {
        display: none !important;
        visibility: hidden !important;
      }
      
      /* Nascondi specificamente i widget */
      [class*="fixed"][class*="bottom-4"],
      [class*="fixed"][class*="bottom-6"],
      [class*="z-50"]:not(#slide-root):not(#slide-root *) {
        display: none !important;
        visibility: hidden !important;
      }

      /* Nascondi ClientWidgets container */
      [class*="client-widgets"],
      [class*="ClientWidgets"] {
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
        position: fixed !important;
      }

      /* Assicura che il main non abbia padding e sia fullscreen */
      main {
        padding: 0 !important;
        margin: 0 !important;
        padding-top: 0 !important;
        background: #000 !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        overflow: hidden !important;
      }

      /* Assicura che #slide-root sia visibile e fullscreen */
      #slide-root {
        display: block !important;
        visibility: visible !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 1 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup: rimuovi lo stile quando il componente viene smontato
      const existingStyle = document.getElementById('slide-isolation-style');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  return <>{children}</>;
}

