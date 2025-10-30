import Link from 'next/link';

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
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-[var(--color-primary)] text-white hover:opacity-90 focus:ring-[var(--color-primary)]',
    secondary: 'bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white focus:ring-[var(--color-primary)]',
    link: 'text-[var(--color-primary)] hover:underline',
  };

  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    base: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

