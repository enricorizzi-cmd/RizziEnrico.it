import Image from 'next/image';

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
  
  const dimensions = {
    sm: 96,
    md: 256,
    lg: 288,
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/5 p-2 ${className}`}>
      <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
        <Image
          src={photoSrc}
          alt={alt}
          width={dimensions[size]}
          height={dimensions[size]}
          className="w-full h-full object-cover"
          priority
          unoptimized={photoSrc === '/enrico-rizzi.jpg'} // Temporaneo: skip optimization per foto grande (15MB)
          onError={(e) => {
            // Fallback a placeholder se immagine non carica
            const target = e.target as HTMLImageElement;
            if (target?.parentElement) {
              target.style.display = 'none';
              target.parentElement.innerHTML = `
                <div class="w-full h-full bg-gray-200 flex items-center justify-center rounded-full">
                  <span class="font-bold text-[var(--color-primary)] font-heading ${
                    size === 'lg' ? 'text-6xl' : size === 'md' ? 'text-5xl' : 'text-3xl'
                  }">ER</span>
                </div>
              `;
            }
          }}
        />
      </div>
    </div>
  );
}

