import Link from 'next/link';
import CTA from './CTA';

interface HeroProps {
  h1: string;
  subtitle: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  proofStrip?: {
    logos?: string[];
    stats?: Array<{ label: string; value: string }>;
  };
}

export default function Hero({
  h1,
  subtitle,
  primaryCTA,
  secondaryCTA,
  proofStrip,
}: HeroProps) {
  return (
    <section className="bg-gradient-to-b from-[var(--color-bg)] to-[var(--color-card)] py-16 md:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-6 leading-tight">
            {h1}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-subtext)] mb-8 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <CTA href={primaryCTA.href} variant="primary" size="large">
              {primaryCTA.text}
            </CTA>
            {secondaryCTA && (
              <CTA href={secondaryCTA.href} variant="secondary" size="large">
                {secondaryCTA.text}
              </CTA>
            )}
          </div>

          {proofStrip && (
            <div className="mt-12 pt-8 border-t border-[var(--color-line)]">
              {proofStrip.stats && (
                <div className="grid grid-cols-3 gap-8 mb-8">
                  {proofStrip.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] font-heading mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-[var(--color-subtext)]">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {proofStrip.logos && (
                <div className="flex items-center justify-center gap-8 flex-wrap opacity-60">
                  {proofStrip.logos.map((logo, index) => (
                    <div
                      key={index}
                      className="text-xs text-[var(--color-subtext)] font-medium"
                    >
                      {logo}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

