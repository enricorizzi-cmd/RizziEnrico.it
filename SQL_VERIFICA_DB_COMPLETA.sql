-- ============================================
-- SQL VERIFICA DATABASE COMPLETA
-- Test Maturità Digitale Premium (€500)
-- ============================================

-- ✅ 1. VERIFICA STRUTTURA COMPLETA (15 campi premium)
SELECT 
    column_name,
    data_type,
    column_default,
    is_nullable,
    CASE 
        WHEN column_name IN (
            'livello_description', 'percentage', 'profilazione', 'colli_bottiglia',
            'collo_bottiglia_primario', 'capacita_crescita', 'diagnosi', 'priorita_azione',
            'roadmap_scalabilita', 'investimento_suggerito', 'benchmark', 'roadmap_pilastri',
            'risorse_bonus', 'next_steps', 'raccomandazioni'
        ) THEN '✅ PREMIUM'
        ELSE 'LEGACY'
    END as tipo_campo
FROM information_schema.columns
WHERE table_name = 'test_maturita_digitale'
AND column_name IN (
    'livello_description', 'percentage', 'profilazione', 'colli_bottiglia',
    'collo_bottiglia_primario', 'capacita_crescita', 'diagnosi', 'priorita_azione',
    'roadmap_scalabilita', 'investimento_suggerito', 'benchmark', 'roadmap_pilastri',
    'risorse_bonus', 'next_steps', 'raccomandazioni'
)
ORDER BY column_name;

-- ✅ 2. VERIFICA DEFAULT VALUE colli_bottiglia (DEVE ESSERE ARRAY [])
SELECT 
    column_name,
    column_default,
    CASE 
        WHEN column_default LIKE '%[]%' THEN '✅ ARRAY (CORRETTO)'
        WHEN column_default LIKE '%{}%' THEN '❌ OGGETTO VUOTO (DA CORREGGERE)'
        ELSE '⚠️ ALTRO'
    END as stato,
    CASE 
        WHEN column_default LIKE '%[]%' THEN 'OK'
        ELSE 'DA CORREGGERE'
    END as azione
FROM information_schema.columns
WHERE table_name = 'test_maturita_digitale'
AND column_name = 'colli_bottiglia';

-- ✅ 3. VERIFICA INDEXES PERFORMANCE (GIN per JSONB)
SELECT 
    indexname,
    indexdef,
    CASE 
        WHEN indexdef LIKE '%GIN%' THEN '✅ GIN (OTTIMALE)'
        WHEN indexdef LIKE '%BTREE%' THEN '⚠️ BTREE (OK)'
        ELSE '❓ ALTRO'
    END as tipo_index
FROM pg_indexes
WHERE tablename = 'test_maturita_digitale'
AND (
    indexname LIKE '%profilazione%' 
    OR indexname LIKE '%colli%' 
    OR indexname LIKE '%benchmark%'
    OR indexname LIKE '%roadmap%'
)
ORDER BY indexname;

-- ✅ 4. ANALISI RECORD ESISTENTI - Struttura Dati
SELECT 
    id,
    nome,
    email,
    created_at,
    jsonb_typeof(colli_bottiglia) as tipo_colli,
    jsonb_typeof(profilazione) as tipo_profilazione,
    jsonb_typeof(roadmap_pilastri) as tipo_roadmap,
    jsonb_typeof(benchmark) as tipo_benchmark,
    CASE 
        WHEN jsonb_typeof(colli_bottiglia) = 'array' THEN jsonb_array_length(colli_bottiglia)
        WHEN jsonb_typeof(colli_bottiglia) = 'object' THEN 0
        ELSE 0
    END as numero_colli,
    collo_bottiglia_primario IS NOT NULL as ha_collo_primario,
    CASE 
        WHEN jsonb_typeof(colli_bottiglia) = 'array' THEN '✅ ARRAY (CORRETTO)'
        WHEN jsonb_typeof(colli_bottiglia) = 'object' THEN '⚠️ OGGETTO (LEGACY)'
        WHEN colli_bottiglia IS NULL THEN '⚠️ NULL'
        ELSE '❓ ALTRO'
    END as stato_colli
FROM test_maturita_digitale
ORDER BY created_at DESC
LIMIT 10;

-- ✅ 5. VERIFICA COMMENTI COLONNE (Documentazione)
SELECT 
    c.column_name,
    pgd.description as commento,
    CASE 
        WHEN pgd.description IS NOT NULL THEN '✅ DOCUMENTATO'
        ELSE '⚠️ MANCA COMMENTO'
    END as stato_documentazione
FROM information_schema.columns c
LEFT JOIN pg_catalog.pg_statio_all_tables st ON st.schemaname = c.table_schema AND st.relname = c.table_name
LEFT JOIN pg_catalog.pg_description pgd ON pgd.objoid = st.relid AND pgd.objsubid = c.ordinal_position
WHERE c.table_name = 'test_maturita_digitale'
AND c.column_name IN (
    'profilazione', 'colli_bottiglia', 'roadmap_pilastri', 
    'benchmark', 'diagnosi', 'investimento_suggerito'
)
ORDER BY c.column_name;

-- ✅ 6. VERIFICA RLS POLICIES (Sicurezza)
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    CASE 
        WHEN cmd = 'SELECT' AND roles::text LIKE '%authenticated%' THEN '✅ SELECT OK'
        WHEN cmd = 'INSERT' AND roles::text LIKE '%anon%' THEN '✅ INSERT OK'
        WHEN cmd = 'UPDATE' AND roles::text LIKE '%authenticated%' THEN '✅ UPDATE OK'
        ELSE '⚠️ DA VERIFICARE'
    END as stato_policy
FROM pg_policies
WHERE tablename = 'test_maturita_digitale'
ORDER BY policyname;

-- ✅ 7. DETTAGLIO ULTIMO TEST SALVATO (Verifica Completa)
SELECT 
    id,
    nome,
    email,
    azienda,
    created_at,
    livello_maturita,
    percentage,
    -- Profilazione
    profilazione->>'ruolo' as ruolo,
    profilazione->>'settore' as settore,
    profilazione->>'dimensione' as dimensione,
    -- Colli di Bottiglia
    jsonb_typeof(colli_bottiglia) as tipo_colli,
    CASE 
        WHEN jsonb_typeof(colli_bottiglia) = 'array' THEN jsonb_array_length(colli_bottiglia)
        ELSE 0
    END as numero_colli,
    colli_bottiglia as colli_completi,
    collo_bottiglia_primario,
    -- Altri campi premium
    capacita_crescita,
    jsonb_typeof(diagnosi) as tipo_diagnosi,
    jsonb_typeof(roadmap_pilastri) as tipo_roadmap,
    jsonb_typeof(benchmark) as tipo_benchmark,
    jsonb_typeof(investimento_suggerito) as tipo_investimento
FROM test_maturita_digitale
ORDER BY created_at DESC
LIMIT 1;

-- ✅ 8. STATISTICHE GENERALE
SELECT 
    COUNT(*) as totale_test,
    COUNT(CASE WHEN jsonb_typeof(colli_bottiglia) = 'array' THEN 1 END) as test_con_array,
    COUNT(CASE WHEN jsonb_typeof(colli_bottiglia) = 'object' THEN 1 END) as test_con_oggetto,
    COUNT(CASE WHEN colli_bottiglia IS NULL THEN 1 END) as test_null,
    COUNT(CASE WHEN profilazione IS NOT NULL THEN 1 END) as test_con_profilazione,
    COUNT(CASE WHEN roadmap_pilastri IS NOT NULL THEN 1 END) as test_con_roadmap,
    COUNT(CASE WHEN benchmark IS NOT NULL THEN 1 END) as test_con_benchmark,
    AVG(percentage) as media_percentage,
    MIN(created_at) as primo_test,
    MAX(created_at) as ultimo_test
FROM test_maturita_digitale;

-- ✅ 9. VERIFICA ROADMAP PILASTRI (7 categorie)
SELECT 
    id,
    nome,
    email,
    jsonb_typeof(roadmap_pilastri) as tipo,
    CASE 
        WHEN jsonb_typeof(roadmap_pilastri) = 'object' THEN 
            jsonb_object_keys(roadmap_pilastri)
        ELSE NULL
    END as chiavi_pilastri,
    roadmap_pilastri
FROM test_maturita_digitale
WHERE roadmap_pilastri IS NOT NULL
ORDER BY created_at DESC
LIMIT 1;

-- ✅ 10. VERIFICA TOP 3 COLLI DI BOTTIGLIA (Dettaglio)
SELECT 
    id,
    nome,
    email,
    colli_bottiglia,
    jsonb_array_length(colli_bottiglia) as numero_colli,
    colli_bottiglia->0->>'severity' as collo_1_severity,
    colli_bottiglia->0->>'specifico' as collo_1_specifico,
    colli_bottiglia->1->>'severity' as collo_2_severity,
    colli_bottiglia->1->>'specifico' as collo_2_specifico,
    colli_bottiglia->2->>'severity' as collo_3_severity,
    colli_bottiglia->2->>'specifico' as collo_3_specifico
FROM test_maturita_digitale
WHERE jsonb_typeof(colli_bottiglia) = 'array'
AND jsonb_array_length(colli_bottiglia) > 0
ORDER BY created_at DESC
LIMIT 5;

-- ============================================
-- PULIZIA OPZIONALE (SOLO SE NECESSARIO)
-- ============================================

-- ⚠️ ATTENZIONE: Questa query ELIMINA tutti i record!
-- Usare SOLO per reset completo durante sviluppo
-- DELETE FROM test_maturita_digitale;

-- ============================================
-- TEST INSERIMENTO (SMOKE TEST)
-- ============================================

-- Query per testare inserimento con tutti i campi premium
-- (Non eseguire in produzione, solo per verifica struttura)

/*
INSERT INTO test_maturita_digitale (
    nome, cognome, email, azienda,
    risposte, punteggio_totale, punteggio_per_categoria,
    livello_maturita, livello_description, percentage,
    profilazione, colli_bottiglia, collo_bottiglia_primario,
    capacita_crescita, diagnosi, priorita_azione,
    roadmap_scalabilita, investimento_suggerito, benchmark,
    roadmap_pilastri, risorse_bonus, next_steps
) VALUES (
    'Test', 'User', 'test@example.com', 'Test Azienda',
    '{}'::jsonb, 0, '{}'::jsonb,
    'Iniziale', 'Descrizione test', 0,
    '{"ruolo": "Titolare", "settore": "Servizi"}'::jsonb,
    '[]'::jsonb,
    'Test collo primario',
    '+30%',
    '{"livello": "Test diagnosi"}'::jsonb,
    '[]'::jsonb,
    '{"fase1": {"titolo": "Test"}}'::jsonb,
    '{"livello": "MEDIO"}'::jsonb,
    '{"settore": "Test"}'::jsonb,
    '{"Organizzazione": {"azioni": ["Test"]}}'::jsonb,
    '[]'::jsonb,
    '{"entro_7_giorni": ["Test"]}'::jsonb
);
*/






