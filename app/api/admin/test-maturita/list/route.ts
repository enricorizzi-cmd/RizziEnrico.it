import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const supabase = createServerClient();

        // Query per ottenere la lista dei test
        // Selezioniamo solo i campi necessari per la tabella
        const { data, error } = await supabase
            .from('test_maturita_digitale')
            .select('id, created_at, nome, cognome, email, azienda, livello_maturita, percentage, profilazione, collo_bottiglia_primario, capacita_crescita')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching tests list:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Server error fetching tests list:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
