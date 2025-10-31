import Image from 'next/image';

interface LogoERProps {
  className?: string;
  variant?: 'default' | 'footer';
}

export default function LogoER({ className = '', variant = 'default' }: LogoERProps) {
  // Mostra solo il logo personalizzato
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/logo-enrico-rizzi.png"
        alt="Enrico Rizzi"
        width={variant === 'footer' ? 120 : 120}
        height={variant === 'footer' ? 40 : 40}
        className={variant === 'footer' ? 'h-8 w-auto' : 'h-8 w-auto'}
        priority
        quality={90}
        sizes="120px"
      />
    </div>
  );
}


