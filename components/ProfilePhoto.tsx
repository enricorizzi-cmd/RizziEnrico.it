'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProfilePhotoProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ProfilePhoto({
  src,
  alt = 'Enrico Rizzi',
  size = 'md',
  className = '',
}: ProfilePhotoProps) {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48 md:w-64 md:h-64',
    lg: 'w-72 h-72',
  };

  // Default: usa foto Enrico se disponibile
  const photoSrc = src || '/enrico-rizzi.jpg';
  const [imageError, setImageError] = useState(false);
  
  const dimensions = {
    sm: 96,
    md: 256,
    lg: 288,
  };

  // Se errore caricamento, mostra placeholder
  if (imageError) {
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/5 p-2 ${className}`}>
        <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          <span className={`font-bold text-[var(--color-primary)] font-heading ${
            size === 'lg' ? 'text-6xl' : size === 'md' ? 'text-5xl' : 'text-3xl'
          }`}>
            ER
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/5 p-2 ${className}`}>
      <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
        <Image
          src={photoSrc}
          alt={alt}
          width={dimensions[size]}
          height={dimensions[size]}
          className="w-full h-full object-cover"
          priority={size === 'lg' || size === 'md'} // Solo per foto principali
          loading={size === 'sm' ? 'lazy' : undefined}
          quality={85}
          sizes={size === 'sm' ? '96px' : size === 'md' ? '(max-width: 768px) 192px, 256px' : '288px'}
          onError={() => setImageError(true)}
        />
      </div>
    </div>
  );
}

