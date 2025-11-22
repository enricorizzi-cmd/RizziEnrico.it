import SectionTitle from '@/components/SectionTitle';
import Testimonial from '@/components/Testimonial';

export default function HomeTestimonials() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionTitle
                    title="Testimonianze: Cosa Dicono i Clienti che Hanno Implementato il Metodo"
                    description="PMI venete che hanno ottenuto risultati concreti con organizzazione, KPI e metodo strutturato."
                    centered
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {[
                        {
                            quote: 'Prima rincorrevamo le urgenze. Con ruoli chiari, riunioni a KPI (Indicatori Chiave di Prestazione) e un cruscotto semplice, le consegne sono puntuali e il team sa cosa contare e quando.',
                            authorName: 'Direttore Commerciale',
                            role: 'Distribuzione ricambi',
                            location: 'Padova',
                            result: '+25% fatturato, -30% tempi consegna',
                        },
                        {
                            quote: 'La pianificazione settimanale e i KPI di efficienza ci hanno tolto il caos. Oggi sappiamo dove intervenire ogni lunedì mattina.',
                            authorName: 'Responsabile Produzione',
                            role: 'Alimentare',
                            location: 'Venezia',
                            result: 'Efficienza +20%, tempi morti -40%',
                        },
                        {
                            quote: 'Il passaggio generazionale non è più un tabù: mansionari, obiettivi e riunioni brevi ci hanno dato continuità e risultati.',
                            authorName: 'Amministratore',
                            role: 'Lattoneria & Coperture',
                            location: 'Rovigo',
                            result: 'Continuità operativa garantita',
                        },
                        {
                            quote: 'Agenda interventi, priorità e feedback post-servizio: tempi morti giù e più soddisfazione clienti. Finalmente misuriamo la qualità.',
                            authorName: 'Service Manager',
                            role: 'Impianti clima/refrigerazione',
                            location: 'Padova',
                            result: 'Soddisfazione clienti +15%',
                        },
                    ].map((testimonial, index) => (
                        <Testimonial key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
}
