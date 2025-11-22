import SectionTitle from '@/components/SectionTitle';
import Accordion from '@/components/Accordion';

export default function HomeFAQ() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionTitle
                    title="Domande Frequenti"
                    description="Risposte alle domande più comuni sulla consulenza PMI"
                    centered
                />
                <div className="max-w-3xl mx-auto">
                    <Accordion items={[
                        {
                            question: 'Quanto costa una consulenza aziendale per PMI venete?',
                            answer: 'I miei interventi partono a partire da 700€. Il primo check-up di 60 minuti su Zoom o 90 minuti in presenza è gratuito.'
                        },
                        {
                            question: 'Come posso aumentare il fatturato della mia azienda in Veneto?',
                            answer: 'Lavoriamo su organizzazione, KPI e controllo di gestione. In 90 giorni mettiamo ordine su ruoli e numeri, in 6 mesi vediamo risultati concreti su fatturato, marginalità e tempi di consegna.'
                        },
                        {
                            question: 'Come può una PMI veneta migliorare la produttività dei dipendenti senza assumere altre persone?',
                            answer: 'Definiamo mansionari chiari, introduciamo KPI di produttività e riunioni brevi a numeri. In questo modo ogni reparto sa cosa deve fare, cosa misurare e con quale obiettivo. I dipendenti sanno cosa fare e perché, aumentando naturalmente la produttività.'
                        },
                        {
                            question: 'Fate consulenza anche per aziende familiari venete?',
                            answer: 'Sì, ho particolare esperienza con aziende familiari venete. Ti aiuto a gestire meglio il personale, organizzare i processi e, se necessario, gestire il passaggio generazionale. Il metodo si adatta perfettamente alle specificità delle aziende familiari.'
                        },
                        {
                            question: 'Consulente aziendale Padova, Venezia, Rovigo: fate interventi anche fuori Veneto?',
                            answer: 'Opero principalmente in Veneto (Venezia, Padova, Rovigo) ma posso valutare interventi in altre regioni del Nord Italia su valutazione caso per caso.'
                        },
                        {
                            question: 'Quanto tempo serve per vedere risultati concreti?',
                            answer: 'In 90 giorni mettiamo ordine con ruoli chiari, controllo di gestione e processi definiti. In 6 mesi vedi i numeri concreti: aumento fatturato, miglioramento produttività dipendenti, organizzazione efficace. Ogni intervento è personalizzato, quindi i tempi possono variare in base alla complessità della tua azienda.'
                        }
                    ]} />
                </div>
            </div>
        </section>
    );
}
