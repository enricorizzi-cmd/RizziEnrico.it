'use client';

import ContactForm from '@/components/ContactForm';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HomeContact() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section className="py-20 bg-[var(--color-bg-secondary)] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-primary)]/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div
                    ref={ref}
                    className={`max-w-2xl mx-auto glass-panel rounded-[2rem] p-8 md:p-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                >
                    <h2 className="text-3xl font-bold text-center mb-4 font-heading">
                        Richiedi Check-up Gratuito
                    </h2>
                    <p className="text-center text-[var(--color-subtext)] mb-8 text-lg">
                        Compila il form e ti ricontatto entro 24 ore per fissare l'appuntamento
                    </p>
                    <div className="bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-xl p-6 mb-8">
                        <h3 className="font-bold text-[var(--color-success)] mb-2 flex items-center gap-2">
                            <span>🎁</span> Cosa include il Check-up Gratuito:
                        </h3>
                        <ul className="space-y-2 text-sm text-[var(--color-text)]">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--color-success)]">✓</span> Analisi preliminare dei numeri
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--color-success)]">✓</span> Individuazione colli di bottiglia
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--color-success)]">✓</span> Piano d'azione immediato
                            </li>
                        </ul>
                    </div>
                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
