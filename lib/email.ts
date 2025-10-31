const CONTACT_EMAIL = 'e.rizzi@osmpartnervenezia.it';

interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  // Se Resend è configurato, usalo
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const fromEmail = process.env.FROM_EMAIL || `Enrico Rizzi <noreply@${process.env.NEXT_PUBLIC_BASE_URL?.replace(/https?:\/\//, '').replace(/\/$/, '') || 'rizzienrico.it'}>`;
      
      await resend.emails.send({
        from: fromEmail,
        to: options.to,
        subject: options.subject,
        html: options.html || options.text.replace(/\n/g, '<br>'),
        text: options.text,
      });

      return true;
    } catch (error) {
      console.error('Resend email error:', error);
      // Fallback: log per debugging
      console.log('Email would be sent (Resend failed):', {
        to: options.to,
        subject: options.subject,
      });
    }
  } else {
    // Fallback: log per debugging (in produzione potrebbe essere webhook o altro)
    console.log('Email would be sent (RESEND_API_KEY not configured):', {
      to: options.to,
      subject: options.subject,
      text: options.text.substring(0, 100) + '...',
    });
  }

  // Se RESEND_API_KEY non è configurato o se c'è un errore, restituiamo false
  // ma salviamo comunque i dati nel DB per invio successivo
  return false;
}

