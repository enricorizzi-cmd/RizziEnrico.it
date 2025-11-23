'use client';

import Image from 'next/image';
import CTA from './CTA';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/60 rounded-full mb-6 shadow-sm">
                <span className="text-sm font-bold text-[var(--color-primary)] tracking-wide uppercase">{badge}</span>
              </div>
            )}

            <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-[var(--color-text)] mb-6 leading-tight">
              {h1.split(' ').map((word, i) => (
                i < 3 ? <span key={i}>{word} </span> : <span key={i} className="text-gradient">{word} </span>
              ))}
            </h1>

            <p className="text-xl md:text-2xl text-[var(--color-subtext)] mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <CTA
                href={primaryCTA.href}
                variant="primary"
                size="large"
                className="min-h-[56px] text-lg font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {primaryCTA.text}
              </CTA>
              {secondaryCTA && (
                <CTA
                  href={secondaryCTA.href}
                  variant="secondary"
                  size="large"
                  className="min-h-[56px] backdrop-blur-sm bg-white/30 border-white/50 hover:bg-white/50"
                >
                  {secondaryCTA.text}
                </CTA>
              )}
            </div>

            <p className="text-sm text-[var(--color-subtext)] mb-8 font-medium">
              <span className="inline-block mr-4">🎁 Check-up Gratuito</span>
              <span className="inline-block mr-4">⏱️ 60 min Zoom</span>
              <span className="inline-block">📍 O in presenza</span>
            </p>

            {proofStrip && proofStrip.stats && (
              <div className="grid grid-cols-3 gap-6 border-t border-[var(--color-line)]/50 pt-8 mt-8">
                {proofStrip.stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] font-heading mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-[var(--color-subtext)] font-medium uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Visual Content (Glass Panel) */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
              {/* Decorative Elements behind image */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-warning)]/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[var(--color-primary)]/20 rounded-full blur-2xl"></div>

              {/* Glass Container for Image/Video */}
              <div className="glass-panel p-4 rounded-[2rem] rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-auto lg:h-[500px]">
                  {image ? (
                    <Image
                      src={image}
                      alt="Enrico Rizzi Consulente"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : videoUrl ? (
                    <iframe
                      src={videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : null}
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 glass-panel p-4 rounded-2xl shadow-xl animate-float animation-delay-2000 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--color-success)]/10 rounded-full flex items-center justify-center text-xl">
                    📈
                  </div>
                  <div>
                    <div className="text-xs text-[var(--color-subtext)]">Risultati</div>
                    <div className="font-bold text-[var(--color-text)]">Misurabili</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
