-- Migration: Aggiunta campi premium per Check-up Digitale Aziendale
-- Data: 2025-11-23
-- Versione: 2.0 (COMPLETA con tutti i campi nuovi)
-- Descrizione: Aggiunge TUTTI i campi per output premium qualitativo (8+ sezioni)

-- ============================================
-- STEP 1: Campi Base
-- ============================================

-- Aggiungi colonna per descrizione livello
ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS livello_description TEXT;

-- Aggiungi percentage per tracking score
ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS percentage NUMERIC(5,2);

-- ============================================
-- STEP 2: Campi NUOVI Premium (v2.0)
-- ============================================

-- PROFILAZIONE AZIENDALE (6 domande iniziali)
ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS profilazione JSONB DEFAULT '{}'::jsonb;

-- COLLI DI BOTTIGLIA (risposte domande critiche)
ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS colli_bottiglia JSONB DEFAULT '{}'::jsonb;

ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS collo_bottiglia_primario TEXT;

-- CAPACITÀ DI CRESCITA (es: "+30%", "+60%", "+100%+")
ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS capacita_crescita TEXT;

-- DIAGNOSI (con opportunità qualitative)
ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS diagnosi JSONB DEFAULT '{}'::jsonb;

-- PRIORITÀ D'AZIONE (sostituisce quick_wins)
ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS priorita_azione JSONB DEFAULT '[]'::jsonb;

-- ROADMAP SCALABILITÀ (3 fasi progressive)
ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS roadmap_scalabilita JSONB DEFAULT '{}'::jsonb;

-- INVESTIMENTO SUGGERITO (qualitativo, NO €)
ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS investimento_suggerito JSONB DEFAULT '{}'::jsonb;

-- BENCHMARK SETTORE
ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS benchmark JSONB DEFAULT '{}'::jsonb;

-- ROADMAP PILASTRI (con priorità)
ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS roadmap_pilastri JSONB DEFAULT '[]'::jsonb;

-- RISORSE BONUS
ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS risorse_bonus JSONB DEFAULT '[]'::jsonb;

-- NEXT STEPS
ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS next_steps JSONB DEFAULT '{}'::jsonb;

-- RACCOMANDAZIONI (legacy, mantieni per compatibilità)
ALTER TABLE test_maturita_digitale 
ADD COLUMN IF NOT EXISTS raccomandazioni JSONB DEFAULT '[]'::jsonb;

-- ============================================
-- STEP 3: Commenti Documentazione
-- ============================================

COMMENT ON COLUMN test_maturita_digitale.livello_description IS 'Descrizione testuale del livello (es: "In Crescita - Fondamenta da Consolidare")';
COMMENT ON COLUMN test_maturita_digitale.percentage IS 'Percentuale score totale (0-100)';

-- Nuovi campi v2.0
COMMENT ON COLUMN test_maturita_digitale.profilazione IS 'Profilazione aziendale: {ruolo, settore, collaboratori, eta_azienda, obiettivo_12_mesi, tempo_ripetitivo}';
COMMENT ON COLUMN test_maturita_digitale.colli_bottiglia IS 'Risposte domande critiche: {q9_crescita_processo, q14_dipendenza_persone, q19_scalabilita_lead, q27_scalabilita_clienti}';
COMMENT ON COLUMN test_maturita_digitale.collo_bottiglia_primario IS 'Collo di bottiglia principale identificato (es: "Gestione ordini/preventivi")';
COMMENT ON COLUMN test_maturita_digitale.capacita_crescita IS 'Capacità di crescita stimata (es: "+30%", "+60%", "+100%+")';
COMMENT ON COLUMN test_maturita_digitale.diagnosi IS 'Diagnosi personalizzata con {livello, opportunita: {tempo_liberabile, valore_tempo, accelerazione_decisioni, riduzione_errori, note_profilo}}';
COMMENT ON COLUMN test_maturita_digitale.priorita_azione IS 'Array priorità azione [{livello: CRITICA/ALTA/MEDIA, problema, azione, tempo_implementazione, impatto, come}]';
COMMENT ON COLUMN test_maturita_digitale.roadmap_scalabilita IS 'Roadmap 3 fasi: {capacita_attuale, fase1: {titolo, durata, target_crescita, azioni[]}, fase2, fase3}';
COMMENT ON COLUMN test_maturita_digitale.investimento_suggerito IS 'Investimento qualitativo: {livello: MEDIO-ALTO/MEDIO/CONTENUTO, descrizione, tempi_rientro, note}';
COMMENT ON COLUMN test_maturita_digitale.benchmark IS 'Benchmark settore: {settore, [categoria]: {tuo, media_settore, top_10}, note}';
COMMENT ON COLUMN test_maturita_digitale.roadmap_pilastri IS 'Array roadmap [{pilastro, punteggio, priorita, icon, azioni_consigliate[]}]';
COMMENT ON COLUMN test_maturita_digitale.risorse_bonus IS 'Array risorse personalizzate ["Checklist...", "Template..."]';
COMMENT ON COLUMN test_maturita_digitale.next_steps IS 'Next steps: {questa_settimana[], entro_15_giorni[]}';
COMMENT ON COLUMN test_maturita_digitale.raccomandazioni IS 'Array raccomandazioni legacy (mantieni per compatibilità)';

-- ============================================
-- STEP 4: Indici Performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_test_maturita_livello ON test_maturita_digitale(livello_maturita);
CREATE INDEX IF NOT EXISTS idx_test_maturita_percentage ON test_maturita_digitale(percentage DESC);
CREATE INDEX IF NOT EXISTS idx_test_maturita_created ON test_maturita_digitale(created_at DESC);

-- Indici JSONB per query avanzate (opzionali ma utili)
CREATE INDEX IF NOT EXISTS idx_test_maturita_settore ON test_maturita_digitale USING GIN ((profilazione->'settore'));
CREATE INDEX IF NOT EXISTS idx_test_maturita_collo_primario ON test_maturita_digitale(collo_bottiglia_primario);

-- ============================================
-- MIGRATION COMPLETATA
-- ============================================

-- Verifica che tutto sia ok
DO $$
DECLARE
    colonne_aggiunte INTEGER;
BEGIN
    SELECT COUNT(*) INTO colonne_aggiunte
    FROM information_schema.columns
    WHERE table_name = 'test_maturita_digitale'
    AND column_name IN (
        'profilazione',
        'colli_bottiglia', 
        'collo_bottiglia_primario',
        'capacita_crescita',
        'diagnosi',
        'priorita_azione',
        'roadmap_scalabilita',
        'investimento_suggerito',
        'benchmark',
        'roadmap_pilastri',
        'risorse_bonus',
        'next_steps'
    );
    
    IF colonne_aggiunte = 12 THEN
        RAISE NOTICE '✅ Migration completata con successo! % colonne aggiunte.', colonne_aggiunte;
    ELSE
        RAISE WARNING '⚠️ Attenzione: solo % colonne su 12 trovate', colonne_aggiunte;
    END IF;
END $$;
