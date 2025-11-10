import Link from 'next/link';
import Image from 'next/image';
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
  badge?: string;
  image?: string;
  videoUrl?: string;
}

export default function Hero({
  h1,
  subtitle,
  primaryCTA,
  secondaryCTA,
  proofStrip,
  badge,
  image,
  videoUrl,
}: HeroProps) {
  return (
    <section className="bg-gradient-to-b from-[var(--color-bg)] to-[var(--color-card)] py-16 md:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className={`max-w-7xl mx-auto ${image || videoUrl ? 'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center' : 'max-w-3xl text-center'}`}>
          {/* Testo */}
          <div className={image || videoUrl ? '' : 'text-center'}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-4 leading-tight">
              {h1}
            </h1>
            {badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-full mb-6">
                <span className="text-sm font-semibold text-[var(--color-primary)]">{badge}</span>
              </div>
            )}
            <p className="text-xl md:text-2xl text-[var(--color-subtext)] mb-8 leading-relaxed">
              {subtitle}
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 ${image || videoUrl ? '' : 'justify-center'} mb-6`}>
              <CTA 
                href={primaryCTA.href} 
                variant="primary" 
                size="large"
                className="min-h-[48px] md:min-h-[56px] text-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {primaryCTA.text}
              </CTA>
              {secondaryCTA && (
                <CTA href={secondaryCTA.href} variant="secondary" size="large" className="min-h-[48px] md:min-h-[56px]">
                  {secondaryCTA.text}
                </CTA>
              )}
            </div>
            <p className="text-sm text-[var(--color-subtext)] mb-8">
              🎁 Gratuito • Senza impegno • 60 min Zoom o 90 min in presenza
            </p>

            {proofStrip && (
              <div className={`mt-8 pt-6 border-t border-[var(--color-line)] ${image || videoUrl ? '' : 'text-center'}`}>
                {proofStrip.stats && (
                  <div className={`grid grid-cols-3 gap-6 ${image || videoUrl ? '' : 'mb-8'}`}>
                    {proofStrip.stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] font-heading mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs md:text-sm text-[var(--color-subtext)]">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {proofStrip.logos && (
                  <div className="flex items-center justify-center gap-8 flex-wrap opacity-60 mt-4">
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

          {/* Immagine/Video */}
          {(image || videoUrl) && (
            <div className="relative">
              {image && (
                <div className="relative rounded-[var(--radius-card)] overflow-hidden shadow-xl">
                  <Image
                    src={image}
                    alt="Enrico Rizzi consulente OSM PMI Veneto"
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                    loading="eager"
                    fetchPriority="high"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                </div>
              )}
              {videoUrl && (
                <div className="relative rounded-[var(--radius-card)] overflow-hidden shadow-xl aspect-video">
                  <iframe
                    src={videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Video presentazione Enrico Rizzi"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

