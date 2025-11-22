'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HomeStats() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section className="py-16 bg-[var(--color-primary)] text-white overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <div
                    ref={ref}
                    className={`grid grid-cols-2 md:grid-cols-4 gap-8 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                >
                    <div className="p-4">
                        <div className="text-4xl md:text-5xl font-bold font-heading mb-2">10+</div>
                        <div className="text-sm md:text-base opacity-90 uppercase tracking-wide font-medium">Anni di Esperienza</div>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl md:text-5xl font-bold font-heading mb-2">50+</div>
                        <div className="text-sm md:text-base opacity-90 uppercase tracking-wide font-medium">Aziende Seguite</div>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl md:text-5xl font-bold font-heading mb-2">15%</div>
                        <div className="text-sm md:text-base opacity-90 uppercase tracking-wide font-medium">Crescita Media</div>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl md:text-5xl font-bold font-heading mb-2">100%</div>
                        <div className="text-sm md:text-base opacity-90 uppercase tracking-wide font-medium">Clienti Soddisfatti</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
