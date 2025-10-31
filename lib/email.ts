const CONTACT_EMAIL = 'e.rizzi@osmpartnervenezia.it';

interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    console.error('[EMAIL] ❌ RESEND_API_KEY non configurato. Impossibile inviare email.');
    console.error('[EMAIL] Verifica che la variabile RESEND_API_KEY sia configurata su Render.');
    console.log('[EMAIL] Email che sarebbe stata inviata:', {
      to: options.to,
      subject: options.subject,
      text: options.text.substring(0, 100) + '...',
    });
    return false;
  }

  // Verifica formato chiave API
  if (!RESEND_API_KEY.startsWith('re_')) {
    console.error('[EMAIL] ❌ RESEND_API_KEY formato non valido. Dovrebbe iniziare con "re_"');
    return false;
  }

  try {
    // Import ES6 standard
    const { Resend } = await import('resend');
    const resend = new Resend(RESEND_API_KEY);

    // Determina FROM email - usa onboarding@resend.dev di default (non richiede verifica dominio)
    // Se FROM_EMAIL è configurato, usa quello, altrimenti usa resend.dev (sempre funzionante)
    let fromEmail = process.env.FROM_EMAIL || `Enrico Rizzi <onboarding@resend.dev>`;
    
    console.log('[EMAIL] 🔧 Configurazione FROM email:', {
      fromEnv: process.env.FROM_EMAIL || 'non configurato',
      using: fromEmail,
      note: 'Se FROM_EMAIL non è configurato, uso onboarding@resend.dev (funziona sempre)'
    });
    
    console.log('[EMAIL] 📧 Invio email:', { 
      to: options.to, 
      subject: options.subject, 
      from: fromEmail,
      hasApiKey: !!RESEND_API_KEY,
      apiKeyPrefix: RESEND_API_KEY.substring(0, 10) + '...',
      apiKeyLength: RESEND_API_KEY.length,
      timestamp: new Date().toISOString()
    });
    
    const result = await resend.emails.send({
      from: fromEmail,
      to: options.to,
      subject: options.subject,
      html: options.html || options.text.replace(/\n/g, '<br>'),
      text: options.text,
    });

    if (result.error) {
      console.error('[EMAIL] ❌ Errore Resend API:', JSON.stringify(result.error, null, 2));
      
      // Se errore è dominio non verificato, suggerisci fallback
      if (result.error.message?.toLowerCase().includes('domain') || 
          result.error.message?.toLowerCase().includes('verify')) {
        console.error('[EMAIL] 💡 SUGGERIMENTO: Il dominio potrebbe non essere verificato.');
        console.error('[EMAIL] 💡 Prova a usare: FROM_EMAIL="Enrico Rizzi <onboarding@resend.dev>"');
        console.error('[EMAIL] 💡 Oppure verifica il dominio su https://resend.com/domains');
      }
      
      return false;
    }

    if (!result.data) {
      console.error('[EMAIL] ❌ Risposta Resend senza data:', result);
      return false;
    }

    console.log('[EMAIL] ✅ Email inviata con successo:', { 
      id: result.data.id, 
      to: options.to,
      from: fromEmail,
      timestamp: new Date().toISOString(),
      responseTime: 'success'
    });
    return true;
  } catch (error: any) {
    console.error('[EMAIL] ❌ Errore durante invio email:', error);
    console.error('[EMAIL] Dettagli errore:', {
      message: error?.message,
      name: error?.name,
      code: error?.code,
      statusCode: error?.statusCode,
      stack: error?.stack?.substring(0, 500),
    });
    
    // Se è un errore di dominio non verificato, suggerisci soluzione
    if (error?.message?.toLowerCase().includes('domain') || 
        error?.message?.toLowerCase().includes('verify') ||
        error?.statusCode === 403) {
      console.error('[EMAIL] 💡 Il dominio potrebbe non essere verificato su Resend.');
      console.error('[EMAIL] 💡 Soluzione rapida: Usa FROM_EMAIL="Enrico Rizzi <onboarding@resend.dev>"');
    }
    
    return false;
  }
}

