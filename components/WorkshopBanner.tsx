'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function WorkshopBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Mostra il banner solo sulla home page
    if (pathname !== '/') {
      return;
    }

    // Controlla se il banner è stato già chiuso in questa sessione
    const dismissed = sessionStorage.getItem('workshop-banner-dismissed');
    if (!dismissed) {
      // Mostra il banner dopo un breve delay per un effetto più elegante
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Gestisci il padding del main quando il banner è visibile
  useEffect(() => {
    if (isVisible && pathname === '/') {
      document.body.classList.add('workshop-banner-visible');
      return () => {
        document.body.classList.remove('workshop-banner-visible');
      };
    }
  }, [isVisible, pathname]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('workshop-banner-dismissed', 'true');
  };

  // Non mostrare il banner se non siamo sulla home o se è stato chiuso
  if (isDismissed || pathname !== '/') return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ease-out ${
        isVisible
          ? 'translate-y-0 opacity-100 workshop-banner-visible'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <Link
        href="/workshop-12-dicembre"
        className="block w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Contenuto principale */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Icona animata */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl animate-pulse">🎯</span>
                  </div>
                  {/* Pulsazione esterna */}
                  <div className="absolute inset-0 rounded-full bg-white/30 animate-ping opacity-75"></div>
                </div>
              </div>

              {/* Testo */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm md:text-base whitespace-nowrap">
                    Workshop Esclusivo OSM
                  </span>
                  <span className="hidden sm:inline text-sm opacity-90">
                    •
                  </span>
                  <span className="text-sm md:text-base opacity-90 truncate">
                    Automatizza la tua Azienda: AI & Digitalizzazione
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs md:text-sm opacity-80">
                  <span>📅 Venerdì 12 dicembre 2025</span>
                  <span>•</span>
                  <span>🕐 dalle ore 17.00</span>
                  <span>•</span>
                  <span className="hidden md:inline">📍 OSM Venezia</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex-shrink-0">
                <div className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-sm md:text-base whitespace-nowrap group-hover:bg-purple-50 transition-colors duration-300 shadow-md">
                  Iscriviti Ora →
                </div>
              </div>
            </div>

            {/* Pulsante chiusura */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDismiss();
              }}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-200 opacity-70 hover:opacity-100"
              aria-label="Chiudi banner"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Barra di progresso animata (opzionale, per dare un senso di urgenza discreto) */}
        <div className="h-1 bg-white/20 overflow-hidden">
          <div className="h-full bg-white/40 animate-progress-bar"></div>
        </div>
      </Link>

    </div>
  );
}

