import nodemailer from 'nodemailer';

const CONTACT_EMAIL = 'e.rizzi@osmpartnervenezia.it';
const NOTIFICATION_EMAIL = 'enricorizzi1991@gmail.com';

interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text: string;
  emailId?: string; // ID univoco per tracciare questa email
  leadId?: string; // ID del lead per tracking
  unsubscribeUrl?: string; // URL per disiscrizione (opzionale, ma consigliato per email massive)
  attachments?: any[]; // Allegati opzionali
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
    // Determina se usare SSL (porta 465) o TLS (porta 587)
    const useSSL = SMTP_PORT === 465;
    const useTLS = SMTP_PORT === 587;

    // Crea transporter SMTP con timeout brevi
    // NOTA: Rimuoviamo la verifica iniziale che causa timeout, inviamo direttamente
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: useSSL, // true per porta 465, false per altre porte
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      connectionTimeout: 15000, // 15 secondi timeout connessione
      greetingTimeout: 10000, // 10 secondi timeout greeting
      socketTimeout: 15000, // 15 secondi timeout socket
      tls: useTLS ? {
        // Non rifiutare certificati non validi (utile per test)
        rejectUnauthorized: false,
        minVersion: 'TLSv1',
      } : undefined,
      // Pooling per migliorare performance
      pool: false,
      // Retry automatico
      maxConnections: 1,
      maxMessages: 1,
    } as nodemailer.TransportOptions);

    console.log('[EMAIL] 🔧 Configurazione SMTP:', {
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: useSSL,
      useTLS,
      user: SMTP_USER,
      from: FROM_EMAIL,
      timestamp: new Date().toISOString(),
    });

    // Aggiungi tracking se disponibile
    let htmlWithTracking = options.html || options.text.replace(/\n/g, '<br>');
    if (options.emailId && options.leadId) {
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';
      const emailId = options.emailId; // Salva in variabile locale per TypeScript
      const leadId = options.leadId; // Salva in variabile locale per TypeScript

      // Aggiungi pixel tracking per aperture (alla fine del body)
      const trackingPixel = `<img src="${BASE_URL}/api/email/track?e=${encodeURIComponent(emailId)}&l=${encodeURIComponent(leadId)}&t=open" width="1" height="1" style="display:none;" alt="" />`;

      // Inserisci il pixel prima della chiusura del body o alla fine dell'html
      if (htmlWithTracking.includes('</body>')) {
        htmlWithTracking = htmlWithTracking.replace('</body>', `${trackingPixel}</body>`);
      } else {
        htmlWithTracking += trackingPixel;
      }

      // Sostituisci tutti i link con link tracciati
      // Pattern per trovare link: href="URL"
      htmlWithTracking = htmlWithTracking.replace(
        /href="([^"]+)"/g,
        (match, url) => {
          // Non tracciare link interni al tracking o link mailto/tel
          if (url.startsWith('mailto:') || url.startsWith('tel:') || url.includes('/api/email/track')) {
            return match;
          }
          // Crea link tracciato
          const trackedUrl = `${BASE_URL}/api/email/track?e=${encodeURIComponent(emailId)}&l=${encodeURIComponent(leadId)}&t=click&url=${encodeURIComponent(url)}`;
          return `href="${trackedUrl}"`;
        }
      );
    }

    // Prepara headers per migliorare deliverability
    const headers: Record<string, string> = {};

    // Aggiungi List-Unsubscribe header (richiesto per email massive)
    if (options.unsubscribeUrl) {
      headers['List-Unsubscribe'] = `<${options.unsubscribeUrl}>`;
      headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click';
    } else {
      // Se non fornito, usa URL di default
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';
      const defaultUnsubscribeUrl = `${BASE_URL}/unsubscribe?email=${encodeURIComponent(options.to)}`;
      headers['List-Unsubscribe'] = `<${defaultUnsubscribeUrl}>`;
      headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click';
    }

    // Prepara email principale
    const mailOptions = {
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: htmlWithTracking,
      headers,
      attachments: options.attachments,
    };

    console.log('[EMAIL] 📧 Invio email:', {
      to: options.to,
      subject: options.subject,
      from: FROM_EMAIL,
      timestamp: new Date().toISOString(),
    });

    // Invia email principale all'utente con timeout
    const info = await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('SMTP send timeout')), 15000)
      )
    ]) as any;

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
