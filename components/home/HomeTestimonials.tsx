'use client';

import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
export default function HomeTestimonials() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section className="py-20 bg-[var(--color-bg)] relative overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <SectionTitle
                    title="Cosa Dicono gli Imprenditori Veneti"
                    description="Risultati concreti ottenuti da chi ha scelto di mettere ordine nella propria azienda."
                    centered
                />
                <div
                    ref={ref}
                    className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                >
                    {[
                        {
                            quote: "Finalmente ho capito dove perdevo margini. In 6 mesi abbiamo recuperato il 15% di redditività.",
                            author: "Marco B.",
                            role: "Titolare Metalmeccanica, Padova",
                            rating: 5
                        },
                        {
                            quote: "I miei dipendenti ora sanno esattamente cosa fare. Meno errori, clima migliore, più produttività.",
                            author: "Elena R.",
                            role: "CEO Servizi, Venezia",
                            rating: 5
                        },
                        {
                            quote: "Il controllo di gestione mi ha salvato. Prima navigavo a vista, ora guido con i numeri.",
                            author: "Luca T.",
                            role: "Imprenditore Edile, Rovigo",
                            rating: 5
                        }
                    ].map((testimonial, index) => (
                        <Card
                            key={index}
                            title={testimonial.author}
                            variant="default"
                            className="glass-panel h-full border-transparent hover:border-[var(--color-warning)]/30 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-xl"
                        >
                            <div className="flex text-[var(--color-warning)] mb-4 text-lg">
                                {'★'.repeat(testimonial.rating)}
                            </div>
                            <p className="italic text-[var(--color-text-light)] mb-6 text-lg leading-relaxed">"{testimonial.quote}"</p>
                            <div className="mt-auto pt-4 border-t border-[var(--color-line)]/50">
                                <p className="text-sm font-semibold text-[var(--color-subtext)] uppercase tracking-wide">{testimonial.role}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
