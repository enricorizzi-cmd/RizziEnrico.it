'use client';

import { useState } from 'react';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import OSMBadge from './OSMBadge';
import LogoER from './LogoER';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/metodo', label: 'Metodo' },
    { href: '/servizi', label: 'Servizi' },
    { href: '/i-profile', label: 'i-Profile' },
    { href: '/case-study', label: 'Case Study' },
    { href: '/risorse', label: 'Risorse' },
    { href: '/calcolatore-investimento', label: 'Calcolatore' },
    { href: '/blog', label: 'Blog' },
    { href: '/eventi', label: 'Eventi' },
    { href: '/chi-sono', label: 'Chi sono' },
    { href: '/contatti', label: 'Contatti' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[var(--color-line)] shadow-sm">
        {/* Mobile Header Banner - Solo su mobile */}
        <div className="lg:hidden bg-[var(--color-primary)] text-white py-2 px-4">
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
      <nav className="container mx-auto px-4 lg:px-8" aria-label="Navigazione principale">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <LogoER variant="default" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors rounded-md hover:bg-[var(--color-card)] ${
                  item.href === '/contatti' ? 'ml-4 px-6 bg-[var(--color-primary)] text-white font-semibold hover:opacity-90' : ''
                }`}
              >
                {item.href === '/contatti' ? 'Prenota' : item.label}
              </Link>
            ))}
            <a
              href="tel:+393475290564"
              className="ml-4 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="hidden xl:inline">+39 347 529 0564</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-[var(--color-text)] hover:bg-[var(--color-card)]"
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
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
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      </header>
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}

