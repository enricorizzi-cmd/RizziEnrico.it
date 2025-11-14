import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import CTA from '@/components/CTA';
import { format } from 'date-fns';
import { it } from 'date-fns/locale/it';

export const metadata = generateMetadata({
  title: 'Eventi & Speaking - Workshop e Webinar per PMI Venete | Enrico Rizzi',
  description: 'Eventi, workshop e interventi pubblici su organizzazione aziendale e KPI per PMI. Venezia, Padova, Rovigo, Veneto. Calendario eventi OSM aggiornato.',
  path: '/eventi',
});

// Eventi OSM reali - aggiornati da https://eventiosm.it/region/20
const events: Array<{
  slug: string;
  title: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  locationName: string;
  address: string;
  capacity?: number;
  isOnline: boolean;
  externalUrl: string;
  speaker?: string;
}> = [
  {
    slug: 'la-sanita-privata-del-futuro-padova',
    title: 'La sanità privata del futuro',
    description: 'Un evento dedicato a titolari di studi medici, dentistici e farmacie che vogliono affrontare con visione il cambiamento organizzativo, costruendo una leadership solida e un team motivato.',
    dateStart: new Date('2025-11-15T10:00:00'),
    dateEnd: new Date('2025-11-15T12:00:00'),
    locationName: 'Crowne Plaza Hotel',
    address: 'Padova',
    isOnline: false,
    externalUrl: 'https://eventiosm.it/event/2025-11-15-padova-la-sanita-privata-del-futuro',
    speaker: 'Fausto Fiorile',
  },
  {
    slug: 'imprenditore-di-successo-nel-beauty-vicenza',
    title: 'Imprenditore di Successo nel Beauty',
    description: 'Scopri le strategie e storie reali di imprenditrici che hanno trasformato la loro passione per la bellezza in imprese vincenti, grazie al metodo OSM Beauty.',
    dateStart: new Date('2025-11-17T16:30:00'),
    dateEnd: new Date('2025-11-17T18:30:00'),
    locationName: 'Hotel Viest',
    address: 'Vicenza',
    isOnline: false,
    externalUrl: 'https://eventiosm.it/event/2025-11-17-vicenza-imprenditore-di-successo-nel-beauty',
    speaker: 'Walter Greco',
  },
  {
    slug: 'imprenditore-di-successo-lendinara',
    title: 'Imprenditore di Successo',
    description: 'Ti piacerebbe costruire un gruppo di collaboratori che condividono la tua visione e ti aiutano a far crescere la tua azienda? Vieni a scoprire le AZIONI PRATICHE per attrarre le persone giuste nella tua azienda!',
    dateStart: new Date('2025-11-20T17:00:00'),
    dateEnd: new Date('2025-11-20T19:00:00'),
    locationName: 'Ex Pescheria',
    address: 'Lendinara (Rovigo)',
    isOnline: false,
    externalUrl: 'https://eventiosm.it/event/2025-11-20-lendinara-imprenditore-di-successo',
    speaker: 'Thomas Federici',
  },
  {
    slug: 'da-agente-immobiliare-a-leader-di-successo-padova',
    title: 'Da agente immobiliare a leader di successo',
    description: 'Da agente immobiliare a leader di successo: scopri come reclutare le persone giuste e come renderle produttive',
    dateStart: new Date('2025-11-20T14:30:00'),
    dateEnd: new Date('2025-11-20T16:30:00'),
    locationName: 'Four Points by Sheraton',
    address: 'Padova',
    isOnline: false,
    externalUrl: 'https://eventiosm.it/event/2025-11-20-padova-da-agente-immobiliare-a-leader-di-successo',
    speaker: 'Winston Sinibaldi',
  },
  {
    slug: 'crea-e-pianifica-la-tua-espansione-aziendale-belluno',
    title: 'Crea e Pianifica la tua Espansione Aziendale',
    description: 'Il corso che ti aiuta subito a costruire un piano concreto per la crescita della tua azienda',
    dateStart: new Date('2025-11-25T14:30:00'),
    dateEnd: new Date('2025-11-25T16:30:00'),
    locationName: 'Hotel Europa',
    address: 'Belluno',
    isOnline: false,
    externalUrl: 'https://eventiosm.it/event/2025-11-25-belluno-crea-e-pianifica-la-tua-espansione-aziendale',
    speaker: 'Michele Vitali',
  },
  {
    slug: 'edilizia-2025-vicenza',
    title: 'EDILIZIA 2025: Come Crescere in un Mercato che Cambia!',
    description: 'Sei d\'accordo con me che il mercato edile a Vicenza sta mutando gradualmente dopo grandi eventi come il 110 % e il PNRR? Occorre una nuova strategia che possa farti fare la differenza in un mercato in costante evoluzione',
    dateStart: new Date('2025-12-11T16:30:00'),
    dateEnd: new Date('2025-12-11T18:30:00'),
    locationName: 'Simal Business Center Coworking',
    address: 'Vicenza',
    isOnline: false,
    externalUrl: 'https://eventiosm.it/event/2025-12-11-vicenza-edilizia-2025-come-crescere-in-un-mercato-che-cambia',
    speaker: 'Fabio Polidori',
  },
];

export default function EventiPage() {
  return (
    <div className="py-16 bg-[var(--color-card)] min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
            Eventi & Speaking
          </h1>
          <p className="text-xl text-[var(--color-subtext)] max-w-3xl mx-auto mb-6">
            Workshop, webinar e interventi pubblici su organizzazione aziendale e KPI per PMI.
            Venezia, Padova, Rovigo, Veneto.
          </p>
          <div className="mb-8">
            <a
              href="https://eventiosm.it/region/20"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Vedi tutti gli eventi OSM Veneto →
            </a>
          </div>
        </div>

        {/* Lista Eventi */}
        {events.length > 0 ? (
          <div className="space-y-6 max-w-4xl mx-auto">
            {events.map((event) => (
            <Card
              key={event.slug}
              title={event.title}
              variant="event"
              href={event.externalUrl}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-[var(--color-subtext)]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {format(event.dateStart, 'd MMMM yyyy, HH:mm', { locale: it })} -{' '}
                    {format(event.dateEnd, 'HH:mm', { locale: it })}
                  </span>
                </div>
                {event.speaker && (
                  <div className="flex items-center gap-2 text-sm text-[var(--color-subtext)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Speaker: {event.speaker}</span>
                  </div>
                )}
                {event.isOnline ? (
                  <div className="flex items-center gap-2 text-sm text-[var(--color-subtext)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Online</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-[var(--color-subtext)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.locationName}, {event.address}</span>
                  </div>
                )}
                <p className="text-sm">{event.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <a
                    href={event.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-primary)] hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    Scopri di più e iscriviti →
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </Card>
          ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-8 border border-[var(--color-line)] text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-4">
                Calendario Eventi OSM Veneto
              </h3>
              <p className="text-lg text-[var(--color-subtext)] mb-6">
                Consulta il calendario completo degli eventi OSM per il Veneto su eventiosm.it
              </p>
              <a
                href="https://eventiosm.it/region/20"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Vai al calendario eventi OSM →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

