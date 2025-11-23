'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useRef, useState } from 'react';

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
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const baseClasses = 'relative bg-white/90 backdrop-blur-sm rounded-[var(--radius-card)] overflow-hidden transition-all duration-300 hover:shadow-xl border border-[var(--color-line)] hover:border-[var(--color-primary)]/20 hover:-translate-y-1 group';

  const content = (
    <>
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(124, 58, 237, 0.1), transparent 40%)`,
        }}
      />
      {image && (
        <div className="aspect-video bg-gray-200 relative overflow-hidden">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6 relative z-10">
        <h3 className="font-heading text-xl font-semibold text-[var(--color-text)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
          {title}
        </h3>
        <div className="text-[var(--color-subtext)]">{children}</div>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={divRef as any}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${baseClasses} ${className} block hover:scale-[1.02] transition-transform`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${baseClasses} ${className}`}
    >
      {content}
    </div>
  );
}

