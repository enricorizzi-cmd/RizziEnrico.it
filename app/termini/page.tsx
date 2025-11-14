import { generateMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = generateMetadata({
  title: 'Termini di Servizio - Enrico Rizzi',
  description: 'Termini e condizioni di utilizzo del sito rizzienrico.it',
  path: '/termini',
});

export default function TerminiPage() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="font-heading text-4xl font-bold text-[var(--color-text)] mb-8">
            Termini di Servizio
          </h1>
          <div className="text-[var(--color-text)] leading-relaxed space-y-6">
            <p>
              <strong>Condizioni Generali di Utilizzo del Sito Web</strong>
            </p>
            <p>
              La presente pagina contiene i termini e le condizioni di utilizzo del sito web 
              <strong> rizzienrico.it</strong> (di seguito "il Sito"). L'accesso e l'utilizzo del Sito 
              implicano l'accettazione integrale delle presenti condizioni.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">1. Informazioni sul Titolare</h2>
            <p>
              <strong>Titolare del Sito:</strong> Enrico Rizzi<br />
              <strong>Email:</strong> e.rizzi@osmpartnervenezia.it<br />
              <strong>P.IVA:</strong> 05616690284<br />
              <strong>Area servita:</strong> Venezia - Rovigo, Veneto, Italia
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">2. Oggetto e Scopo del Sito</h2>
            <p>
              Il Sito ha lo scopo di fornire informazioni sui servizi di consulenza organizzativa 
              per PMI offerti da Enrico Rizzi, consulente OSM (Open Source Management). 
              Il Sito consente agli utenti di:
            </p>
            <ul>
              <li>Consultare informazioni sui servizi offerti</li>
              <li>Richiedere informazioni o preventivi</li>
              <li>Prenotare un check-up aziendale gratuito</li>
              <li>Accedere a risorse e contenuti informativi</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">3. Accettazione dei Termini</h2>
            <p>
              L'accesso e la navigazione sul Sito, nonché l'utilizzo dei servizi offerti, comportano 
              l'accettazione integrale e senza riserve delle presenti condizioni. Se non accetti 
              queste condizioni, ti invitiamo a non utilizzare il Sito.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">4. Utilizzo del Sito</h2>
            <p>
              L'utente si impegna a utilizzare il Sito in conformità alla legge, alle buone usanze 
              e alle presenti condizioni. È vietato:
            </p>
            <ul>
              <li>Utilizzare il Sito per scopi illegali o non autorizzati</li>
              <li>Violare i diritti di proprietà intellettuale del Titolare o di terzi</li>
              <li>Trasmettere virus, malware o codici dannosi</li>
              <li>Tentare di accedere a aree riservate del Sito senza autorizzazione</li>
              <li>Utilizzare sistemi automatizzati per estrarre dati dal Sito</li>
              <li>Riprodurre, copiare o rivendere contenuti del Sito senza autorizzazione</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">5. Proprietà Intellettuale</h2>
            <p>
              Tutti i contenuti del Sito (testi, immagini, loghi, grafici, video, software) sono 
              di proprietà di Enrico Rizzi o dei rispettivi titolari e sono protetti dalle leggi 
              italiane e internazionali sul diritto d'autore e sulla proprietà intellettuale.
            </p>
            <p>
              È vietata la riproduzione, anche parziale, dei contenuti senza l'autorizzazione 
              scritta del Titolare, salvo quanto previsto dalla legge per uso personale e didattico.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">6. Servizi e Contenuti</h2>
            <p>
              Il Titolare si riserva il diritto di modificare, sospendere o interrompere in qualsiasi 
              momento, senza preavviso, i servizi offerti sul Sito o parte di essi.
            </p>
            <p>
              Le informazioni pubblicate sul Sito sono fornite "così come sono" e il Titolare non 
              garantisce l'accuratezza, la completezza o l'aggiornamento delle informazioni stesse.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">7. Link Esterni</h2>
            <p>
              Il Sito può contenere link a siti web di terze parti. Il Titolare non ha alcun controllo 
              su questi siti e non si assume alcuna responsabilità per i contenuti, le politiche sulla 
              privacy o le pratiche di tali siti esterni.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">8. Limitazione di Responsabilità</h2>
            <p>
              Il Titolare non si assume alcuna responsabilità per:
            </p>
            <ul>
              <li>Danni diretti, indiretti, incidentali o consequenziali derivanti dall'utilizzo o 
                  dall'impossibilità di utilizzare il Sito</li>
              <li>Interruzioni, errori, omissioni o difetti nel funzionamento del Sito</li>
              <li>Perdita di dati o informazioni</li>
              <li>Virus o altri elementi dannosi che possano infettare l'equipaggiamento dell'utente</li>
            </ul>
            <p>
              Il Titolare si impegna a mantenere il Sito funzionante, ma non garantisce che il Sito 
              sarà sempre disponibile, privo di errori o sicuro.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">9. Protezione dei Dati Personali</h2>
            <p>
              Il trattamento dei dati personali degli utenti è disciplinato dalla 
              <Link href="/privacy" className="text-[var(--color-primary)] hover:underline"> Privacy Policy</Link>, 
              che costituisce parte integrante dei presenti Termini di Servizio.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">10. Modifiche ai Termini</h2>
            <p>
              Il Titolare si riserva il diritto di modificare le presenti condizioni in qualsiasi momento. 
              Le modifiche entreranno in vigore dalla data di pubblicazione sul Sito. Si consiglia di 
              consultare periodicamente questa pagina per essere informati di eventuali aggiornamenti.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">11. Legge Applicabile e Foro Competente</h2>
            <p>
              Le presenti condizioni sono disciplinate dalla legge italiana. Per qualsiasi controversia 
              relativa all'interpretazione, all'esecuzione o alla risoluzione dei presenti termini, 
              sarà competente il foro del luogo di residenza o domicilio dell'utente, se consumatore, 
              ovvero il foro di Venezia in tutti gli altri casi.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">12. Contatti</h2>
            <p>
              Per qualsiasi domanda o richiesta relativa ai presenti Termini di Servizio, è possibile 
              contattare il Titolare:
            </p>
            <p>
              <strong>Enrico Rizzi</strong><br />
              Email: <a href="mailto:e.rizzi@osmpartnervenezia.it" className="text-[var(--color-primary)] hover:underline">e.rizzi@osmpartnervenezia.it</a><br />
              Telefono: <a href="tel:+393475290564" className="text-[var(--color-primary)] hover:underline">+39 347 529 0564</a><br />
              P.IVA: 05616690284
            </p>

            <p className="text-sm text-[var(--color-subtext)] mt-8 pt-6 border-t border-[var(--color-line)]">
              Ultima modifica: {new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

