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
                className={`block px-4 py-3 text-lg font-medium text-[var(--color-text)] hover:bg-[var(--color-card)] rounded-md transition-colors ${
                  item.href === '/contatti' ? 'font-semibold bg-[var(--color-primary)] text-white text-center hover:opacity-90' : ''
                }`}
                onClick={onClose}
              >
                {item.href === '/contatti' ? 'Prenota' : item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

