import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Cookie Policy - Enrico Rizzi',
  description: 'Informativa sull\'utilizzo dei cookie su rizzienrico.it',
  path: '/cookie',
});

export default function CookiePolicyPage() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="font-heading text-4xl font-bold text-[var(--color-text)] mb-8">
            Cookie Policy
          </h1>
          <div className="text-[var(--color-text)] leading-relaxed space-y-6">
            <p>
              <strong>Informativa ai sensi dell'art. 13 del D.Lgs. 196/2003 e del GDPR 679/2016</strong>
            </p>
            
            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Cosa sono i Cookie</h2>
            <p>
              I cookie sono piccoli file di testo che vengono memorizzati sul dispositivo dell'utente 
              quando visita un sito web. I cookie permettono al sito di ricordare le azioni e le 
              preferenze dell'utente per un determinato periodo di tempo.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Tipi di Cookie Utilizzati</h2>
            
            <h3 className="font-heading text-xl font-semibold mt-6 mb-3">Cookie Tecnici (Necessari)</h3>
            <p>
              Questi cookie sono essenziali per il funzionamento del sito e non possono essere disattivati. 
              Vengono utilizzati per:
            </p>
            <ul>
              <li>Memorizzare le preferenze di navigazione</li>
              <li>Gestire il consenso ai cookie</li>
              <li>Garantire la sicurezza del sito</li>
            </ul>
            <p>
              <strong>Base giuridica:</strong> Interesse legittimo del titolare (art. 6, comma 1, lett. f GDPR).
            </p>

            <h3 className="font-heading text-xl font-semibold mt-6 mb-3">Cookie di Analisi e Statistiche</h3>
            <p>
              Utilizziamo servizi di analisi anonima per comprendere come gli utenti utilizzano il sito. 
              I dati raccolti sono completamente anonimizzati e non consentono l'identificazione dell'utente.
            </p>
            <p>
              <strong>Servizi utilizzati:</strong>
            </p>
            <ul>
              <li><strong>Plausible Analytics:</strong> Analisi del traffico in forma anonima (se configurato)</li>
              <li><strong>Google Analytics 4:</strong> Analisi del traffico in forma anonima (se configurato)</li>
            </ul>
            <p>
              <strong>Base giuridica:</strong> Consenso dell'utente (art. 6, comma 1, lett. a GDPR).
            </p>
            <p>
              Puoi rifiutare questi cookie utilizzando il banner dei cookie o disattivandoli nelle 
              impostazioni del browser.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Durata dei Cookie</h2>
            <p>
              I cookie tecnici hanno una durata limitata alla sessione di navigazione o comunque non 
              superiore a 12 mesi. I cookie di analisi possono avere durata variabile in base al servizio 
              utilizzato.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Gestione dei Cookie</h2>
            <p>
              Puoi gestire le preferenze sui cookie in qualsiasi momento:
            </p>
            <ul>
              <li>Attraverso il banner dei cookie presente sul sito</li>
              <li>Modificando le impostazioni del tuo browser</li>
              <li>Utilizzando strumenti di terze parti per la gestione dei cookie</li>
            </ul>
            <p>
              <strong>Nota:</strong> La disattivazione di alcuni cookie potrebbe limitare alcune funzionalità del sito.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Cookie di Terze Parti</h2>
            <p>
              Il sito può contenere link o incorporare contenuti di terze parti che utilizzano cookie propri. 
              Questi cookie sono gestiti direttamente dalle terze parti e non sono sotto il controllo di 
              questo sito. Ti invitiamo a consultare le rispettive privacy policy:
            </p>
            <ul>
              <li><a href="https://plausible.io/data-policy" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">Plausible Analytics Privacy Policy</a></li>
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">Google Privacy Policy</a></li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Titolare del Trattamento</h2>
            <p>
              Enrico Rizzi<br />
              Email: e.rizzi@osmpartnervenezia.it<br />
              P.IVA: 05616690284<br />
              Area servita: Venezia, Padova e Rovigo, Veneto
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Diritti dell'Utente</h2>
            <p>
              Hai diritto a:
            </p>
            <ul>
              <li>Ricevere informazioni chiare sull'utilizzo dei cookie</li>
              <li>Esprimere o revocare il consenso in qualsiasi momento</li>
              <li>Accedere, rettificare o cancellare i dati personali</li>
            </ul>
            <p>
              Per esercitare i tuoi diritti, scrivi a: <a href="mailto:e.rizzi@osmpartnervenezia.it" className="text-[var(--color-primary)] hover:underline">e.rizzi@osmpartnervenezia.it</a>
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

