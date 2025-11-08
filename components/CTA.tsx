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

  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-[var(--color-primary)] text-white hover:opacity-90 focus:ring-[var(--color-primary)]',
    secondary: 'bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white focus:ring-[var(--color-primary)]',
    link: 'text-[var(--color-primary)] hover:underline',
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
    >
      {children}
    </Link>
  );
}

