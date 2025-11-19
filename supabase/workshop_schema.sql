-- Schema Supabase per Workshop "Automatizza la tua Azienda: AI & Digitalizzazione"
-- Data evento: 12 dicembre 2024

-- Tabella workshop_leads (registrazioni al workshop)
CREATE TABLE IF NOT EXISTS workshop_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Dati anagrafici
  nome TEXT NOT NULL,
  cognome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  
  -- Dati azienda
  azienda TEXT NOT NULL,
  ruolo TEXT NOT NULL,
  provincia TEXT NOT NULL,
  
  -- Fonte e problema
  fonte TEXT NOT NULL CHECK (fonte IN ('BNI', 'OSM', 'Social', 'Passaparola', 'Altro')),
  problema TEXT, -- "Qual è oggi il principale problema che senti sulla digitalizzazione/marketing nella tua azienda?"
  
  -- Stato del lead
  stato TEXT NOT NULL DEFAULT 'nuovo' CHECK (stato IN ('nuovo', 'contattato', 'confermato', 'presente', 'no_show', 'non_interessato', 'da_chiamare_per_checkup', 'in_valutazione', 'checkup_venduto')),
  
  -- Tracking chiamate
  numero_chiamate INTEGER DEFAULT 0,
  ultima_chiamata TIMESTAMPTZ,
  
  -- Note e metadata
  note TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Evento (per future estensioni)
  evento TEXT DEFAULT 'Workshop 12.12.2024',
  campagna TEXT DEFAULT 'Automatizza la tua Azienda'
);

-- Tabella test_maturita_digitale (risultati test)
CREATE TABLE IF NOT EXISTS test_maturita_digitale (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Collegamento al lead workshop
  workshop_lead_id UUID REFERENCES workshop_leads(id) ON DELETE SET NULL,
  
  -- Dati anagrafici (se compilato senza registrazione workshop)
  nome TEXT,
  cognome TEXT,
  email TEXT,
  azienda TEXT,
  
  -- Risposte test (JSONB per flessibilità)
  risposte JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Scoring
  punteggio_totale INTEGER DEFAULT 0,
  punteggio_per_categoria JSONB DEFAULT '{}'::jsonb,
  
  -- Risultato e raccomandazioni
  livello_maturita TEXT CHECK (livello_maturita IN ('Iniziale', 'Base', 'Intermedio', 'Avanzato', 'Eccellente')),
  raccomandazioni JSONB DEFAULT '[]'::jsonb,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indici per performance
CREATE INDEX IF NOT EXISTS idx_workshop_leads_email ON workshop_leads(email);
CREATE INDEX IF NOT EXISTS idx_workshop_leads_stato ON workshop_leads(stato);
CREATE INDEX IF NOT EXISTS idx_workshop_leads_fonte ON workshop_leads(fonte);
CREATE INDEX IF NOT EXISTS idx_workshop_leads_evento ON workshop_leads(evento);
CREATE INDEX IF NOT EXISTS idx_workshop_leads_created_at ON workshop_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_test_maturita_lead_id ON test_maturita_digitale(workshop_lead_id);
CREATE INDEX IF NOT EXISTS idx_test_maturita_email ON test_maturita_digitale(email);

-- RLS Policies
ALTER TABLE workshop_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_maturita_digitale ENABLE ROW LEVEL SECURITY;

-- Policy: chiunque può inserire registrazioni workshop
CREATE POLICY "Anyone can insert workshop leads" ON workshop_leads
  FOR INSERT WITH CHECK (true);

-- Policy: chiunque può inserire test maturità
CREATE POLICY "Anyone can insert test maturita" ON test_maturita_digitale
  FOR INSERT WITH CHECK (true);

-- Policy: solo admin può leggere (verrà gestito via service role key)
CREATE POLICY "Admin can view workshop leads" ON workshop_leads
  FOR SELECT USING (false); -- Disabilitato, si usa service role key

CREATE POLICY "Admin can view test maturita" ON test_maturita_digitale
  FOR SELECT USING (false); -- Disabilitato, si usa service role key

-- Policy: solo admin può aggiornare
CREATE POLICY "Admin can update workshop leads" ON workshop_leads
  FOR UPDATE USING (false); -- Disabilitato, si usa service role key

