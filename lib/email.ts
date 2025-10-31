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
    console.error('[EMAIL] RESEND_API_KEY non configurato. Impossibile inviare email.');
    console.log('[EMAIL] Email che sarebbe stata inviata:', {
      to: options.to,
      subject: options.subject,
      text: options.text.substring(0, 100) + '...',
    });
    return false;
  }

  try {
    // Import ES6 standard
    const { Resend } = await import('resend');
    const resend = new Resend(RESEND_API_KEY);

    // Determina FROM email
    const fromEmail = process.env.FROM_EMAIL || `Enrico Rizzi <noreply@rizzienrico.it>`;
    
    console.log('[EMAIL] Invio email:', { to: options.to, subject: options.subject, from: fromEmail });
    
    const result = await resend.emails.send({
      from: fromEmail,
      to: options.to,
      subject: options.subject,
      html: options.html || options.text.replace(/\n/g, '<br>'),
      text: options.text,
    });

    if (result.error) {
      console.error('[EMAIL] Errore Resend:', result.error);
      return false;
    }

    console.log('[EMAIL] Email inviata con successo:', { id: result.data?.id, to: options.to });
    return true;
  } catch (error: any) {
    console.error('[EMAIL] Errore durante invio email:', error);
    console.error('[EMAIL] Dettagli errore:', {
      message: error?.message,
      name: error?.name,
      stack: error?.stack?.substring(0, 500),
    });
    return false;
  }
}

