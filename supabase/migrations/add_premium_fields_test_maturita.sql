-- Migration: Aggiunta campi premium per AI Readiness Scan
-- Data: 2025-11-23
-- Descrizione: Aggiunge campi per output premium (8 sezioni di valore)

-- Aggiungi colonna per descrizione livello
ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS livello_description TEXT;

-- Aggiungi colonne JSONB per dati premium
ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS diagnosi JSONB DEFAULT '{}'::jsonb;

ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS quick_wins JSONB DEFAULT '[]'::jsonb;

ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS piano_30_60_90 JSONB DEFAULT '{}'::jsonb;

ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS roi_stimato JSONB DEFAULT '{}'::jsonb;

ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS benchmark JSONB DEFAULT '{}'::jsonb;

ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS roadmap_pilastri JSONB DEFAULT '[]'::jsonb;

ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS risorse_bonus JSONB DEFAULT '[]'::jsonb;

ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS next_steps JSONB DEFAULT '{}'::jsonb;

-- Aggiungi percentage per tracking score
ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS percentage NUMERIC(5,2);

-- Commenti per documentazione
COMMENT ON COLUMN test_maturita_digitale.livello_description IS 'Descrizione testuale del livello (es: "Primi Passi Digitali", "Leader Digitale")';
COMMENT ON COLUMN test_maturita_digitale.diagnosi IS 'Diagnosi personalizzata con opportunità (ore liberabili, costo opportunità, lead increase, errori reduction)';
COMMENT ON COLUMN test_maturita_digitale.quick_wins IS 'Array di 3 quick wins con titolo, tempo_setup, risparmio/impatto, come';
COMMENT ON COLUMN test_maturita_digitale.piano_30_60_90 IS 'Piano strutturato per 3 mesi (mese1, mese2, mese3) con focus, obiettivi e target';
COMMENT ON COLUMN test_maturita_digitale.roi_stimato IS 'ROI calculation con investimento, risparmi annui, maggiori vendite, benefici totali, roi_percentage, payback_mesi';
COMMENT ON COLUMN test_maturita_digitale.benchmark IS 'Benchmark per categoria (tuo score vs media settore vs top 10%)';
COMMENT ON COLUMN test_maturita_digitale.roadmap_pilastri IS 'Array roadmap per pilastro con punteggio, priorità, icon, azioni';
COMMENT ON COLUMN test_maturita_digitale.risorse_bonus IS 'Array di risorse bonus (toolkit, template, guide)';
COMMENT ON COLUMN test_maturita_digitale.next_steps IS 'Next steps strutturati (immediato, settimana, mese)';
COMMENT ON COLUMN test_maturita_digitale.percentage IS 'Percentuale score totale (0-100)';

-- Index per ricerche su livello
CREATE INDEX IF NOT EXISTS idx_test_maturita_livello ON test_maturita_digitale(livello_maturita);
CREATE INDEX IF NOT EXISTS idx_test_maturita_percentage ON test_maturita_digitale(percentage DESC);

-- Esempio struttura dati per riferimento:
/*
diagnosi esempio:
{
  "livello": "Primi Passi Digitali",
  "opportunita": {
    "ore_liberabili": "12-16 ore/settimana",
    "costo_opportunita": "€1.680-€2.240/mese",
    "lead_increase": "+35% lead qualificati",
    "errori_reduction": "60%"
  }
}

quick_wins esempio:
[
  {
    "titolo": "Automatizza Conferme Ordine/Richieste",
    "tempo_setup": "2 ore",
    "risparmio": "4 ore/settimana",
    "come": "Template email automatiche con trigger"
  }
]

roi_stimato esempio:
{
  "investimento": "€4.000",
  "risparmi_annui": "€18.200",
  "maggiori_vendite": "€12.740",
  "meno_errori": "€3.000",
  "totale_benefici": "€33.940",
  "roi_percentage": "748%",
  "payback_mesi": "1.4 mesi"
}
*/
