import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import CTA from '@/components/CTA';

export default function HomeServices() {
    return (
        <section className="py-16 bg-[var(--color-card)]">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionTitle
                    title="Servizi Consulenza Aziendale per Aziende Venete"
                    description="Ti aiuto a migliorare la produttività, implementare controllo di gestione e organizzare meglio la tua azienda. Output concreti, tempistiche chiare, investimento trasparente."
                    centered
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            slug: 'consulenza-pmi',
                            title: 'Consulenza PMI – Aumenta Fatturato e Organizza la Tua Azienda',
                            description: 'Supporto continuativo per crescita sostenibile. Gestione passaggio generazionale. Organizzazione completa con ruoli, KPI e processi.',
                            result: 'Risultato: PMI strutturata, team motivato, numeri in crescita.',
                            price: 'a partire da 700€',
                        },
                        {
                            slug: 'organizzazione-mansionari',
                            title: 'Organizzazione & Mansionari – Ruoli Chiari e Responsabilità Definite',
                            description: 'Standard OSM: ruoli chiari, responsabilità definite, mansionari allineati agli obiettivi.',
                            result: 'Risultato: organizzazione chiara, meno conflitti, efficienza aumentata.',
                            price: 'a partire da 700€',
                        },
                        {
                            slug: 'sviluppo-persone',
                            title: 'Sviluppo Persone & Leadership – Forma un Team Vincente',
                            description: 'Formazione mirata, coaching manageriale, team building strutturato per massimizzare il potenziale.',
                            result: 'Risultato: team motivato, competenze sviluppate, leadership efficace.',
                            price: 'a partire da 700€',
                        },
                        {
                            slug: 'kpi-controllo-gestione',
                            title: 'KPI & Controllo di Gestione – Decisioni Basate sui Numeri',
                            description: 'Dashboard mensili, alert automatici, piano di azione sugli scostamenti. Controllo semplice ma efficace.',
                            result: 'Risultato: decisioni informate, problemi individuati tempestivamente, performance migliorate.',
                            price: 'a partire da 700€',
                        },
                    ].map((service, index) => (
                        <Card
                            key={index}
                            title={service.title}
                            variant="service"
                            href={`/servizi/${service.slug}`}
                        >
                            <p className="text-sm mb-3">{service.description}</p>
                            <p className="text-sm font-semibold text-[var(--color-success)] mb-3">{service.result}</p>
                            <div className="text-lg font-bold text-[var(--color-primary)] mb-3">
                                {service.price}
                            </div>
                            <p className="text-sm">
                                <Link href="/servizi" className="text-[var(--color-primary)] hover:underline font-semibold">
                                    Vedi tutti i servizi →
                                </Link>
                            </p>
                        </Card>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <CTA href="/contatti" variant="primary" size="large">
                        Quale Servizio Fa per Te? Scoprilo Gratis →
                    </CTA>
                </div>
                <div className="text-center mt-6">
                    <p className="text-sm text-[var(--color-subtext)]">
                        Non sai quale servizio fa per te?
                        <Link href="/contatti" className="text-[var(--color-primary)] hover:underline font-semibold ml-1" title="Prenota un check-up gratuito per valutare le tue esigenze">
                            Prenota un check-up gratuito
                        </Link>
                        {' '}e analizziamo insieme le tue esigenze. Oppure <Link href="/metodo" className="text-[var(--color-primary)] hover:underline font-semibold ml-1" title="Scopri il metodo OSM per organizzare la tua PMI">
                            scopri il metodo
                        </Link> che applico.
                    </p>
                </div>
            </div>
        </section>
    );
}
