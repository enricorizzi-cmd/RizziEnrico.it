import { generateMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';
import Accordion from '@/components/Accordion';
import JSONLD from '@/components/JSONLD';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

// BreadcrumbList schema per pagina contatti
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Contatti',
      item: `${baseUrl}/contatti`,
    },
  ],
};

export const metadata = generateMetadata({
  title: 'Check-up gratuito PMI Veneto – Contatta Enrico Rizzi, consulente aziendale | Enrico Rizzi',
  description: 'Richiedi un check-up gratuito per la tua PMI in Veneto. 60 minuti su Zoom o 90 minuti in presenza (Venezia, Padova, Rovigo). Analizziamo numeri e criticità, individuiamo dove recuperare margini e come migliorare produttività e organizzazione.',
  path: '/contatti',
  keywords: 'check-up gratuito azienda veneto, consulente aziendale contatti, prenota consulenza PMI Veneto, check-up gratuito Padova Venezia Rovigo',
});

export default function ContattiPage() {
  return (
    <>
      <JSONLD data={breadcrumbSchema} />
      <div className="py-16 bg-[var(--color-card)] min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
              Contatti - Check-up Gratuito per la Tua Azienda
            </h1>
            <p className="text-xl text-[var(--color-subtext)] mb-2">
              Scopri <strong>come aumentare il fatturato</strong> e <strong>migliorare la produttività dei dipendenti</strong>. 
              Check-up gratuito: 60 min Zoom o 90 min in presenza. Consulente aziendale Padova, Venezia, Rovigo.
            </p>
            <p className="text-lg text-[var(--color-subtext)]">
              Analizziamo insieme numeri e criticità della tua azienda. Ti mostro dove recuperare margini e come mettere ordine.
            </p>
          </div>

          {/* Local SEO */}
          <div className="bg-white rounded-[var(--radius-card)] p-6 md:p-8 border border-[var(--color-line)] mb-8">
            <h2 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-4 text-center">
              Consulente Aziendale Padova, Venezia, Rovigo
            </h2>
            <p className="text-[var(--color-subtext)] mb-4 text-center">
              Opero in Veneto con focus su Venezia, Padova e Rovigo. Conosco le dinamiche locali delle aziende familiari del territorio. 
              Ti aiuto a <strong>mettere ordine</strong>, <strong>aumentare il fatturato</strong> e <strong>migliorare la produttività</strong> con risultati concreti.
            </p>
            <ul className="space-y-2 mb-4 max-w-2xl mx-auto">
              <li className="flex items-start gap-2 text-sm text-[var(--color-text)]">
                <span className="text-[var(--color-primary)]">•</span>
                <span>Incontri in presenza (Venezia-Padova-Rovigo)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[var(--color-text)]">
                <span className="text-[var(--color-primary)]">•</span>
                <span>Check-up gratuito: 60' Zoom o 90' in presenza</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[var(--color-text)]">
                <span className="text-[var(--color-primary)]">•</span>
                <span>Esperienza su manifatturiero, servizi, commercio</span>
              </li>
            </ul>
            <div className="max-w-xl mx-auto">
              <Accordion items={[
                {
                  question: 'Quanto costa una consulenza aziendale per PMI in Veneto?',
                  answer: 'Di solito una consulenza aziendale per PMI in Veneto parte da circa 1.200 € per interventi mirati e da 2.500 €/mese per consulenze continuative. Nel mio caso, partiamo sempre da un check-up gratuito di 60 minuti su Zoom o 90 minuti in presenza (Venezia-Padova-Rovigo) per capire se e come posso davvero aiutarti. Poi definiamo un piano con obiettivi, durata e investimento chiaro.',
                },
                {
                  question: 'In quanto tempo una PMI vede risultati concreti dalla consulenza?',
                  answer: 'Una PMI ben coinvolta inizia a vedere ordine organizzativo già entro 90 giorni e risultati numerici entro 6 mesi. Con il metodo in 5 step lavoriamo prima su ruoli e processi, poi su KPI e persone. Questo fa sì che in pochi mesi si vedano miglioramenti su fatturato, marginalità, tempi di consegna e produttività dei dipendenti.',
                },
                {
                  question: 'Il tuo metodo funziona anche per aziende familiari venete?',
                  answer: 'Sì, il metodo è pensato proprio per aziende familiari venete che sono cresciute "a sentimento" e ora hanno bisogno di struttura. Lavoro spesso su passaggi generazionali, conflitti tra soci, ruoli non chiari tra famiglia e manager. Con ruoli definiti, KPI e processi condivisi diventa più semplice gestire sia la famiglia che l\'azienda.',
                },
                {
                  question: 'Serve già avere KPI e controllo di gestione per iniziare?',
                  answer: 'No, non serve avere KPI strutturati per iniziare il percorso. Molte PMI con cui lavoro partono da zero o da fogli Excel molto artigianali. Nel metodo c\'è una fase dedicata alla definizione di 12–15 KPI chiave e alla creazione di un cruscotto semplice, leggibile e utile nelle riunioni.',
                },
                {
                  question: 'Fai consulenza anche fuori da Veneto?',
                  answer: 'Sì, posso valutare percorsi di consulenza anche fuori dal Veneto, soprattutto nel Nord Italia. Opero principalmente fra Venezia, Padova e Rovigo, ma per progetti strutturati possiamo organizzare una parte di lavoro da remoto e alcune giornate in presenza in azienda.',
                },
                {
                  question: 'Quanta disponibilità di tempo serve all\'imprenditore per lavorare con te?',
                  answer: 'In media servono 2–3 ore a settimana dedicate alla consulenza e all\'implementazione interna. Non è un corso da seguire "quando hai tempo": lavoriamo insieme su problemi reali, documentiamo processi, introduciamo KPI e rivediamo le priorità. Senza un minimo di tempo e di focus dell\'imprenditore il metodo non funziona.',
                },
              ]} />
            </div>
          </div>

          <div className="bg-white rounded-[var(--radius-card)] p-8 md:p-12 shadow-md">
            <ContactForm />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--color-subtext)] mb-4">
              Preferisci contattarmi direttamente?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/393475290564"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 7.01c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Scrivimi su WhatsApp
              </a>
              <a
                href="mailto:info@rizzienrico.it?subject=Richiesta informazioni consulenza PMI&body=Buongiorno Enrico,%0D%0A%0D%0AVorrei ricevere maggiori informazioni sulla consulenza per la mia PMI.%0D%0A%0D%0ACordiali saluti"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Invia una email
              </a>
            </div>
            <p className="text-xs text-[var(--color-subtext)] mt-4">
              Email: <a href="mailto:info@rizzienrico.it" className="text-[var(--color-primary)] hover:underline">info@rizzienrico.it</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

