'use client';

import CTA from './CTA';
import IPBadge from './IPBadge';

interface IPPackage {
  id: string;
  name: string;
  subtitle: string;
  price?: string;
  priceNote?: string;
  includes: string[];
  cta: {
    text: string;
    href: string;
  };
  popular?: boolean;
}

interface IPPackagesProps {
  packages: IPPackage[];
}

export default function IPPackages({ packages }: IPPackagesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className={`bg-white rounded-[var(--radius-card)] p-6 border-2 ${
            pkg.popular
              ? 'border-[var(--color-primary)] shadow-lg'
              : 'border-[var(--color-line)]'
          } flex flex-col`}
        >
          {pkg.popular && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[var(--color-primary)] text-white text-xs font-semibold rounded-full">
                Più Popolare
              </span>
            </div>
          )}
          
          <div className="mb-4">
            <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-1">
              {pkg.name}
            </h3>
            <p className="text-sm text-[var(--color-subtext)] mb-4">
              {pkg.subtitle}
            </p>
            {pkg.price && (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[var(--color-primary)]">
                  {pkg.price}
                </span>
                {pkg.priceNote && (
                  <span className="text-sm text-[var(--color-subtext)]">
                    {pkg.priceNote}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex-1 mb-6">
            <h4 className="font-semibold text-sm text-[var(--color-text)] mb-3">
              Cosa include:
            </h4>
            <ul className="space-y-2">
              {pkg.includes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-[var(--color-text)]">
                  <svg className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <CTA href={pkg.cta.href} variant="primary" size="base" className="w-full">
            {pkg.cta.text}
          </CTA>
        </div>
      ))}
    </div>
  );
}

