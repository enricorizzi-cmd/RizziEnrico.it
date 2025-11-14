import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Privacy Policy - Enrico Rizzi',
  description: 'Informativa sulla privacy e trattamento dei dati personali.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="font-heading text-4xl font-bold text-[var(--color-text)] mb-8">
            Privacy Policy
          </h1>
          <div className="text-[var(--color-text)] leading-relaxed space-y-6">
            <p>
              <strong>Informativa ai sensi dell'art. 13 del D.Lgs. 196/2003 e del GDPR 679/2016</strong>
            </p>
            <p>
              Enrico Rizzi, in qualità di titolare del trattamento, informa che i dati personali
              forniti tramite questo sito web sono trattati in conformità alla normativa vigente
              in materia di protezione dei dati personali.
            </p>
            <h2>Titolare del Trattamento</h2>
            <p>
              Enrico Rizzi<br />
              Email: e.rizzi@osmpartnervenezia.it<br />
              P.IVA: 05616690284<br />
              Area servita: Venezia, Padova e Rovigo, Veneto
            </p>
            <h2>Finalità del Trattamento</h2>
            <p>
              I dati raccolti sono utilizzati per:
            </p>
            <ul>
              <li>Rispondere alle richieste di informazioni</li>
              <li>Gestire prenotazioni e appuntamenti</li>
              <li>Inviare comunicazioni relative ai servizi (solo con consenso)</li>
              <li>Analizzare statistiche di utilizzo del sito (dati anonimizzati)</li>
            </ul>
            <h2>Base Giuridica</h2>
            <p>
              Il trattamento è basato sul consenso dell'interessato e sull'esecuzione di misure
              precontrattuali su richiesta dello stesso.
            </p>
            <h2>Diritti dell'Interessato</h2>
            <p>
              Hai diritto a: accesso, rettifica, cancellazione, limitazione, opposizione, portabilità
              dei dati. Per esercitare i tuoi diritti, scrivi a e.rizzi@osmpartnervenezia.it
            </p>
            <p className="text-sm text-[var(--color-subtext)] mt-8">
              Ultima modifica: {new Date().toLocaleDateString('it-IT')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

