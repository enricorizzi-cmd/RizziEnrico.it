'use client';

import Link from 'next/link';
import { trackEvent } from './Analytics';

interface CTAProps {
  href: string;
  variant?: 'primary' | 'secondary' | 'link';
  size?: 'small' | 'base' | 'large';
  children: React.ReactNode;
  className?: string;
}

export default function CTA({
  href,
  variant = 'primary',
  size = 'base',
  children,
  className = '',
}: CTAProps) {
  const handleClick = () => {
    trackEvent('cta_click', {
      location: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
      text: typeof children === 'string' ? children : 'CTA',
      href: href,
    });
  };

  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-[var(--color-primary)]',
    secondary: 'bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:ring-[var(--color-primary)]',
    link: 'text-[var(--color-primary)] hover:underline hover:text-[var(--color-primary-dark)]',
  };

  const sizeClasses = {
    small: 'px-4 py-2 text-sm min-h-[44px]',
    base: 'px-6 py-3 text-base min-h-[48px]',
    large: 'px-8 py-4 text-lg min-h-[56px]',
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </Link>
  );
}

