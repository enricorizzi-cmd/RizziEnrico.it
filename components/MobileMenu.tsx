'use client';

import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const navItems = [
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

  if (!isOpen) return null;

  return (
    <div
      className="lg:hidden fixed inset-0 z-50 bg-white mt-16"
      onClick={onClose}
    >
      <nav className="container mx-auto px-4 py-8" aria-label="Menu mobile">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-3 text-lg font-medium text-[var(--color-text)] hover:bg-[var(--color-card)] rounded-md transition-colors min-h-[48px] flex items-center ${
                  item.href === '/contatti' ? 'font-semibold bg-[var(--color-primary)] text-white text-center hover:opacity-90' : ''
                }`}
                onClick={onClose}
              >
                {item.href === '/contatti' ? 'Prenota' : item.label}
              </Link>
            </li>
          ))}
          <li className="pt-4 border-t border-[var(--color-line)]">
            <a
              href="tel:+393475290564"
              className="flex items-center gap-3 px-4 py-3 text-lg font-semibold text-[var(--color-primary)] hover:bg-[var(--color-card)] rounded-md transition-colors min-h-[48px]"
              onClick={onClose}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>+39 347 529 0564</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

