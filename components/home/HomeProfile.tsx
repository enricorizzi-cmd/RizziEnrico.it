'use client';

import CTA from '@/components/CTA';
import IPBadge from '@/components/IPBadge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HomeProfile() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section className="py-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white overflow-hidden relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div
                    ref={ref}
                    className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <IPBadge variant="inline" className="text-white bg-white/20 backdrop-blur-sm border-white/30" />
                        <span className="text-sm opacity-90 font-medium tracking-wide uppercase">Prodotto di punta</span>
                    </div>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight">
                        Scopri il tuo profilo attitudinale
                    </h2>
                    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                        Prendi decisioni sulle persone con più dati e meno rischi.
                        La persona giusta nel posto giusto non è fortuna: è metodo.
                    </p>
                    <CTA href="/i-profile" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100 border-none shadow-lg hover:shadow-xl hover:-translate-y-1">
                        Scopri i-Profile →
                    </CTA>
                </div>
            </div>
        </section>
    );
}
