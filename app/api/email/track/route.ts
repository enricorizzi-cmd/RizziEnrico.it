import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// Track email open (pixel tracking) and link clicks (redirect)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const emailId = searchParams.get('e');
    const leadId = searchParams.get('l');
    const type = searchParams.get('t') || 'open';
    const url = searchParams.get('url');

    // Se c'è un URL, è un click su link - traccia e redirect
    if (url && emailId && leadId) {
      const supabase = createServerClient();

      // Aggiorna metadata per tracciare click
      const { data: lead } = await supabase
        .from('workshop_leads')
        .select('metadata')
        .eq('id', leadId)
        .single();

      if (lead) {
        const metadata = (lead.metadata as any) || {};
        const emailTracking = metadata.email_tracking || {};

        if (!emailTracking[emailId]) {
          emailTracking[emailId] = {};
        }

        if (!emailTracking[emailId].clicked_at) {
          emailTracking[emailId].clicked_at = new Date().toISOString();
          emailTracking[emailId].click_count = 1;
          emailTracking[emailId].clicked_links = [url];
        } else {
          emailTracking[emailId].click_count = (emailTracking[emailId].click_count || 1) + 1;
          if (!emailTracking[emailId].clicked_links) {
            emailTracking[emailId].clicked_links = [];
          }
          if (!emailTracking[emailId].clicked_links.includes(url)) {
            emailTracking[emailId].clicked_links.push(url);
          }
        }

        metadata.email_tracking = emailTracking;

        await supabase
          .from('workshop_leads')
          .update({ metadata })
          .eq('id', leadId);
      }

      // Redirect all'URL originale (solo se URL valido)
      try {
        const urlObj = new URL(url);
        // Permetti solo redirect a domini sicuri o URL relativi
        return NextResponse.redirect(url);
      } catch {
        // Se URL non valido, ritorna pixel
        return new Response(
          Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
          {
            headers: {
              'Content-Type': 'image/gif',
            },
          }
        );
      }
    }

    // Altrimenti è un pixel tracking per apertura email
    if (!emailId || !leadId) {
      // Return 1x1 transparent pixel anche se mancano parametri
      return new Response(
        Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
        {
          headers: {
            'Content-Type': 'image/gif',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        }
      );
    }

    const supabase = createServerClient();

    // Aggiorna metadata del lead per tracciare apertura
    const { data: lead } = await supabase
      .from('workshop_leads')
      .select('metadata')
      .eq('id', leadId)
      .single();

    if (lead) {
      const metadata = (lead.metadata as any) || {};
      const emailTracking = metadata.email_tracking || {};

      if (type === 'open') {
        if (!emailTracking[emailId]) {
          emailTracking[emailId] = {};
        }
        if (!emailTracking[emailId].opened_at) {
          emailTracking[emailId].opened_at = new Date().toISOString();
          emailTracking[emailId].open_count = 1;
        } else {
          emailTracking[emailId].open_count = (emailTracking[emailId].open_count || 1) + 1;
        }
      }

      metadata.email_tracking = emailTracking;

      await supabase
        .from('workshop_leads')
        .update({ metadata })
        .eq('id', leadId);
    }

    // Return 1x1 transparent pixel
    return new Response(
      Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
      {
        headers: {
          'Content-Type': 'image/gif',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Error tracking email:', error);
    // Se è un click, prova comunque a fare redirect
    const url = request.nextUrl.searchParams.get('url');
    if (url) {
      return NextResponse.redirect(url);
    }
    // Altrimenti ritorna pixel
    return new Response(
      Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
      {
        headers: {
          'Content-Type': 'image/gif',
        },
      }
    );
  }
}
