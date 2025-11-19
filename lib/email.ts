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
      
      // Se errore 403 per indirizzo non verificato (modalità test), prova fallback
      const isTestModeError = result.error.statusCode === 403 && 
        (result.error.message?.toLowerCase().includes('testing emails') ||
         result.error.message?.toLowerCase().includes('only send') ||
         result.error.message?.toLowerCase().includes('your own email'));
      
      if (isTestModeError && options.to !== 'enricorizzi1991@gmail.com') {
        console.log('[EMAIL] 🔄 Fallback: modalità test attiva');
        console.log('[EMAIL] 📧 Email originale destinata a:', options.to);
        console.log('[EMAIL] ⚠️ ATTENZIONE: Resend è in modalità test. Per inviare a tutti i destinatari, verifica un dominio su https://resend.com/domains');
        
        // Prova PRIMA a inviare al lead originale usando onboarding@resend.dev (potrebbe funzionare)
        // Se fallisce, allora usa il fallback
        let leadEmailSent = false;
        try {
          const leadResult = await resend.emails.send({
            from: 'onboarding@resend.dev', // Usa sempre onboarding@resend.dev per tentare invio
            to: options.to,
            subject: options.subject,
            html: options.html || options.text.replace(/\n/g, '<br>'),
            text: options.text,
          });
          
          if (leadResult.data) {
            console.log('[EMAIL] ✅ Email inviata al lead originale:', { 
              id: leadResult.data.id, 
              to: options.to,
              from: 'onboarding@resend.dev',
              timestamp: new Date().toISOString(),
            });
            leadEmailSent = true;
          } else if (leadResult.error) {
            console.log('[EMAIL] ⚠️ Invio al lead fallito, uso fallback:', leadResult.error.message);
          }
        } catch (leadError: any) {
          console.log('[EMAIL] ⚠️ Errore invio al lead, uso fallback:', leadError?.message);
        }
        
        // Invia sempre anche il fallback a enricorizzi1991@gmail.com per notifica
        const fallbackSubject = `[FALLBACK] ${options.subject} (destinata a: ${options.to})`;
        const fallbackText = `${options.text}\n\n---\n[NOTA] Questa email era destinata a: ${options.to}\nInviata a enricorizzi1991@gmail.com perché Resend è in modalità test.\n${leadEmailSent ? '✅ Email inviata anche al lead originale.' : '❌ Email NON inviata al lead originale (bloccata da Resend test mode).'}`;
        
        const fallbackResult = await resend.emails.send({
          from: fromEmail,
          to: 'enricorizzi1991@gmail.com',
          subject: fallbackSubject,
          html: (options.html || options.text.replace(/\n/g, '<br>')) + `<br><br><hr><p><small>[NOTA] Questa email era destinata a: ${options.to}<br>Inviata a enricorizzi1991@gmail.com perché Resend è in modalità test.<br>${leadEmailSent ? '✅ Email inviata anche al lead originale.' : '❌ Email NON inviata al lead originale (bloccata da Resend test mode).'}</small></p>`,
          text: fallbackText,
        });
        
        if (fallbackResult.error) {
          console.error('[EMAIL] ❌ Errore anche nel fallback:', JSON.stringify(fallbackResult.error, null, 2));
          return leadEmailSent; // Ritorna true se almeno il lead ha ricevuto l'email
        }
        
        if (fallbackResult.data) {
          console.log('[EMAIL] ✅ Email fallback inviata:', { 
            id: fallbackResult.data.id, 
            originalTo: options.to,
            fallbackTo: 'enricorizzi1991@gmail.com',
            leadEmailSent,
            from: fromEmail,
            timestamp: new Date().toISOString(),
          });
          return true; // Ritorna true se almeno il fallback è stato inviato
        }
      }
      
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
    
    // Se è un errore 403 per modalità test, prova fallback
    const isTestModeError = error?.statusCode === 403 && 
      (error?.message?.toLowerCase().includes('testing emails') ||
       error?.message?.toLowerCase().includes('only send') ||
       error?.message?.toLowerCase().includes('your own email'));
    
    if (isTestModeError && options.to !== 'enricorizzi1991@gmail.com') {
      try {
        console.log('[EMAIL] 🔄 Fallback catch: modalità test attiva');
        console.log('[EMAIL] ⚠️ ATTENZIONE: Resend è in modalità test. Per inviare a tutti i destinatari, verifica un dominio su https://resend.com/domains');
        const { Resend } = await import('resend');
        const resend = new Resend(RESEND_API_KEY);
        const fromEmail = process.env.FROM_EMAIL || `Enrico Rizzi <onboarding@resend.dev>`;
        
        // Prova PRIMA a inviare al lead originale usando onboarding@resend.dev
        let leadEmailSent = false;
        try {
          const leadResult = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: options.to,
            subject: options.subject,
            html: options.html || options.text.replace(/\n/g, '<br>'),
            text: options.text,
          });
          
          if (leadResult.data) {
            console.log('[EMAIL] ✅ Email inviata al lead originale (catch):', { 
              id: leadResult.data.id, 
              to: options.to,
            });
            leadEmailSent = true;
          }
        } catch (leadError) {
          console.log('[EMAIL] ⚠️ Invio al lead fallito (catch):', leadError);
        }
        
        // Invia sempre anche il fallback
        const fallbackSubject = `[FALLBACK] ${options.subject} (destinata a: ${options.to})`;
        const fallbackText = `${options.text}\n\n---\n[NOTA] Questa email era destinata a: ${options.to}\nInviata a enricorizzi1991@gmail.com perché Resend è in modalità test.\n${leadEmailSent ? '✅ Email inviata anche al lead originale.' : '❌ Email NON inviata al lead originale (bloccata da Resend test mode).'}`;
        
        const fallbackResult = await resend.emails.send({
          from: fromEmail,
          to: 'enricorizzi1991@gmail.com',
          subject: fallbackSubject,
          html: (options.html || options.text.replace(/\n/g, '<br>')) + `<br><br><hr><p><small>[NOTA] Questa email era destinata a: ${options.to}<br>Inviata a enricorizzi1991@gmail.com perché Resend è in modalità test.<br>${leadEmailSent ? '✅ Email inviata anche al lead originale.' : '❌ Email NON inviata al lead originale (bloccata da Resend test mode).'}</small></p>`,
          text: fallbackText,
        });
        
        if (fallbackResult.data) {
          console.log('[EMAIL] ✅ Email fallback inviata (catch):', { 
            id: fallbackResult.data.id, 
            originalTo: options.to,
            fallbackTo: 'enricorizzi1991@gmail.com',
            leadEmailSent,
            from: fromEmail,
            timestamp: new Date().toISOString(),
          });
          return true;
        }
      } catch (fallbackError) {
        console.error('[EMAIL] ❌ Errore anche nel fallback:', fallbackError);
      }
    }
    
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

