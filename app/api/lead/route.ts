import { NextRequest, NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validators';
import { calculateLeadScore } from '@/lib/scoring';
import { createServerClient } from '@/lib/supabase';
import { rateLimit } from '@/lib/rateLimit';

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

    // TODO: Send email notification (using service like Resend, SendGrid, etc.)

    return NextResponse.json({
      success: true,
      id: data.id,
      score,
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
