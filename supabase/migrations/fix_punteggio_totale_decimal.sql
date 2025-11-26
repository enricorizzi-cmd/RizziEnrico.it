-- Migration: Fix punteggio_totale per supportare valori decimali
-- Data: 2025-01-XX
-- Descrizione: Cambia il tipo di punteggio_totale da INTEGER a NUMERIC per supportare punteggi decimali (es: 50.5)
-- 
-- PROBLEMA RISOLTO:
-- Errore: "invalid input syntax for type integer: '50.5'"
-- Il campo punteggio_totale era INTEGER ma il codice calcola punteggi decimali

-- ============================================
-- STEP 1: Cambia tipo colonna da INTEGER a NUMERIC
-- ============================================

-- Cambia il tipo da INTEGER a NUMERIC(10,2) per supportare decimali fino a 2 cifre
ALTER TABLE test_maturita_digitale 
ALTER COLUMN punteggio_totale TYPE NUMERIC(10,2) USING punteggio_totale::NUMERIC(10,2);

-- Mantieni il default a 0
ALTER TABLE test_maturita_digitale 
ALTER COLUMN punteggio_totale SET DEFAULT 0;

-- ============================================
-- STEP 2: Verifica
-- ============================================

-- Verifica che il tipo sia stato cambiato correttamente
DO $$
DECLARE
    current_type TEXT;
BEGIN
    SELECT data_type INTO current_type
    FROM information_schema.columns
    WHERE table_name = 'test_maturita_digitale'
    AND column_name = 'punteggio_totale';
    
    IF current_type = 'numeric' THEN
        RAISE NOTICE '✅ Migration completata: punteggio_totale è ora NUMERIC';
    ELSE
        RAISE EXCEPTION '❌ Errore: punteggio_totale è ancora %', current_type;
    END IF;
END $$;

-- ============================================
-- MIGRATION COMPLETATA
-- ============================================

