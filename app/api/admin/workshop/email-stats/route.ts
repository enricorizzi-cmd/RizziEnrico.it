import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();

    // Ottieni tutti i lead
    const { data: leads, error } = await supabase
      .from('workshop_leads')
      .select('*')
      .eq('evento', 'Workshop 12.12.2024');

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Errore nel caricamento lead' },
        { status: 500 }
      );
    }

    // Analizza metadata per tracciare email inviate
    const emailTypes = [
      'email_conferma_iscrizione_sent',
      'email_5_giorni_sent',
      'email_10_giorni_sent',
      'email_3_giorni_sent',
      'email_giorno_evento_sent',
      'email_post_immediata_sent',
      'email_post_24h_sent',
      'email_post_48h_sent',
    ];

    const emailStats: Record<string, {
      total: number;
      sent: number;
      not_sent: number;
      details: Array<{
        lead_id: string;
        nome: string;
        cognome: string;
        email: string;
        sent_at: string | null;
      }>;
    }> = {};

    // Inizializza stats per ogni tipo di email
    emailTypes.forEach(type => {
      emailStats[type] = {
        total: 0,
        sent: 0,
        not_sent: 0,
        details: [],
      };
    });

    // Analizza ogni lead
    leads?.forEach(lead => {
      const metadata = (lead.metadata as any) || {};
      
      emailTypes.forEach(type => {
        emailStats[type].total++;
        
        if (metadata[type]) {
          emailStats[type].sent++;
          emailStats[type].details.push({
            lead_id: lead.id,
            nome: lead.nome,
            cognome: lead.cognome,
            email: lead.email,
            sent_at: metadata[type],
          });
        } else {
          emailStats[type].not_sent++;
          emailStats[type].details.push({
            lead_id: lead.id,
            nome: lead.nome,
            cognome: lead.cognome,
            email: lead.email,
            sent_at: null,
          });
        }
      });
    });

    // Calcola statistiche aggregate
    const totalLeads = leads?.length || 0;
    const totalEmailsSent = Object.values(emailStats).reduce((sum, stat) => sum + stat.sent, 0);
    const totalEmailsNotSent = Object.values(emailStats).reduce((sum, stat) => sum + stat.not_sent, 0);
    const averageEmailsPerLead = totalLeads > 0 ? totalEmailsSent / totalLeads : 0;

    // Statistiche per tipo email (solo inviate)
    const emailsByType = Object.entries(emailStats).map(([type, stats]) => ({
      type,
      sent: stats.sent,
      not_sent: stats.not_sent,
      percentage: totalLeads > 0 ? (stats.sent / totalLeads) * 100 : 0,
    }));

    // Timeline email (quando sono state inviate)
    const emailTimeline: Array<{
      date: string;
      type: string;
      count: number;
    }> = [];

    Object.entries(emailStats).forEach(([type, stats]) => {
      stats.details.forEach(detail => {
        if (detail.sent_at) {
          const date = new Date(detail.sent_at).toISOString().split('T')[0];
          const existing = emailTimeline.find(t => t.date === date && t.type === type);
          if (existing) {
            existing.count++;
          } else {
            emailTimeline.push({ date, type, count: 1 });
          }
        }
      });
    });

    emailTimeline.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json({
      summary: {
        total_leads: totalLeads,
        total_emails_sent: totalEmailsSent,
        total_emails_not_sent: totalEmailsNotSent,
        average_emails_per_lead: Math.round(averageEmailsPerLead * 100) / 100,
      },
      by_type: emailStats,
      emails_by_type: emailsByType,
      timeline: emailTimeline,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

