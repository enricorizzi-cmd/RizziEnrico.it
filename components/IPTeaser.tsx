'use client';

import { useState } from 'react';
import CTA from './CTA';

// Domande allineate ai tratti i-Profile OSM 2021
// Basate sul manuale ufficiale: 18 caratteristiche divise in ESSERE-FARE-AVERE
const questions = [
  {
    id: 1,
    question: 'Quanto hai chiaro dove vuoi andare professionalmente nei prossimi 12 mesi?',
    trait: 'organizzazione',
    fascia: 'ESSERE',
    options: [
      { 
        value: 'molto_chiaro', 
        label: 'Ho obiettivi chiari e un piano dettagliato per raggiungerli', 
        score: { organizzazione: 4, automotivazione: 2, autodisciplina: 1 } 
      },
      { 
        value: 'in_definizione', 
        label: 'Ho una direzione generale ma devo definire meglio i dettagli', 
        score: { organizzazione: 2, automotivazione: 2, proattivita: 2 } 
      },
      { 
        value: 'poco_chiaro', 
        label: 'Sto ancora esplorando opzioni e capendo cosa voglio davvero', 
        score: { organizzazione: 1, resistenza_cambiamento: -1, proattivita: 1 } 
      },
    ],
  },
  {
    id: 2,
    question: 'Quando hai un compito importante da portare a termine, come ti comporti?',
    trait: 'autodisciplina',
    fascia: 'FARE',
    options: [
      { 
        value: 'subito', 
        label: 'Lo faccio subito, anche se non mi piace - so che è necessario', 
        score: { autodisciplina: 4, determinazione: 2, organizzazione: 1 } 
      },
      { 
        value: 'quando_motivato', 
        label: 'Lo faccio quando trovo la giusta motivazione o il momento ideale', 
        score: { automotivazione: 2, autodisciplina: 2, resistenza_cambiamento: 1 } 
      },
      { 
        value: 'procrastino', 
        label: 'Tendo a rimandare finché la deadline non diventa urgente', 
        score: { autodisciplina: 1, gestione_pressioni: -1, proattivita: 1 } 
      },
    ],
  },
  {
    id: 3,
    question: 'In una situazione di gruppo dove serve prendere una decisione importante, tu:',
    trait: 'determinazione_leadership',
    fascia: 'FARE',
    options: [
      { 
        value: 'guido', 
        label: 'Esprimo la mia posizione chiaramente e guido verso una soluzione', 
        score: { determinazione: 4, leadership: 3, vendite: 1 } 
      },
      { 
        value: 'collaboro', 
        label: 'Ascolto tutti e cerco un consenso di gruppo', 
        score: { comprensione: 3, hr_management: 2, proattivita: 2 } 
      },
      { 
        value: 'osservo', 
        label: 'Osservo, analizzo e contribuisco quando mi viene chiesto', 
        score: { organizzazione: 2, comprensione: 2, autodisciplina: 1 } 
      },
    ],
  },
  {
    id: 4,
    question: 'Quando qualcuno critica il tuo lavoro o ti contraddice, come reagisci?',
    trait: 'proattivita_gestione_pressioni',
    fascia: 'AVERE',
    options: [
      { 
        value: 'costruttivo', 
        label: 'Mi metto in discussione e cerco di capire cosa posso migliorare', 
        score: { proattivita: 4, comprensione: 2, hr_management: 1 } 
      },
      { 
        value: 'equilibrato', 
        label: 'Valuto se la critica è fondata, a volte accetto, altre volte no', 
        score: { proattivita: 2, gestione_pressioni: 2, determinazione: 2 } 
      },
      { 
        value: 'difensivo', 
        label: 'Mi infastidisco e tendo a difendermi o giustificarmi', 
        score: { gestione_pressioni: -1, proattivita: 1, determinazione: 1 } 
      },
    ],
  },
  {
    id: 5,
    question: 'Incontrare persone nuove e ampliare la tua rete professionale è:',
    trait: 'espansivita',
    fascia: 'AVERE',
    options: [
      { 
        value: 'naturale', 
        label: 'Naturale e piacevole - rompo facilmente il ghiaccio', 
        score: { espansivita: 4, vendite: 2, automotivazione: 1 } 
      },
      { 
        value: 'selettivo', 
        label: 'Lo faccio ma sono selettivo e mi serve un po\' di tempo', 
        score: { espansivita: 2, comprensione: 2, organizzazione: 1 } 
      },
      { 
        value: 'difficile', 
        label: 'Mi mette a disagio - preferisco relazioni consolidate', 
        score: { espansivita: 1, autodisciplina: 1, resistenza_cambiamento: 2 } 
      },
    ],
  },
  {
    id: 6,
    question: 'Quando vedi qualcuno del tuo team in difficoltà o che sbaglia, tu:',
    trait: 'comprensione_hr',
    fascia: 'AVERE',
    options: [
      { 
        value: 'empatico', 
        label: 'Cerco di capire le sue ragioni e lo aiuto senza giudicare', 
        score: { comprensione: 4, hr_management: 3, proattivita: 1 } 
      },
      { 
        value: 'critico_costruttivo', 
        label: 'Noto l\'errore e intervengo per correggerlo subito', 
        score: { determinazione: 3, organizzazione: 2, autodisciplina: 1 } 
      },
      { 
        value: 'critico', 
        label: 'Mi infastidisce - penso che dovrebbe fare meglio', 
        score: { comprensione: -1, determinazione: 2, organizzazione: 1 } 
      },
    ],
  },
  {
    id: 7,
    question: 'Di fronte a un cambiamento importante (nuovo processo, nuova tecnologia, riorganizzazione):',
    trait: 'resistenza_cambiamento',
    fascia: 'ESSERE',
    options: [
      { 
        value: 'entusiasta', 
        label: 'Sono entusiasta - mi piacciono le novità e l\'innovazione', 
        score: { resistenza_cambiamento: -3, automotivazione: 3, proattivita: 2 } 
      },
      { 
        value: 'pragmatico', 
        label: 'Lo valuto - se ha senso mi adatto, altrimenti faccio domande', 
        score: { organizzazione: 2, resistenza_cambiamento: 1, comprensione: 2 } 
      },
      { 
        value: 'resistente', 
        label: 'Preferisco procedure consolidate - cambiare mi mette a disagio', 
        score: { resistenza_cambiamento: 4, organizzazione: 1, autodisciplina: 1 } 
      },
    ],
  },
  {
    id: 8,
    question: 'La tua capacità di coinvolgere altri (colleghi, clienti, collaboratori) nei tuoi progetti è:',
    trait: 'vendite_comunicazione',
    fascia: 'FARE',
    options: [
      { 
        value: 'alta', 
        label: 'Forte - so comunicare con entusiasmo e ottenere supporto', 
        score: { vendite: 4, espansivita: 2, determinazione: 2 } 
      },
      { 
        value: 'media', 
        label: 'Discreta - con le persone giuste riesco a creare collaborazioni', 
        score: { vendite: 2, comprensione: 2, hr_management: 2 } 
      },
      { 
        value: 'bassa', 
        label: 'Limitata - preferisco lavorare da solo piuttosto che convincere altri', 
        score: { vendite: 1, espansivita: 1, autodisciplina: 2 } 
      },
    ],
  },
];

export default function IPTeaser() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [completed, setCompleted] = useState(false);
  const [profile, setProfile] = useState<{
    tratti: { [key: string]: number };
    profiloNome: string;
    profiloDescrizione: string;
    profiloIcona: string;
    analisiTratti: Array<{
      nome: string;
      punteggio: number;
      percentuale: number;
      analisi: string;
      consigli: string;
    }>;
    puntiForza: string[];
    areeSviluppo: Array<{
      area: string;
      suggerimento: string;
    }>;
    consigliStrategici: string[];
  } | null>(null);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      // Calcola profilo completo
      const calculatedProfile = calculateProfile({ ...answers, [questionId]: value });
      setProfile(calculatedProfile);
      setCompleted(true);
    }
  };

  const calculateProfile = (ans: { [key: number]: string }) => {
    const tratti: { [key: string]: number } = {};
    // Labels basati sui tratti i-Profile OSM (divisi in ESSERE-FARE-AVERE)
    const trattiLabels: { [key: string]: string } = {
      // ESSERE (concentrazione su ciò che si vuole realizzare)
      organizzazione: 'Organizzazione',
      automotivazione: 'Automotivazione',
      gestione_pressioni: 'Gestione Pressioni',
      // FARE (azioni per raggiungere obiettivi)
      autodisciplina: 'Autodisciplina',
      determinazione: 'Determinazione',
      vendite: 'Attitudine alla Vendita',
      hr_management: 'HR Management',
      leadership: 'Leadership',
      // AVERE (stabilizzare il valore conquistato)
      proattivita: 'Proattività',
      comprensione: 'Comprensione',
      espansivita: 'Espansività',
      // Altri tratti importanti
      resistenza_cambiamento: 'Resistenza al Cambiamento',
    };

    // Calcola punteggi per ogni tratto
    questions.forEach((q) => {
      const answer = ans[q.id];
      const option = q.options.find((opt) => opt.value === answer);
      if (option && option.score) {
        Object.entries(option.score).forEach(([trait, score]) => {
          tratti[trait] = (tratti[trait] || 0) + score;
        });
      }
    });

    // Calcola il massimo possibile per ogni tratto
    const maxScorePerTrait: { [key: string]: number } = {};
    questions.forEach((q) => {
      q.options.forEach((opt) => {
        if (opt.score) {
          Object.entries(opt.score).forEach(([trait, score]) => {
            if (!maxScorePerTrait[trait]) {
              maxScorePerTrait[trait] = 0;
            }
            maxScorePerTrait[trait] = Math.max(maxScorePerTrait[trait], score);
          });
        }
      });
    });
    
    // Calcola il totale massimo per ogni tratto (massimo per domanda * numero di domande che danno punti a quel tratto)
    const totalMaxPerTrait: { [key: string]: number } = {};
    Object.keys(maxScorePerTrait).forEach((trait) => {
      let count = 0;
      questions.forEach((q) => {
        const hasTrait = q.options.some((opt) => opt.score && opt.score[trait]);
        if (hasTrait) count++;
      });
      totalMaxPerTrait[trait] = maxScorePerTrait[trait] * count;
    });

    const trattiOrdinati = Object.entries(tratti)
      .sort(([, a], [, b]) => b - a);

    // Determina il profilo/archetipo principale basato sui 10 profili i-Profile
    let profiloNome = '';
    let profiloDescrizione = '';
    let profiloIcona = '🎯';

    // PROFILI BASATI SUL MANUALE I-PROFILE OSM 2021
    // Analizzando le combinazioni ESSERE-FARE-AVERE

    if (tratti.organizzazione >= 8 && tratti.automotivazione >= 7 && tratti.leadership >= 6) {
      // PROFILO 1: LO STRATEGICO-ORGANIZZATORE
      profiloNome = 'Lo Strategico-Organizzatore';
      profiloDescrizione = 'Hai le idee chiare su dove vuoi andare e ambisci a traguardi significativi. Gestisci bene tempi ed energie, stabilisci priorità con facilità e vedi gli obiettivi come già realizzati nella tua mente. Quando serve, ti senti a tuo agio nel guidare e dare direzione. Sei il punto di riferimento per visione e struttura, capace di trasformare idee in piani concreti.';
      profiloIcona = '🎯';
    } else if (tratti.vendite >= 8 && tratti.espansivita >= 7 && tratti.comprensione >= 5) {
      // PROFILO 2: IL CONNETTORE-RELAZIONALE
      profiloNome = 'Il Connettore-Relazionale';
      profiloDescrizione = 'Eccelli nel comunicare e nel coinvolgere gli altri nei tuoi progetti. Apri facilmente nuove porte e conosci moltissime persone in modo naturale e sciolto. Sei empatico e capace di cogliere bisogni inespressi, creando relazioni durature. Sei il moltiplicatore che espande la rete e crea collaborazioni di valore, essenziale per far crescere qualsiasi iniziativa.';
      profiloIcona = '🤝';
    } else if (tratti.autodisciplina >= 8 && tratti.determinazione >= 7 && tratti.organizzazione >= 6) {
      // PROFILO 3: L'ESECUTORE-OPERATIVO
      profiloNome = 'L\'Esecutore-Operativo';
      profiloDescrizione = 'Fai ciò che deve essere fatto per raggiungere gli obiettivi, anche quando non ti piace. Esci dalla zona di comfort guidato da senso del dovere e responsabilità. Sai dire quello che serve, delegare efficacemente e portare a termine. Sei preciso, previdènte ed efficiente: il fulcro operativo che trasforma piani in risultati concreti e misurabili.';
      profiloIcona = '⚡';
    } else if (tratti.organizzazione >= 8 && tratti.resistenza_cambiamento >= 3 && tratti.autodisciplina >= 7) {
      // PROFILO 4: IL METODICO-SPECIALISTA
      profiloNome = 'Il Metodico-Specialista';
      profiloDescrizione = 'Hai un approccio logico, tecnico e razionale. Pensi per procedure e preferisci schemi consolidati e testati. La tua coerenza e attenzione ai dettagli ti rendono eccellente in ruoli che richiedono precisione, ripetibilità e rispetto di standard. Sei il garante della qualità e della conformità, fondamentale in ambiti specialistici e tecnici.';
      profiloIcona = '🔧';
    } else if (tratti.automotivazione >= 8 && tratti.leadership >= 7 && tratti.proattivita >= 6) {
      // PROFILO 5: IL CATALIZZATORE-TRASFORMATIVO
      profiloNome = 'Il Catalizzatore-Trasformativo';
      profiloDescrizione = 'Ambisci a traguardi ambiziosi e vuoi avere un grande impatto. Ti senti a tuo agio nel guidare e prendere posizione. Quando le cose vanno male, ti metti in discussione e cerchi soluzioni anziché incolpare gli altri. Stemperi attriti creando un clima collaborativo. Sei il catalizzatore che ispira e guida verso traguardi che sembrano impossibili.';
      profiloIcona = '🚀';
    } else if (tratti.comprensione >= 8 && tratti.hr_management >= 7 && tratti.proattivita >= 6) {
      // PROFILO 6: IL FACILITATORE-SVILUPPATORE
      profiloNome = 'Il Facilitatore-Sviluppatore';
      profiloDescrizione = 'Eccelli nel creare relazioni solide e durature. Sei empatico, tollerante e capace di mettere gli altri a proprio agio. Fai crescere le persone che ti circondano, sviluppando il loro potenziale e rendendole autonome e motivate. Sei il collante del team che crea armonia e fa emergere il meglio dalle persone, moltiplicando i risultati collettivi.';
      profiloIcona = '🌟';
    } else if (tratti.resistenza_cambiamento <= 0 && tratti.automotivazione >= 7 && tratti.espansivita >= 6) {
      // PROFILO 7: L'INNOVATORE-CREATIVO
      profiloNome = 'L\'Innovatore-Creativo';
      profiloDescrizione = 'Ami le novità e l\'innovazione. Sei entusiasta di fronte ai cambiamenti e ti adatti con flessibilità. Ambisci a realizzare idee ambiziose e ti connetti facilmente con molte persone per concretizzarle. Sei il portatore di idee fresche che sfida lo status quo e trova soluzioni creative dove altri vedono solo ostacoli.';
      profiloIcona = '💡';
    } else if (tratti.organizzazione >= 7 && tratti.autodisciplina >= 7 && tratti.resistenza_cambiamento >= 2) {
      // PROFILO 8: L'OTTIMIZZATORE-SISTEMATICO
      profiloNome = 'L\'Ottimizzatore-Sistematico';
      profiloDescrizione = 'Strutturi processi e organizzi il lavoro in modo sistematico. Crei ordine e chiarezza operativa, sei preciso ed efficiente nell\'esecuzione. La tua coerenza ti rende affidabile e metodico. Sei il riferimento per l\'ottimizzazione, l\'analisi approfondita e la creazione di sistemi che funzionano e scalano, essenziale per l\'efficienza.';
      profiloIcona = '📊';
    } else if (tratti.comprensione >= 7 && tratti.espansivita >= 7 && tratti.proattivita >= 5) {
      // PROFILO 9: IL DIPLOMATICO-RELAZIONALE
      profiloNome = 'Il Diplomatico-Relazionale';
      profiloDescrizione = 'Eccelli nelle relazioni interpersonali. Noti bisogni inespressi, sei tollerante e privo di giudizio. Apri facilmente nuove porte e metti le persone a proprio agio fin dal primo incontro. Sei d\'aiuto anziché d\'ostacolo nei gruppi. Sei il diplomatico che costruisce ponti, media conflitti e crea reti di valore duraturo.';
      profiloIcona = '🤲';
    } else if (tratti.determinazione >= 7 && tratti.vendite >= 7 && tratti.autodisciplina >= 5) {
      // PROFILO 10: IL PRAGMATICO-CONCRETO
      profiloNome = 'Il Pragmatico-Concreto';
      profiloDescrizione = 'Sei focalizzato sul raggiungimento di risultati concreti e misurabili. Dici quello che serve dire, fai richieste chiare e deleghi efficacemente. Coinvolgi gli altri nei tuoi progetti con entusiasmo. Esegui anche quando è scomodo o difficile. Sei l\'orientato ai risultati che trasforma obiettivi in traguardi tangibili con pragmatismo e tenacia.';
      profiloIcona = '🎖️';
    } else {
      // PROFILO BILANCIATO (quando nessun pattern emerge chiaramente)
      profiloNome = 'Profilo Versatile';
      profiloDescrizione = 'Hai sviluppato un profilo equilibrato con competenze distribuite su più dimensioni. Questa versatilità ti permette di adattarti a diversi contesti e ruoli. Per massimizzare il tuo impatto, considera di identificare 2-3 aree prioritarie su cui concentrarti nei prossimi 90 giorni, così da sviluppare un\'eccellenza specifica che ti distingua.';
      profiloIcona = '⚖️';
    }

    // Analisi dettagliata dei tratti principali
    const analisiTratti = trattiOrdinati.slice(0, 5).map(([trait, score]) => {
      const maxScore = totalMaxPerTrait[trait] || 24; // fallback a 24 se non trovato
      const percentage = Math.round((score / maxScore) * 100);
      let analisi = '';
      let consigli = '';

      // Analisi comportamentali generiche (SENZA spoilerare i tratti i-Profile OSM)
      switch (trait) {
        case 'organizzazione':
          analisi = percentage >= 70 ? 'Sai dove vuoi andare e hai le idee chiare sul tuo futuro. Vedi gli obiettivi come già realizzati, stabilisci priorità rapidamente e gestisci bene tempi ed energie. Sei padrone del tuo tempo.' : percentage >= 50 ? 'Hai una discreta capacità di pianificazione, ma potresti migliorare la chiarezza sui tuoi obiettivi a lungo termine.' : 'Potresti beneficiare di maggiore chiarezza su dove vuoi andare. Dedica tempo a definire obiettivi specifici.';
          consigli = percentage >= 70 ? 'Documenta i tuoi sistemi e condividili con chi lavora con te. Mantieni la visione a lungo termine comunicandola regolarmente.' : 'Dedica 30 minuti ogni domenica a pianificare la settimana. Usa un sistema di priorità. Visualizza i tuoi obiettivi a 12 mesi.';
          break;
        case 'automotivazione':
          analisi = percentage >= 70 ? 'Ambisci a grandi traguardi e hai un forte desiderio di impatto. Hai fiducia che le tue mete si realizzeranno e un\'idea positiva del futuro. Sai che hai le carte in regola per farcela.' : percentage >= 50 ? 'Hai discrete aspirazioni ma potresti alzare l\'asticella dei tuoi sogni.' : 'I tuoi obiettivi potrebbero essere limitati. Potresti aver bisogno di credere di più in te stesso e nel tuo potenziale.';
          consigli = percentage >= 70 ? 'Comunica la tua visione per ispirare chi ti circonda. Stabilisci traguardi ancora più ambiziosi. Trova mentor che hanno già realizzato ciò che ambisci.' : 'Leggi biografie di persone che ammiri. Frequenta ambienti dove si ambisce a grandi risultati. Fissa un obiettivo "impossibile".';
          break;
        case 'gestione_pressioni':
          analisi = percentage >= 30 ? 'Gestisci bene le tue energie nonostante eventuali persone difficili nel tuo ambiente. Mantieni il focus sui tuoi scopi senza farti drenare.' : percentage >= 10 ? 'Alcune persone nel tuo ambiente potrebbero influenzarti negativamente, causandoti alti e bassi.' : 'Potresti avere accanto persone che ti ostacolano. Questo potrebbe abbassare la tua produttività ed energia.';
          consigli = percentage >= 30 ? 'Mantieni i confini sani nelle relazioni. Continua a proteggere la tua energia dalle influenze negative.' : 'Identifica chi ti demotiva nel tuo ambiente. Limita il tempo con queste persone. Cerca supporto per gestire queste relazioni.';
          break;
        case 'autodisciplina':
          analisi = percentage >= 70 ? 'Fai ciò che deve essere fatto, anche quando non ti piace. Esci dalla zona di comfort guidato da senso del dovere. Sei previdènte, efficiente e accurato nell\'eseguire.' : percentage >= 50 ? 'Sei disciplinato quando motivato, ma a volte rimandi.' : 'A volte temporeggi e rimandi aspetti importanti. Potresti bloccare il tuo avanzamento per comfort momentaneo.';
          consigli = percentage >= 70 ? 'Non dimenticare di celebrare i risultati raggiunti. Bilancia la tua disciplina con momenti di riposo per evitare burnout.' : 'Usa la regola dei 2 minuti: se serve meno, fallo subito. Crea accountability partner. Identifica il tuo "perché" profondo.';
          break;
        case 'determinazione':
          analisi = percentage >= 70 ? 'Dici ciò che deve essere detto. Comunichi il tuo punto di vista chiaramente, deleghi, fai richieste e quando serve ti affermi in modo assertivo.' : percentage >= 50 ? 'Sei abbastanza diretto ma a volte fatichi a dire cose scomode o a fare richieste difficili.' : 'A volte hai difficoltà a parlare chiaro, correggere o delegare. Gli altri potrebbero non capirti o non seguirti.';
          consigli = percentage >= 70 ? 'Bilancia l\'assertività con l\'ascolto. Assicurati di ascoltare prima di affermare. Usa il feedback per calibrare il tuo stile.' : 'Pratica comunicazione assertiva. Leggi "Crucial Conversations". Inizia con richieste piccole e aumenta gradualmente.';
          break;
        case 'vendite':
          analisi = percentage >= 70 ? 'Sai comunicare con entusiasmo e coinvolgere le persone nei tuoi progetti. Hai capacità di far sì che gli altri decidano di collaborare con te per contribuire alle tue mete.' : percentage >= 50 ? 'Hai discrete capacità relazionali ma potresti migliorare nel coinvolgere attivamente gli altri.' : 'A volte tendi a lavorare da solo. Potresti sviluppare maggiore capacità di coinvolgere persone.';
          consigli = percentage >= 70 ? 'Continua a espandere la tua rete. Insegna le tue tecniche. Usa storytelling per rendere le tue presentazioni ancora più coinvolgenti.' : 'Studia tecniche relazionali. Pratica l\'elevator pitch. Leggi "Influence" di Cialdini. Partecipa a eventi di networking.';
          break;
        case 'hr_management':
          analisi = percentage >= 70 ? 'Fai crescere le persone che ti circondano, rendendole più autonome, consapevoli, motivate ed efficienti. Sei un mentore naturale che sviluppa il potenziale altrui.' : percentage >= 50 ? 'Hai discrete capacità di sviluppare le persone ma potresti migliorare nel far emergere il loro potenziale.' : 'Potresti migliorare nel far crescere le persone intorno a te e nel sviluppare il loro potenziale.';
          consigli = percentage >= 70 ? 'Documenta le tue best practice. Crea percorsi di sviluppo strutturati per chi lavora con te. Diventa mentor formale.' : 'Studia "I Nuovi Condottieri". Impara tecniche di coaching. Dedica tempo settimanale allo sviluppo di ciascuno.';
          break;
        case 'leadership':
          analisi = percentage >= 70 ? 'Ti senti a tuo agio nel guidare e nell\'influenzare. Prendi decisioni importanti che impattano il gruppo con naturalezza.' : percentage >= 50 ? 'Mostri capacità di guida quando serve, ma non è il tuo approccio dominante.' : 'Preferisci non guidare. Fatichi a prendere posizione e influenzare le decisioni di gruppo.';
          consigli = percentage >= 70 ? 'Sviluppa stili situazionali. Crea altri leader invece di accentrare. Studia grandi leader per ampliare il tuo repertorio.' : 'Inizia guidando piccoli progetti. Leggi "Leaders Eat Last". Chiedi feedback sul tuo potenziale.';
          break;
        case 'proattivita':
          analisi = percentage >= 70 ? 'Quando le cose vanno male, ti metti in discussione anziché incolpare gli altri. Stemperi attriti, trovi soluzioni, sei d\'aiuto per il gruppo.' : percentage >= 50 ? 'A volte ti metti in discussione, altre volte sei reattivo.' : 'Potresti essere reattivo e dare la colpa agli altri. Ti arrabbi facilmente quando criticato, creando attriti.';
          consigli = percentage >= 70 ? 'Usa questa capacità per mediare conflitti. Diventa facilitatore in situazioni complesse del team.' : 'Studia il concetto di "Causa-Effetto". Chiediti sempre "Cosa posso fare io?" invece di incolpare circostanze.';
          break;
        case 'comprensione':
          analisi = percentage >= 70 ? 'Noti bisogni inespressi degli altri. Sei empatico, tollerante, diplomatico. Metti le persone a proprio agio e costruisci relazioni di qualità.' : percentage >= 50 ? 'Hai discreta empatia ma a volte potresti essere critico o poco attento ai bisogni altrui.' : 'A volte potresti essere critico o concentrato su ciò che non va. Le relazioni potrebbero richiedere più attenzione.';
          consigli = percentage >= 70 ? 'Usa la tua empatia per negoziazioni complesse. Diventa il mediatore. Attento a non assorbire troppo i problemi altrui.' : 'Pratica ascolto attivo. Leggi "Nonviolent Communication". Concentrati sui lati positivi delle persone.';
          break;
        case 'espansivita':
          analisi = percentage >= 70 ? 'Rompi facilmente il ghiaccio con persone nuove. Sei caloroso, spigliato e crei facilmente una vasta rete di contatti professionali.' : percentage >= 50 ? 'Sei selettivo nelle relazioni. Con le persone giuste ti apri, ma non facilmente con sconosciuti.' : 'Potresti essere timido o riservato con persone nuove. L\'apertura verso nuovi contatti potrebbe richiedere sforzo.';
          consigli = percentage >= 70 ? 'Continua a espandere la rete ma cura anche le relazioni esistenti. Crea partnership strategiche.' : 'Pratica la procedura "Interessato vs Interessante". Partecipa a networking. Sfida: parla con 1 sconosciuto al giorno.';
          break;
        case 'resistenza_cambiamento':
          // Nota: valori bassi (-) indicano apertura, valori alti (+) indicano resistenza
          if (score >= 3) {
            analisi = 'Sei coerente, abitudinario e ti piacciono procedure consolidate. Pensi in modo logico e razionale. Preferisci stabilità a cambiamenti frequenti.';
            consigli = 'Pratica piccoli cambiamenti ogni settimana. Focalizzati su risultati concreti. Ricorda che il "fare" è sempre imperfetto.';
          } else if (score >= 1) {
            analisi = 'Sei coerente e costante, con una buona flessibilità. Bilanci bene stabilità e apertura al nuovo.';
            consigli = 'Mantieni questo equilibrio. Continua a valutare pragmaticamente quando cambiare e quando mantenere.';
          } else if (score >= -1) {
            analisi = 'Sei flessibile e aperto al nuovo. Ti appoggi volentieri ad altri per consigli e sicurezza.';
            consigli = 'Va bene cercare mentor, ma sviluppa anche le tue certezze interne. Bilancia apertura con alcuni principi fermi.';
          } else {
            analisi = 'Sei molto creativo e ami le novità, ma rischi di essere incostante. Potresti abbracciare troppe idee contemporaneamente.';
            consigli = 'Canalizza la creatività su 2-3 progetti max. Trova qualcuno che ti tenga focalizzato. Completa prima di iniziare nuovo.';
          }
          break;
        default:
          analisi = `Hai mostrato un pattern interessante in quest\'area, che vale la pena approfondire.`;
          consigli = 'L\'i-Profile completo ti darà un\'analisi molto più dettagliata e accurata di questa dimensione.';
      }

      return {
        nome: trattiLabels[trait] || trait,
        punteggio: score,
        percentuale: percentage,
        analisi,
        consigli,
      };
    });

    // Punti di forza principali (SENZA spoilerare nomi tratti)
    const puntiForza = analisiTratti
      .filter(t => t.percentuale >= 60)
      .map(t => t.analisi);

    // Aree di sviluppo con descrizioni comportamentali (SENZA spoilerare tratti i-Profile)
    const areeSviluppo = trattiOrdinati
      .filter(([, score]) => score <= 5)
      .slice(0, 3)
      .map(([trait], idx) => {
        let area = `Area di Sviluppo ${idx + 1}`;
        let suggerimento = '';
        switch (trait) {
          case 'organizzazione':
            area = 'Chiarezza sugli Obiettivi';
            suggerimento = 'Dedica 1 ora ogni domenica a pianificazione settimanale, visualizza obiettivi a 12 mesi, usa matrice priorità Eisenhower.';
            break;
          case 'automotivazione':
            area = 'Ampiezza della Visione';
            suggerimento = 'Alza l\'asticella: frequenta ambienti ambiziosi, leggi biografie ispiranti, fissa un obiettivo "impossibile" per quest\'anno.';
            break;
          case 'gestione_pressioni':
            area = 'Gestione Relazioni Difficili';
            suggerimento = 'Identifica chi ti demotiva nel tuo ambiente, limita il tempo con queste persone, cerca supporto per gestire queste dinamiche.';
            break;
          case 'autodisciplina':
            area = 'Esecuzione e Follow-Through';
            suggerimento = 'Smetti di procrastinare: regola 2 minuti (se serve meno, fallo subito), crea accountability partner, identifica il "perché" profondo.';
            break;
          case 'determinazione':
            area = 'Comunicazione Assertiva';
            suggerimento = 'Leggi "Crucial Conversations", pratica richieste scomode, inizia con piccoli no/richieste e aumenta gradualmente.';
            break;
          case 'vendite':
            area = 'Capacità di Coinvolgimento';
            suggerimento = 'Studia tecniche relazionali, pratica elevator pitch, leggi "Influence" di Cialdini, partecipa a networking events.';
            break;
          case 'hr_management':
            area = 'Sviluppo delle Persone';
            suggerimento = 'Studia "I Nuovi Condottieri", impara tecniche di coaching, dedica 15 minuti settimanali allo sviluppo di ciascuno.';
            break;
          case 'leadership':
            area = 'Capacità di Guida';
            suggerimento = 'Guida micro-progetti, leggi "Leaders Eat Last", chiedi feedback 360° sul tuo stile, inizia a prendere più posizione.';
            break;
          case 'proattivita':
            area = 'Atteggiamento Proattivo vs Reattivo';
            suggerimento = 'Studia Causa-Effetto, chiediti sempre "Cosa posso fare io?" invece di incolpare circostanze o altre persone.';
            break;
          case 'comprensione':
            area = 'Empatia e Ascolto';
            suggerimento = 'Pratica ascolto attivo, leggi "Nonviolent Communication", concentrati sui lati positivi delle persone, riduci il criticismo.';
            break;
          case 'espansivita':
            area = 'Apertura a Nuove Relazioni';
            suggerimento = 'Procedura "Interessato vs Interessante", partecipa a networking events, sfida personale: parla con 1 sconosciuto al giorno.';
            break;
          case 'resistenza_cambiamento':
            if (score >= 3) {
              area = 'Flessibilità al Cambiamento';
              suggerimento = 'Pratica piccoli cambiamenti settimanali, focalizzati su risultati concreti vs giustificazioni razionali.';
            } else {
              area = 'Focus e Completamento';
              suggerimento = 'Canalizza la creatività su max 2-3 progetti, trova chi ti tiene focalizzato, completa prima di iniziare cose nuove.';
            }
            break;
          default:
            area = 'Area di Miglioramento';
            suggerimento = `L'i-Profile completo ti fornirà un'analisi approfondita e raccomandazioni specifiche per questa dimensione.`;
        }
        return { area, suggerimento };
      });

    // Consigli strategici personalizzati (SENZA spoilerare tratti i-Profile)
    const consigliStrategici: string[] = [];

    // Forte nel guidare, ma debole nel coinvolgere
    if (tratti.leadership >= 7 && tratti.comprensione <= 5) {
      consigliStrategici.push('💡 Guida Partecipativa: Tendi a guidare con decisione. Considera di coinvolgere maggiormente il team nelle decisioni. Organizza sessioni di co-creazione dove tutti contribuiscono. Ascolta prima di decidere.');
    }

    // Forte nel pianificare, ma rigido ai cambiamenti
    if (tratti.organizzazione >= 7 && tratti.resistenza_cambiamento >= 3) {
      consigliStrategici.push('💡 Struttura Flessibile: Pianifichi bene ma potresti essere rigido. Crea "spazi flessibili" nei processi. Definisci principi guida invece di procedure rigide. Questo ti permetterà di mantenere ordine anche quando le cose cambiano.');
    }

    // Forte nell'eseguire da solo, debole nel delegare/coinvolgere
    if (tratti.autodisciplina >= 7 && tratti.determinazione <= 5) {
      consigliStrategici.push('💡 Da Esecutore a Leader: Fai le cose in prima persona ma fatichi a farle fare agli altri. Impara a delegare e a fare richieste chiare. Organizza sync-up settimanali. Ricorda: moltiplicare è meglio che fare da solo.');
    }

    // Empatico ma poco assertivo
    if (tratti.comprensione >= 7 && tratti.determinazione <= 5) {
      consigliStrategici.push('💡 Empatia con Assertività: Sei molto attento agli altri ma potresti faticare a dire di NO o a fare richieste difficili. Bilancia la tua sensibilità con maggiore chiarezza comunicativa. Va bene essere comprensivo, ma devi anche affermare i tuoi bisogni.');
    }

    // Molto ambizioso ma poco connesso con gli altri
    if (tratti.automotivazione >= 7 && tratti.espansivita <= 5) {
      consigliStrategici.push('💡 Visione e Rete: Ambisci a grandi cose ma potresti fare fatica ad aprire nuove porte. Espandi la tua rete di contatti: i grandi obiettivi richiedono molte collaborazioni. Partecipa a più eventi, conosci nuove persone.');
    }

    // Molto relazionale ma poco esecutivo
    if (tratti.espansivita >= 7 && tratti.autodisciplina <= 5) {
      consigliStrategici.push('💡 Dalle Relazioni ai Risultati: Sei bravo con le persone ma potresti mancare di follow-through. Trasforma i contatti in collaborazioni concrete. Crea sistemi per passare dalle chiacchierate all\'esecuzione.');
    }

    // Molto critico verso gli altri (bassa comprensione)
    if (tratti.comprensione <= 3 && tratti.determinazione >= 6) {
      consigliStrategici.push('💡 Dal Criticismo alla Crescita: Noti facilmente gli errori altrui e li fai notare. Ricorda: per far migliorare qualcuno servono più lati positivi che negativi. Concentrati su ciò che funziona, poi correggi con delicatezza.');
    }

    if (consigliStrategici.length === 0) {
      consigliStrategici.push('💡 Continua a Crescere: Hai un profilo interessante. Identifica 2-3 aree su cui concentrarti nei prossimi 90 giorni per massimizzare il tuo impatto. L\'i-Profile completo ti darà una roadmap dettagliata.');
    }

    return {
      tratti,
      profiloNome,
      profiloDescrizione,
      profiloIcona,
      analisiTratti,
      puntiForza,
      areeSviluppo,
      consigliStrategici,
    };
  };

  const resetQuestionnaire = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setCompleted(false);
    setProfile(null);
  };

  if (completed && profile) {
    return (
      <div className="bg-white rounded-[var(--radius-card)] p-6 lg:p-8 border border-[var(--color-line)]">
        {/* Header con Profilo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{profile.profiloIcona}</div>
          <h3 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--color-text)] mb-3">
            {profile.profiloNome}
          </h3>
          <p className="text-base text-[var(--color-subtext)] leading-relaxed max-w-2xl mx-auto">
            {profile.profiloDescrizione}
          </p>
        </div>

        {/* Tendenze Comportamentali Osservate */}
        <div className="mb-8">
          <h4 className="font-heading font-bold text-xl text-[var(--color-text)] mb-4 flex items-center gap-2">
            <span className="text-[var(--color-primary)]">📊</span>
            Tendenze Comportamentali Osservate
          </h4>
          <div className="space-y-4">
            {profile.analisiTratti.map((tratto, idx) => (
              <div
                key={idx}
                className="bg-[var(--color-card)] rounded-lg p-5 border border-[var(--color-line)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-[var(--color-text)]">
                    Tendenza {idx + 1}
                  </span>
                  <span className="text-sm font-bold text-[var(--color-primary)]">
                    {tratto.percentuale}%
                  </span>
                </div>
                <div className="w-full bg-[var(--color-line)] rounded-full h-2.5 mb-3">
                  <div
                    className="bg-[var(--color-primary)] h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${tratto.percentuale}%` }}
                  />
                </div>
                <p className="text-sm text-[var(--color-text)] mb-2 leading-relaxed">
                  {tratto.analisi}
                </p>
                <div className="mt-3 pt-3 border-[var(--color-line)]">
                  <p className="text-xs font-semibold text-[var(--color-subtext)] mb-1">
                    💡 Consiglio pratico:
                  </p>
                  <p className="text-xs text-[var(--color-subtext)] leading-relaxed">
                    {tratto.consigli}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Punti di Forza */}
        {profile.puntiForza.length > 0 && (
          <div className="mb-8">
            <h4 className="font-heading font-bold text-xl text-[var(--color-text)] mb-4 flex items-center gap-2">
              <span className="text-green-600">✓</span>
              I Tuoi Punti di Forza
            </h4>
            <div className="space-y-3">
              {profile.puntiForza.map((punto, idx) => (
                <div
                  key={idx}
                  className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4"
                >
                  <p className="text-sm text-green-900 leading-relaxed">{punto}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Aree di Sviluppo */}
        {profile.areeSviluppo.length > 0 && (
          <div className="mb-8">
            <h4 className="font-heading font-bold text-xl text-[var(--color-text)] mb-4 flex items-center gap-2">
              <span className="text-blue-600">📈</span>
              Aree di Sviluppo Prioritario
            </h4>
            <div className="space-y-3">
              {profile.areeSviluppo.map((area, idx) => (
                <div
                  key={idx}
                  className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4"
                >
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    {area.area}
                  </p>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {area.suggerimento}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Consigli Strategici */}
        {profile.consigliStrategici.length > 0 && (
          <div className="mb-8">
            <h4 className="font-heading font-bold text-xl text-[var(--color-text)] mb-4 flex items-center gap-2">
              <span className="text-[var(--color-primary)]">💡</span>
              Consigli Strategici Personalizzati
            </h4>
            <div className="space-y-3">
              {profile.consigliStrategici.map((consiglio, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-primary)]/10 rounded-lg p-4 border border-[var(--color-primary)]/20"
                >
                  <p className="text-sm text-[var(--color-text)] leading-relaxed">
                    {consiglio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA per i-Profile completo */}
        <div className="bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 rounded-lg p-6 border-2 border-[var(--color-primary)]/30 mb-6">
          <div className="text-center mb-4">
            <p className="text-lg font-bold text-[var(--color-text)] mb-2">
              📊 Vuoi l'Analisi Completa i-Profile?
            </p>
            <p className="text-sm text-[var(--color-subtext)] mb-4">
              Questo è solo un teaser di 8 domande. L'i-Profile ufficiale OSM ti offre:
            </p>
          </div>
          <ul className="text-sm text-[var(--color-subtext)] space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-primary)] mt-1">✓</span>
              <span><strong>Questionario professionale</strong> che misura <strong>18 caratteristiche attitudinali</strong> fondamentali (ESSERE-FARE-AVERE)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-primary)] mt-1">✓</span>
              <span><strong>Report completo</strong> con analisi dettagliata delle tue abitudini manageriali e visualizzazioni professionali</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-primary)] mt-1">✓</span>
              <span><strong>Debrief personalizzato</strong> di 60-90 minuti con valutatore certificato OSM e piano d'azione concreto</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-primary)] mt-1">✓</span>
              <span><strong>Validità scientifica .75</strong> (tra i più alti coefficienti sul mercato internazionale) per predire performance lavorative</span>
            </li>
          </ul>
          <CTA href="/i-profile" variant="primary" size="base" className="w-full">
            Scopri i-Profile Completo →
          </CTA>
        </div>

        <button
          onClick={resetQuestionnaire}
          className="w-full text-sm text-[var(--color-subtext)] hover:text-[var(--color-primary)] transition-colors py-2"
        >
          ↻ Rifai il questionario
        </button>

        <p className="text-xs text-[var(--color-subtext)] text-center mt-4 leading-relaxed">
          ⚠️ <strong>Disclaimer:</strong> Questo teaser non sostituisce l'i-Profile ufficiale OSM. I risultati sono indicativi e basati su un campione ridotto di domande. Per un'analisi completa e validata, richiedi l'i-Profile ufficiale.
        </p>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[var(--color-text)]">
            Domanda {currentQuestion + 1} di {questions.length}
          </span>
          <span className="text-xs text-[var(--color-subtext)]">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-[var(--color-line)] rounded-full h-2">
          <div
            className="bg-[var(--color-primary)] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-6">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(question.id, option.value)}
            className="w-full text-left px-4 py-3 border-2 border-[var(--color-line)] rounded-lg hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all"
          >
            <span className="text-[var(--color-text)] font-medium">{option.label}</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-[var(--color-subtext)] text-center mt-6">
        Mini-check attitudinale • Non è l'i-Profile ufficiale
      </p>
    </div>
  );
}
