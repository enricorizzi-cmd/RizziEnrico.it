export default function SlideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style jsx global>{`
        /* Nascondi tutti gli elementi del layout principale */
        header,
        footer,
        nav,
        .skip-to-content,
        [id="main-content"],
        [class*="workshop"],
        [class*="cookie"],
        [class*="widget"],
        [id*="widget"],
        [id*="banner"] {
          display: none !important;
          visibility: hidden !important;
        }
        
        /* Rimuovi padding e margin dal body */
        body {
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          position: fixed !important;
          width: 100vw !important;
          height: 100vh !important;
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
        }
        
        /* Nascondi eventuali elementi aggiuntivi */
        aside,
        [role="banner"],
        [role="contentinfo"],
        [role="complementary"] {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  );
}

