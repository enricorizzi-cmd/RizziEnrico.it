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
    { href: '/case-study', label: 'Case Study' },
    { href: '/risorse', label: 'Risorse' },
    { href: '/blog', label: 'Blog' },
    { href: '/eventi', label: 'Eventi' },
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
                className="block px-4 py-3 text-lg font-medium text-[var(--color-text)] hover:bg-[var(--color-card)] rounded-md transition-colors"
                onClick={onClose}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contatti"
              className="block px-4 py-3 text-lg font-semibold bg-[var(--color-primary)] text-white rounded-md text-center hover:opacity-90 transition-opacity"
              onClick={onClose}
            >
              Prenota
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

