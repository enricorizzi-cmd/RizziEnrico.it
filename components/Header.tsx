'use client';

import { useState } from 'react';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/metodo', label: 'Metodo' },
    { href: '/servizi', label: 'Servizi' },
    { href: '/case-study', label: 'Case Study' },
    { href: '/risorse', label: 'Risorse' },
    { href: '/blog', label: 'Blog' },
    { href: '/eventi', label: 'Eventi' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--color-line)]">
      <nav className="container mx-auto px-4 lg:px-8" aria-label="Navigazione principale">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[var(--color-primary)] font-heading">
              ER
            </span>
            <span className="text-sm text-[var(--color-text)] hidden sm:inline">
              Enrico Rizzi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors rounded-md hover:bg-[var(--color-card)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contatti"
              className="ml-4 px-6 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Prenota
            </Link>
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

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}

