'use client';

interface IPBadgeProps {
  variant?: 'default' | 'small' | 'inline';
  className?: string;
}

export default function IPBadge({ variant = 'default', className = '' }: IPBadgeProps) {
  const baseClasses = 'inline-flex items-center gap-1.5 font-semibold';
  
  if (variant === 'small') {
    return (
      <span className={`${baseClasses} text-xs px-2 py-0.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded ${className}`}>
        <span>i-Profile</span>
      </span>
    );
  }
  
  if (variant === 'inline') {
    return (
      <span className={`${baseClasses} text-sm text-[var(--color-primary)] ${className}`}>
        i-Profile
      </span>
    );
  }

  return (
    <span className={`${baseClasses} text-sm px-3 py-1.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/80 text-white rounded-lg shadow-sm ${className}`}>
      <span>⚡</span>
      <span>i-Profile</span>
      <span className="text-xs opacity-90">inside</span>
    </span>
  );
}

