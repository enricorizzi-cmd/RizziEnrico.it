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

  if (src) {
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/5 p-2 ${className}`}>
        <div className="w-full h-full rounded-full overflow-hidden bg-white">
          <Image
            src={src}
            alt={alt}
            width={size === 'lg' ? 288 : size === 'md' ? 256 : 96}
            height={size === 'lg' ? 288 : size === 'md' ? 256 : 96}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
    );
  }

  // Placeholder quando foto non disponibile
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

