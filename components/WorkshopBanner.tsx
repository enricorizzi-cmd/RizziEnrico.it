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
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ease-out ${isVisible
        ? 'translate-y-0 opacity-100 workshop-banner-visible'
        : '-translate-y-full opacity-0 pointer-events-none'
        }`}
    >
      <Link
        href="/workshop-12-dicembre"
        className="block w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-2.5 sm:py-3">
          <div className="flex items-start sm:items-center justify-between gap-2 sm:gap-4">
            {/* Contenuto principale */}
            <div className="flex items-start sm:items-center gap-2 sm:gap-4 flex-1 min-w-0">
              {/* Icona animata */}
              <div className="flex-shrink-0 pt-0.5 sm:pt-0">
                <div className="relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <span className="text-base sm:text-xl animate-pulse">🎯</span>
                  </div>
                  {/* Pulsazione esterna */}
                  <div className="absolute inset-0 rounded-full bg-white/30 animate-ping opacity-75"></div>
                </div>
              </div>

              {/* Testo */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-bold text-xs sm:text-sm md:text-base whitespace-nowrap">
                    Workshop Esclusivo OSM
                  </span>
                  <span className="hidden sm:inline text-sm opacity-90">
                    •
                  </span>
                  <span className="text-xs sm:text-sm md:text-base opacity-90 line-clamp-1 sm:truncate">
                    AI in Azienda: Più Tempo, Più Clienti, Meno Sprechi
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1 text-[10px] sm:text-xs md:text-sm opacity-80">
                  <span className="whitespace-nowrap">📅 Venerdì 12 dicembre 2025</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="whitespace-nowrap">🕐 16:30 - 19:00</span>
                  <span className="hidden md:inline">•</span>
                  <span className="hidden md:inline whitespace-nowrap">📍 OSM Venezia</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex-shrink-0 hidden sm:block">
                <div className="bg-white text-purple-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap group-hover:bg-purple-50 transition-colors duration-300 shadow-md">
                  Iscriviti Ora →
                </div>
              </div>
            </div>

            {/* CTA Button Mobile - mostrato solo su mobile */}
            <div className="flex-shrink-0 sm:hidden order-last">
              <div className="bg-white text-purple-600 px-2.5 py-1.5 rounded-lg font-semibold text-[10px] whitespace-nowrap group-hover:bg-purple-50 transition-colors duration-300 shadow-md">
                Iscriviti →
              </div>
            </div>

            {/* Pulsante chiusura */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDismiss();
              }}
              className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-200 opacity-70 hover:opacity-100 mt-0.5 sm:mt-0"
              aria-label="Chiudi banner"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
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

