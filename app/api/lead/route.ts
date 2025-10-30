import { NextRequest, NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validators';
import { calculateLeadScore } from '@/lib/scoring';
import { createServerClient } from '@/lib/supabase';
import { rateLimit } from '@/lib/rateLimit';

const CONTACT_EMAIL = 'e.rizzi@osmpartnervenezia.it';
const CONTACT_PHONE = '3475290564';
// Calendly: Check-up Aziendale Gratuito
// - 60 minuti via Zoom
// - 90 minuti in presenza
const CALENDLY_CHECKUP_URL = process.env.NEXT_PUBLIC_CALENDLY_CHECKUP_URL || 'https://calendly.com/enrico-rizzi/check-up-aziendale-gratuito';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const limit = rateLimit(`lead-${ip}`);
    
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Troppe richieste. Riprova tra qualche minuto.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Validate input and set default source
    const validatedData = leadSchema.parse({
      ...body,
      source: body.source || 'form',
    });
    
    // Calculate lead score
    const score = calculateLeadScore(
      validatedData.size_employees,
      validatedData.revenue_range,
      validatedData.main_problem
    );

    // Save to Supabase
    const supabase = createServerClient();
    
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        size_employees: validatedData.size_employees,
        revenue_range: validatedData.revenue_range,
        main_problem: validatedData.main_problem,
        source: validatedData.source,
        score,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Errore nel salvataggio' },
        { status: 500 }
      );
    }

    // Email notification preparata (in produzione: integrare Resend/SendGrid)
    const emailSubject = encodeURIComponent(`Nuovo Lead - ${validatedData.name} - Score: ${score}`);
    const emailBody = encodeURIComponent(
      `Nuovo lead ricevuto:\n\n` +
      `Nome: ${validatedData.name}\n` +
      `Email: ${validatedData.email}\n` +
      `Telefono: ${validatedData.phone || 'Non fornito'}\n` +
      `Azienda: ${validatedData.company || 'Non fornito'}\n` +
      `Dipendenti: ${validatedData.size_employees || 'Non specificato'}\n` +
      `Fatturato: ${validatedData.revenue_range || 'Non specificato'}\n` +
      `Problema principale: ${validatedData.main_problem || 'Non specificato'}\n` +
      `Score: ${score}\n` +
      `Fonte: ${validatedData.source}\n\n` +
      `Contatta: ${validatedData.phone ? `tel:${CONTACT_PHONE}` : CONTACT_EMAIL}\n` +
      `WhatsApp: https://wa.me/39${CONTACT_PHONE}\n` +
      `Prenota Check-up: ${CALENDLY_CHECKUP_URL}`
    );

    // Salva metadata per notifica
    await supabase.from('leads').update({
      metadata: {
        emailNotification: `${CONTACT_EMAIL}?subject=${emailSubject}&body=${emailBody}`,
        whatsappLink: `https://wa.me/39${CONTACT_PHONE}?text=${encodeURIComponent(`Ciao Enrico, ho inviato una richiesta dal sito.`)}`,
        calendlyLink: CALENDLY_CHECKUP_URL,
      },
    }).eq('id', data.id);

    // Redirect a Calendly se score alto
    const shouldRedirectToCalendly = score >= 40;

    return NextResponse.json({
      success: true,
      id: data.id,
      score,
      contactEmail: CONTACT_EMAIL,
      contactPhone: CONTACT_PHONE,
      whatsappLink: `https://wa.me/39${CONTACT_PHONE}`,
      calendlyLink: CALENDLY_CHECKUP_URL,
      shouldRedirectToCalendly,
    }, {
      headers: {
        'X-RateLimit-Remaining': limit.remaining.toString(),
      },
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dati non validi', details: error },
        { status: 400 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
