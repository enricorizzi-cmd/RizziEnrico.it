const CONTACT_EMAIL = 'e.rizzi@osmpartnervenezia.it';

interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  // Leggi configurazione SMTP da variabili d'ambiente
  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const FROM_EMAIL = process.env.FROM_EMAIL || 'info@rizzienrico.it';

  // Verifica che tutte le credenziali siano configurate
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('[EMAIL] ❌ Configurazione SMTP incompleta.');
    console.error('[EMAIL] Variabili richieste: SMTP_HOST, SMTP_USER, SMTP_PASS');
    console.error('[EMAIL] Opzionali: SMTP_PORT (default: 587), FROM_EMAIL (default: info@rizzienrico.it)');
    console.log('[EMAIL] Email che sarebbe stata inviata:', {
      to: options.to,
      subject: options.subject,
      text: options.text.substring(0, 100) + '...',
    });
    return false;
  }

  try {
    // Import nodemailer
    const nodemailer = await import('nodemailer');

    // Determina se usare SSL (porta 465) o TLS (porta 587)
    const useSSL = SMTP_PORT === 465;
    const useTLS = SMTP_PORT === 587;

    // Crea transporter SMTP
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: useSSL, // true per porta 465, false per altre porte
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: useTLS ? {
        // Non rifiutare certificati non validi (utile per test)
        rejectUnauthorized: false,
      } : undefined,
    });

    // Verifica connessione SMTP
    await transporter.verify();

    console.log('[EMAIL] ✅ Connessione SMTP verificata:', {
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: useSSL,
      user: SMTP_USER,
      from: FROM_EMAIL,
      timestamp: new Date().toISOString(),
    });

    // Prepara email
    const mailOptions = {
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html || options.text.replace(/\n/g, '<br>'),
    };

    console.log('[EMAIL] 📧 Invio email:', {
      to: options.to,
      subject: options.subject,
      from: FROM_EMAIL,
      timestamp: new Date().toISOString(),
    });

    // Invia email
    const info = await transporter.sendMail(mailOptions);

    console.log('[EMAIL] ✅ Email inviata con successo:', {
      messageId: info.messageId,
      to: options.to,
      from: FROM_EMAIL,
      timestamp: new Date().toISOString(),
      response: info.response,
    });

    return true;
  } catch (error: any) {
    console.error('[EMAIL] ❌ Errore durante invio email:', error);
    console.error('[EMAIL] Dettagli errore:', {
      message: error?.message,
      name: error?.name,
      code: error?.code,
      command: error?.command,
      response: error?.response,
      responseCode: error?.responseCode,
      stack: error?.stack?.substring(0, 500),
    });

    // Suggerimenti per errori comuni
    if (error?.code === 'EAUTH') {
      console.error('[EMAIL] 💡 Errore autenticazione: verifica SMTP_USER e SMTP_PASS');
    } else if (error?.code === 'ECONNECTION') {
      console.error('[EMAIL] 💡 Errore connessione: verifica SMTP_HOST e SMTP_PORT');
    } else if (error?.code === 'ETIMEDOUT') {
      console.error('[EMAIL] 💡 Timeout connessione: verifica che il server SMTP sia raggiungibile');
    }

    return false;
  }
}
