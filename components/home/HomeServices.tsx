'use client';

import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import CTA from '@/components/CTA';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HomeServices() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section className="py-20 bg-[var(--color-card)] overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionTitle
                    title="Servizi Consulenza Aziendale per Aziende Venete"
                    description="Ti aiuto a migliorare la produttività, implementare controllo di gestione e organizzare meglio la tua azienda. Output concreti, tempistiche chiare, investimento trasparente."
                    centered
                />

                <div
                    ref={ref}
                    className={`bento-grid transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                >
                    {[
                        {
                            slug: 'consulenza-pmi',
                            title: 'Consulenza PMI',
                            description: 'Supporto continuativo per crescita sostenibile. Gestione passaggio generazionale. Organizzazione completa con ruoli, KPI e processi.',
                            result: 'Risultato: PMI strutturata, team motivato, numeri in crescita.',
                            price: 'a partire da 700€',
                            span: 'bento-span-2',
                            highlight: true
                        },
                        {
                            slug: 'organizzazione-mansionari',
                            title: 'Organizzazione & Mansionari',
                            description: 'Standard OSM: ruoli chiari, responsabilità definite, mansionari allineati agli obiettivi.',
                            result: 'Risultato: organizzazione chiara, meno conflitti.',
                            price: 'a partire da 700€',
                            span: '',
                            highlight: false
                        },
                        {
                            slug: 'sviluppo-persone',
                            title: 'Sviluppo Persone & Leadership',
                            description: 'Formazione mirata, coaching manageriale, team building strutturato per massimizzare il potenziale.',
                            result: 'Risultato: team motivato, leadership efficace.',
                            price: 'a partire da 700€',
                            span: '',
                            highlight: false
                        },
                        {
                            slug: 'kpi-controllo-gestione',
                            title: 'KPI & Controllo di Gestione',
                            description: 'Dashboard mensili, alert automatici, piano di azione sugli scostamenti. Controllo semplice ma efficace.',
                            result: 'Risultato: decisioni informate, performance migliorate.',
                            price: 'a partire da 700€',
                            span: 'bento-span-2',
                            highlight: true
                        },
                    ].map((service, index) => (
                        <Card
                            key={index}
                            title={service.title}
                            variant="service"
                            href={`/servizi/${service.slug}`}
                            className={`${service.span} premium-card-hover h-full ${service.highlight ? 'border-[var(--color-primary)]/30 bg-white' : ''}`}
                        >
                            <p className="text-sm mb-4 leading-relaxed opacity-80">{service.description}</p>
                            <p className="text-sm font-semibold text-[var(--color-success)] mb-4">{service.result}</p>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-line)]/50">
                                <div className="text-lg font-bold text-[var(--color-primary)]">
                                    {service.price}
                                </div>
                                <Link href={`/servizi/${service.slug}`} className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-semibold text-sm">
                                    Dettagli →
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <CTA href="/contatti" variant="primary" size="large" className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                        Quale Servizio Fa per Te? Scoprilo Gratis →
                    </CTA>
                </div>

                <div className="text-center mt-8">
                    <p className="text-sm text-[var(--color-subtext)]">
                        Non sai quale servizio fa per te?
                        <Link href="/contatti" className="text-[var(--color-primary)] hover:underline font-semibold ml-1" title="Prenota un check-up gratuito per valutare le tue esigenze">
                            Prenota un check-up gratuito
                        </Link>
                        {' '}e analizziamo insieme le tue esigenze.
                    </p>
                </div>
            </div>
        </section>
    );
}
