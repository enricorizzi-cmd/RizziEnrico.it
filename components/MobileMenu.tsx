'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Blocca lo scroll del body quando il menu è aperto
  useEffect(() => {
    if (isOpen) {
      // Salva la posizione corrente dello scroll
      const scrollY = window.scrollY;
      // Blocca lo scroll del body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        // Ripristina lo scroll quando il menu si chiude
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/metodo', label: 'Metodo' },
    { href: '/servizi', label: 'Servizi' },
    { href: '/digitalizzazione-pmi-ai', label: 'Digitalizzazione & AI' },
    { href: '/i-profile', label: 'i-Profile' },
    { href: '/case-study', label: 'Case Study' },
    { href: '/risorse', label: 'Risorse' },
    { href: '/calcolatore-investimento', label: 'Calcolatore' },
    { href: '/blog', label: 'Blog' },
    { href: '/eventi', label: 'Eventi' },
    { href: '/chi-sono', label: 'Chi sono' },
    { href: '/contatti', label: 'Contatti' },
  ];

  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col">
      {/* Mobile Header Banner */}
      <div className="bg-[var(--color-primary)] text-white py-2 px-4 flex-shrink-0">
        <div className="container mx-auto flex items-center justify-between text-xs">
          <span className="font-medium">Consulente OSM per PMI</span>
          <a 
            href="https://wa.me/393475290564" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:opacity-90 transition-opacity"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 7.01c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
      
      {/* Header fisso con pulsante chiusura */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--color-line)] bg-white flex-shrink-0">
        <span className="text-lg font-semibold text-[var(--color-text)]">Menu</span>
        <button
          onClick={onClose}
          className="p-2 rounded-md text-[var(--color-text)] hover:bg-[var(--color-card)] transition-colors"
          aria-label="Chiudi menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Contenuto scrollabile */}
      <nav 
        className="flex-1 overflow-y-auto container mx-auto px-4 py-6" 
        aria-label="Menu mobile"
        onClick={(e) => {
          // Chiudi solo se si clicca sullo sfondo, non sui link
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="space-y-6">
          {/* Navigazione */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text)] uppercase tracking-wide mb-3 px-4">
              Navigazione
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-3 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-card)] rounded-md transition-colors min-h-[48px] flex items-center ${
                      item.href === '/contatti' ? 'font-semibold bg-[var(--color-primary)] text-white text-center hover:opacity-90' : ''
                    }`}
                    onClick={onClose}
                  >
                    {item.href === '/contatti' ? 'Prenota' : item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Risorse */}
          <div className="pt-4 border-t border-[var(--color-line)]">
            <h3 className="text-sm font-semibold text-[var(--color-text)] uppercase tracking-wide mb-3 px-4">
              Risorse
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/risorse"
                  className="block px-4 py-3 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-card)] rounded-md transition-colors min-h-[48px] flex items-center"
                  onClick={onClose}
                >
                  KPI Pack
                </Link>
              </li>
              <li>
                <Link
                  href="/calcolatore-investimento"
                  className="block px-4 py-3 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-card)] rounded-md transition-colors min-h-[48px] flex items-center"
                  onClick={onClose}
                >
                  Calcolatore Investimento
                </Link>
              </li>
            </ul>
          </div>

          {/* Contatti */}
          <div className="pt-4 border-t border-[var(--color-line)]">
            <h3 className="text-sm font-semibold text-[var(--color-text)] uppercase tracking-wide mb-3 px-4">
              Contatti
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contatti"
                  className="block px-4 py-3 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-card)] rounded-md transition-colors min-h-[48px] flex items-center"
                  onClick={onClose}
                >
                  Prenota un incontro
                </Link>
              </li>
              <li>
                <a
                  href="tel:+393475290564"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-card)] rounded-md transition-colors min-h-[48px]"
                  onClick={onClose}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+39 347 529 0564</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/393475290564"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-card)] rounded-md transition-colors min-h-[48px]"
                  onClick={onClose}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 7.01c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-[var(--color-line)]">
              <h4 className="text-xs font-semibold text-[var(--color-text)] mb-3 px-4">Seguimi su</h4>
              <div className="flex items-center gap-4 px-4">
                <a
                  href="https://www.facebook.com/enrico.rizzi.12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                  aria-label="Facebook"
                  onClick={onClose}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/enricorizzi_osm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                  aria-label="Instagram"
                  onClick={onClose}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/enricorizzi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                  aria-label="LinkedIn"
                  onClick={onClose}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Link Legali */}
          <div className="pt-4 border-t border-[var(--color-line)]">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="block px-4 py-2 text-sm text-gray-600 hover:text-[var(--color-text)] hover:bg-[var(--color-card)] rounded-md transition-colors"
                  onClick={onClose}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie"
                  className="block px-4 py-2 text-sm text-gray-600 hover:text-[var(--color-text)] hover:bg-[var(--color-card)] rounded-md transition-colors"
                  onClick={onClose}
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/termini"
                  className="block px-4 py-2 text-sm text-gray-600 hover:text-[var(--color-text)] hover:bg-[var(--color-card)] rounded-md transition-colors"
                  onClick={onClose}
                >
                  Termini di servizio
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

