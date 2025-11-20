import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();

    // Ottieni tutti i test compilati
    const { data: tests, error } = await supabase
      .from('test_maturita_digitale')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Errore nel caricamento test' },
        { status: 500 }
      );
    }

    const totalTests = tests?.length || 0;

    if (totalTests === 0) {
      return NextResponse.json({
        summary: {
          total_tests: 0,
          average_score: 0,
          average_level: null,
        },
        by_level: {},
        by_category: {},
        score_distribution: [],
        timeline: [],
      });
    }

    // Analisi per livello
    const byLevel: Record<string, number> = {};
    const byCategory: Record<string, { total: number; average: number }> = {};
    const scoreDistribution: Array<{ range: string; count: number }> = [
      { range: '0-20', count: 0 },
      { range: '21-40', count: 0 },
      { range: '41-60', count: 0 },
      { range: '61-80', count: 0 },
      { range: '81-100', count: 0 },
    ];

    let totalScore = 0;
    const categoryScores: Record<string, number[]> = {};

    tests?.forEach(test => {
      // Per livello (il campo nel DB è livello_maturita)
      const level = test.livello_maturita || 'Non definito';
      byLevel[level] = (byLevel[level] || 0) + 1;

      // Per categoria (usa punteggio_per_categoria dal DB)
      if (test.punteggio_per_categoria) {
        const punteggiCategoria = typeof test.punteggio_per_categoria === 'string' 
          ? JSON.parse(test.punteggio_per_categoria) 
          : test.punteggio_per_categoria;
        
        if (punteggiCategoria && typeof punteggiCategoria === 'object') {
          Object.entries(punteggiCategoria).forEach(([category, score]: [string, any]) => {
            if (!byCategory[category]) {
              byCategory[category] = { total: 0, average: 0 };
              categoryScores[category] = [];
            }
            byCategory[category].total++;
            categoryScores[category].push(score);
          });
        }
      }

      // Distribuzione punteggi
      const score = test.punteggio_totale || 0;
      totalScore += score;

      if (score <= 20) scoreDistribution[0].count++;
      else if (score <= 40) scoreDistribution[1].count++;
      else if (score <= 60) scoreDistribution[2].count++;
      else if (score <= 80) scoreDistribution[3].count++;
      else scoreDistribution[4].count++;
    });

    // Calcola massimo possibile per ogni categoria (basato sulle domande)
    const categoryMaxScores: Record<string, number> = {
      "Raccolta Dati & CRM": 7, // 3+2+2
      "Automazioni Base": 7, // 3+2+2
      "Presenza Online": 6, // 2+2+2
      "KPI & Dashboard": 7, // 3+2+2
      "Uso dell'IA": 6, // 2+2+2
      "Digitalizzazione Aziendale": 13, // 3+2+3+2+3
      "AI nei Processi Operativi": 13, // 3+3+2+2+3
    };

    // Calcola medie per categoria (converti in percentuale)
    Object.keys(byCategory).forEach(category => {
      const scores = categoryScores[category];
      if (scores.length > 0) {
        const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        const maxScore = categoryMaxScores[category] || 10; // Default 10 se categoria non trovata
        // Converti in percentuale: (punteggio_medio / punteggio_massimo) * 100
        byCategory[category].average = Math.round(
          (averageScore / maxScore) * 100 * 100
        ) / 100;
      }
    });

    // Timeline (test per data)
    const timeline: Array<{ date: string; count: number }> = [];
    tests?.forEach(test => {
      const date = new Date(test.created_at).toISOString().split('T')[0];
      const existing = timeline.find(t => t.date === date);
      if (existing) {
        existing.count++;
      } else {
        timeline.push({ date, count: 1 });
      }
    });

    timeline.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Livelli più comuni
    const levelDistribution = Object.entries(byLevel)
      .map(([level, count]) => ({ level, count, percentage: (count / totalTests) * 100 }))
      .sort((a, b) => b.count - a.count);

    // Media punteggio totale
    const averageScore = Math.round((totalScore / totalTests) * 100) / 100;

    // Livello più comune
    const mostCommonLevel = levelDistribution.length > 0 ? levelDistribution[0].level : null;

    return NextResponse.json({
      summary: {
        total_tests: totalTests,
        average_score: averageScore,
        average_level: mostCommonLevel,
        level_distribution: levelDistribution,
      },
      by_level: byLevel,
      by_category: byCategory,
      score_distribution: scoreDistribution,
      timeline: timeline,
      recent_tests: tests?.slice(0, 10).map(test => ({
        id: test.id,
        nome: test.nome,
        cognome: test.cognome,
        email: test.email,
        punteggio: test.punteggio_totale,
        livello: test.livello_maturita || 'Non definito',
        created_at: test.created_at,
      })),
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

