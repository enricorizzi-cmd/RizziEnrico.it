# 🔍 VERIFICA FINALE DATABASE - Test Maturità Digitale Premium

## 📋 Istruzioni per Verifica e Pulizia Database Supabase

Questo documento contiene **3 query SQL precise** da eseguire nella Dashboard di Supabase per verificare che il database sia perfettamente allineato con il Test Premium.

---

## ✅ STEP 1: VERIFICA STRUTTURALE

**Obiettivo**: Verificare che esistano esattamente le **15 colonne Premium** nella tabella `test_maturita_digitale`.

### Query SQL:

```sql
-- Verifica colonne Premium nella tabella test_maturita_digitale
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'test_maturita_digitale'
AND column_name IN (
    -- Campi base (2)
    'livello_description',
    'percentage',
    -- Campi Premium v2.0 (12)
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
)
ORDER BY column_name;
```

### Risultato Atteso:
- **15 righe** (una per ogni colonna)
- Tutte le colonne devono avere `data_type` appropriato (TEXT, JSONB, NUMERIC)
- `is_nullable` deve essere `YES` per tutte (sono opzionali)

### ⚠️ Se mancano colonne:
Esegui la migration completa:
```sql
-- Esegui il contenuto del file:
-- supabase/migrations/add_premium_fields_test_maturita.sql
```

---

## 🔍 STEP 2: ANALISI "SPORCO" vs "PERFETTO"

**Obiettivo**: Identificare quanti record sono **vecchi (legacy)** e quanti sono **perfetti (premium)**.

### Query SQL:

```sql
-- Analisi record: Legacy vs Premium
WITH record_analysis AS (
    SELECT 
        id,
        nome,
        email,
        created_at,
        -- Verifica campi premium
        CASE 
            WHEN livello_description IS NOT NULL 
                AND percentage IS NOT NULL
                AND profilazione IS NOT NULL
                AND colli_bottiglia IS NOT NULL
                AND collo_bottiglia_primario IS NOT NULL
                AND capacita_crescita IS NOT NULL
                AND diagnosi IS NOT NULL
                AND priorita_azione IS NOT NULL
                AND roadmap_scalabilita IS NOT NULL
                AND investimento_suggerito IS NOT NULL
                AND benchmark IS NOT NULL
                AND roadmap_pilastri IS NOT NULL
                AND risorse_bonus IS NOT NULL
                AND next_steps IS NOT NULL
            THEN 'PREMIUM ✅'
            ELSE 'LEGACY ⚠️'
        END AS tipo_record,
        -- Conta campi mancanti
        (
            CASE WHEN livello_description IS NULL THEN 1 ELSE 0 END +
            CASE WHEN percentage IS NULL THEN 1 ELSE 0 END +
            CASE WHEN profilazione IS NULL THEN 1 ELSE 0 END +
            CASE WHEN colli_bottiglia IS NULL THEN 1 ELSE 0 END +
            CASE WHEN collo_bottiglia_primario IS NULL THEN 1 ELSE 0 END +
            CASE WHEN capacita_crescita IS NULL THEN 1 ELSE 0 END +
            CASE WHEN diagnosi IS NULL THEN 1 ELSE 0 END +
            CASE WHEN priorita_azione IS NULL THEN 1 ELSE 0 END +
            CASE WHEN roadmap_scalabilita IS NULL THEN 1 ELSE 0 END +
            CASE WHEN investimento_suggerito IS NULL THEN 1 ELSE 0 END +
            CASE WHEN benchmark IS NULL THEN 1 ELSE 0 END +
            CASE WHEN roadmap_pilastri IS NULL THEN 1 ELSE 0 END +
            CASE WHEN risorse_bonus IS NULL THEN 1 ELSE 0 END +
            CASE WHEN next_steps IS NULL THEN 1 ELSE 0 END
        ) AS campi_mancanti
    FROM test_maturita_digitale
)
SELECT 
    tipo_record,
    COUNT(*) as totale,
    ROUND(AVG(campi_mancanti), 1) as media_campi_mancanti,
    MIN(created_at) as primo_record,
    MAX(created_at) as ultimo_record
FROM record_analysis
GROUP BY tipo_record
ORDER BY tipo_record;
```

### Risultato Atteso:
- **PREMIUM ✅**: Record completi con tutti i 15 campi
- **LEGACY ⚠️**: Record vecchi creati prima della migration (campi mancanti)

### 📊 Query Dettaglio Record Legacy:

```sql
-- Dettaglio record legacy (per pulizia mirata)
SELECT 
    id,
    nome,
    email,
    created_at,
    (
        CASE WHEN livello_description IS NULL THEN 1 ELSE 0 END +
        CASE WHEN percentage IS NULL THEN 1 ELSE 0 END +
        CASE WHEN profilazione IS NULL THEN 1 ELSE 0 END +
        CASE WHEN colli_bottiglia IS NULL THEN 1 ELSE 0 END +
        CASE WHEN collo_bottiglia_primario IS NULL THEN 1 ELSE 0 END +
        CASE WHEN capacita_crescita IS NULL THEN 1 ELSE 0 END +
        CASE WHEN diagnosi IS NULL THEN 1 ELSE 0 END +
        CASE WHEN priorita_azione IS NULL THEN 1 ELSE 0 END +
        CASE WHEN roadmap_scalabilita IS NULL THEN 1 ELSE 0 END +
        CASE WHEN investimento_suggerito IS NULL THEN 1 ELSE 0 END +
        CASE WHEN benchmark IS NULL THEN 1 ELSE 0 END +
        CASE WHEN roadmap_pilastri IS NULL THEN 1 ELSE 0 END +
        CASE WHEN risorse_bonus IS NULL THEN 1 ELSE 0 END +
        CASE WHEN next_steps IS NULL THEN 1 ELSE 0 END
    ) AS campi_mancanti
FROM test_maturita_digitale
WHERE livello_description IS NULL 
   OR percentage IS NULL
   OR profilazione IS NULL
   OR colli_bottiglia IS NULL
   OR collo_bottiglia_primario IS NULL
   OR capacita_crescita IS NULL
   OR diagnosi IS NULL
   OR priorita_azione IS NULL
   OR roadmap_scalabilita IS NULL
   OR investimento_suggerito IS NULL
   OR benchmark IS NULL
   OR roadmap_pilastri IS NULL
   OR risorse_bonus IS NULL
   OR next_steps IS NULL
ORDER BY created_at DESC;
```

---

## 🧹 STEP 3: PULIZIA TOTALE (OPZIONALE)

**⚠️ ATTENZIONE**: Questa query **CANCELLA TUTTI I RECORD** dalla tabella `test_maturita_digitale`.

**Usa SOLO se vuoi partire con un database completamente pulito per il lancio.**

### Query SQL:

```sql
-- ⚠️ PULIZIA TOTALE - ATTENZIONE: CANCELLA TUTTO
-- Esegui SOLO se vuoi partire da zero

-- Verifica prima quanti record verranno cancellati
SELECT COUNT(*) as totale_record_da_cancellare
FROM test_maturita_digitale;

-- Se sei sicuro, esegui la cancellazione:
-- DELETE FROM test_maturita_digitale;

-- Verifica che sia vuoto
-- SELECT COUNT(*) FROM test_maturita_digitale; -- Dovrebbe essere 0
```

### ⚠️ Alternativa: Pulizia Solo Record Legacy

Se vuoi mantenere i record Premium e cancellare solo quelli legacy:

```sql
-- Cancella SOLO i record legacy (mantieni quelli premium)
DELETE FROM test_maturita_digitale
WHERE livello_description IS NULL 
   OR percentage IS NULL
   OR profilazione IS NULL
   OR colli_bottiglia IS NULL
   OR collo_bottiglia_primario IS NULL
   OR capacita_crescita IS NULL
   OR diagnosi IS NULL
   OR priorita_azione IS NULL
   OR roadmap_scalabilita IS NULL
   OR investimento_suggerito IS NULL
   OR benchmark IS NULL
   OR roadmap_pilastri IS NULL
   OR risorse_bonus IS NULL
   OR next_steps IS NULL;
```

---

## ✅ CHECKLIST FINALE

Dopo aver eseguito le query, verifica:

- [ ] **STEP 1**: Tutte le 15 colonne Premium esistono nella tabella
- [ ] **STEP 2**: Hai identificato quanti record sono Legacy vs Premium
- [ ] **STEP 3**: (Opzionale) Hai pulito i record legacy se necessario
- [ ] **Verifica Indici**: Gli indici per performance sono creati

### Query Verifica Indici:

```sql
-- Verifica indici creati
SELECT 
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'test_maturita_digitale'
ORDER BY indexname;
```

### Indici Attesi:
- `idx_test_maturita_livello` (su `livello_maturita`)
- `idx_test_maturita_percentage` (su `percentage DESC`)
- `idx_test_maturita_created` (su `created_at DESC`)
- `idx_test_maturita_settore` (GIN su `profilazione->'settore'`)
- `idx_test_maturita_collo_primario` (su `collo_bottiglia_primario`)

---

## 🎯 RISULTATO FINALE

Dopo aver eseguito tutte le verifiche, il database dovrebbe essere:

✅ **Struttura Completa**: 15 colonne Premium presenti  
✅ **Dati Puliti**: Solo record Premium (o nessun record se pulizia totale)  
✅ **Performance Ottimizzata**: Tutti gli indici creati  
✅ **Pronto per Produzione**: Database immacolato per il lancio

---

## 📝 NOTE IMPORTANTI

1. **Backup Prima della Pulizia**: Se hai dati importanti, fai un backup prima di eseguire STEP 3
2. **Test in Dev**: Se possibile, testa le query su un database di sviluppo prima
3. **Verifica RLS**: Assicurati che le RLS policies siano ancora attive dopo le modifiche

### Query Verifica RLS:

```sql
-- Verifica RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'test_maturita_digitale';
```

---

**Data Creazione**: 2025-11-23  
**Versione**: 1.0  
**Status**: ✅ Pronto per Esecuzione

