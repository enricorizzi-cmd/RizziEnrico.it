import { NextRequest, NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validators';
import { calculateLeadScore } from '@/lib/scoring';
import { createServerClient } from '@/lib/supabase';
import { rateLimit } from '@/lib/rateLimit';
import { sendEmail } from '@/lib/email';

const CONTACT_EMAIL = 'e.rizzi@osmpartnervenezia.it';
const CONTACT_PHONE = '3475290564';

// Calendly URLs - Configura questi valori nelle variabili ambiente
const CALENDLY_ZOOM_URL = process.env.NEXT_PUBLIC_CALENDLY_ZOOM_URL || ''; // Non ancora disponibile
const CALENDLY_PRESENCE_URL = process.env.NEXT_PUBLIC_CALENDLY_PRESENCE_URL || 'https://calendly.com/enricorizzi/check-up-gratuito-in-azienda';
const CALENDLY_DEFAULT_URL = process.env.NEXT_PUBLIC_CALENDLY_CHECKUP_URL || CALENDLY_PRESENCE_URL;

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
    
    // Salva indirizzo in metadata se presente
    const metadataToSave: any = {
      meetingType: validatedData.meeting_type,
    };
    if (validatedData.address) {
      metadataToSave.address = validatedData.address;
    }

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Errore nel salvataggio' },
        { status: 500 }
      );
    }

    // Determina URL Calendly in base alla scelta
    // Al momento solo "presence" è disponibile, "zoom" sarà disponibile presto
    const meetingType = validatedData.meeting_type || 'presence';
    let calendlyUrl = CALENDLY_PRESENCE_URL;
    
    if (meetingType === 'zoom' && CALENDLY_ZOOM_URL) {
      calendlyUrl = CALENDLY_ZOOM_URL;
    } else if (meetingType === 'zoom' && !CALENDLY_ZOOM_URL) {
      // Se Zoom è selezionato ma non ancora configurato, usa presence come fallback
      calendlyUrl = CALENDLY_PRESENCE_URL;
    }

    // Invia email a Enrico
    const meetingTypeLabel = meetingType === 'presence' ? 'In presenza (90 min)' : 'Via Zoom (60 min)';
    const emailSubject = `Nuovo Lead - ${validatedData.name} - Score: ${score}`;
    const emailText = `Nuovo lead ricevuto dal sito:

Nome: ${validatedData.name}
Email: ${validatedData.email}
Telefono: ${validatedData.phone || 'Non fornito'}
Azienda: ${validatedData.company || 'Non fornito'}
Dipendenti: ${validatedData.size_employees || 'Non specificato'}
Fatturato: ${validatedData.revenue_range || 'Non specificato'}
Problema principale: ${validatedData.main_problem || 'Non specificato'}
Preferenza incontro: ${meetingTypeLabel}
${validatedData.address ? `Indirizzo sede: ${validatedData.address}` : ''}
Score: ${score}
Fonte: ${validatedData.source}

Contatta: ${validatedData.phone ? `tel:${CONTACT_PHONE}` : CONTACT_EMAIL}
WhatsApp: https://wa.me/39${CONTACT_PHONE}
Prenota Check-up: ${calendlyUrl}`;

    const emailSent = await sendEmail({
      to: CONTACT_EMAIL,
      subject: emailSubject,
      text: emailText,
    });

    // Invia email di conferma al lead (opzionale)
    if (validatedData.email) {
      await sendEmail({
        to: validatedData.email,
        subject: 'Richiesta ricevuta - Enrico Rizzi',
        text: `Gentile ${validatedData.name},

Grazie per averci contattato! 

La tua richiesta è stata ricevuta. Hai scelto un Check-up Aziendale ${meetingType === 'presence' ? 'in presenza (90 minuti)' : 'via Zoom (60 minuti)'}.

Prenota direttamente il tuo appuntamento qui:
${calendlyUrl}

Nel frattempo, se hai urgenza, puoi contattarmi:
- Email: ${CONTACT_EMAIL}
- Telefono: ${CONTACT_PHONE}
- WhatsApp: https://wa.me/39${CONTACT_PHONE}

A presto,
Enrico Rizzi
Consulente OSM per PMI`,
      });
    }

    // Salva metadata per notifica
    await supabase.from('leads').update({
      metadata: {
        ...metadataToSave,
        emailSent,
        whatsappLink: `https://wa.me/39${CONTACT_PHONE}?text=${encodeURIComponent(`Ciao Enrico, ho inviato una richiesta dal sito.`)}`,
        calendlyLink: calendlyUrl,
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
      calendlyLink: calendlyUrl,
      meetingType,
      shouldRedirectToCalendly: true, // Ora redirigiamo sempre a Calendly
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
