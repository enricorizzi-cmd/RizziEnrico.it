import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const supabase = createServerClient();
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: 'ID mancante' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('test_maturita_digitale')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(`Error fetching test ${id}:`, error);
            return NextResponse.json({ error: error.message }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error(`Server error fetching test:`, error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
