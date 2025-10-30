import Image from 'next/image';

interface LogoERProps {
  className?: string;
  variant?: 'default' | 'footer';
}

export default function LogoER({ className = '', variant = 'default' }: LogoERProps) {
  // Prova a caricare logo personalizzato, fallback a testo
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-[var(--color-primary)] font-heading leading-none">
          ER
        </span>
        <span className={`text-[var(--color-text)] font-medium hidden sm:block ${
          variant === 'footer' ? 'text-xs' : 'text-xs'
        }`}>
          Enrico Rizzi
        </span>
      </div>
      {/* Logo personalizzato se disponibile - nascosto per ora, attiva se hai logo ER */}
      {false && (
        <Image
          src="/logo-enrico-rizzi.png"
          alt="Enrico Rizzi"
          width={120}
          height={40}
          className="h-8 w-auto"
          priority
        />
      )}
    </div>
  );
}


