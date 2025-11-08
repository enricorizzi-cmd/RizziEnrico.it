import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  image?: string;
  imageAlt?: string;
  href?: string;
  footer?: ReactNode;
  className?: string;
  variant?: 'default' | 'service' | 'case' | 'blog' | 'event';
}

export default function Card({
  title,
  children,
  image,
  imageAlt,
  href,
  footer,
  className = '',
  variant = 'default',
}: CardProps) {
  const baseClasses = 'bg-[var(--color-card)] rounded-[var(--radius-card)] overflow-hidden transition-all hover:shadow-md border border-[var(--color-line)]';

  const content = (
    <>
      {image && (
        <div className="aspect-video bg-gray-200 relative overflow-hidden">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-heading text-xl font-semibold text-[var(--color-text)] mb-3">
          {title}
        </h3>
        <div className="text-[var(--color-subtext)]">{children}</div>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${className} block hover:scale-[1.02] transition-transform`}>
        {content}
      </Link>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`}>
      {content}
    </div>
  );
}

