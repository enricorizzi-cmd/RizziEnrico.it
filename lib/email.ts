import nodemailer from 'nodemailer';

const CONTACT_EMAIL = 'e.rizzi@osmpartnervenezia.it';
const NOTIFICATION_EMAIL = 'enricorizzi1991@gmail.com';

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

    // Prepara email principale
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

    // Se l'email NON è già destinata a enricorizzi1991@gmail.com o a CONTACT_EMAIL,
    // invia anche una copia di notifica a enricorizzi1991@gmail.com
    const isNotificationEmail = options.to.toLowerCase() === NOTIFICATION_EMAIL.toLowerCase();
    const isContactEmail = options.to.toLowerCase() === CONTACT_EMAIL.toLowerCase();
    
    if (!isNotificationEmail && !isContactEmail) {
      // Attendi 500ms per evitare rate limit
      await new Promise(resolve => setTimeout(resolve, 500));

      // Prepara email di notifica
      const notificationSubject = `[NOTIFICA] ${options.subject} (destinata a: ${options.to})`;
      const notificationText = `${options.text}\n\n---\n[NOTA AUTOMATICA] Questa è una copia dell'email inviata a: ${options.to}\nTimestamp: ${new Date().toLocaleString('it-IT')}`;
      const notificationHtml = `${options.html || options.text.replace(/\n/g, '<br>')}<br><br><hr><p><small><strong>[NOTA AUTOMATICA]</strong> Questa è una copia dell'email inviata a: ${options.to}<br>Timestamp: ${new Date().toLocaleString('it-IT')}</small></p>`;

      try {
        const notificationInfo = await transporter.sendMail({
          from: FROM_EMAIL,
          to: NOTIFICATION_EMAIL,
          subject: notificationSubject,
          text: notificationText,
          html: notificationHtml,
        });

        console.log('[EMAIL] ✅ Email di notifica inviata a enricorizzi1991@gmail.com:', {
          messageId: notificationInfo.messageId,
          originalTo: options.to,
          notificationTo: NOTIFICATION_EMAIL,
          timestamp: new Date().toISOString(),
        });
      } catch (notificationError: any) {
        // Non bloccare se la notifica fallisce, l'email principale è già stata inviata
        console.error('[EMAIL] ⚠️ Errore invio notifica (email principale già inviata):', {
          message: notificationError?.message,
          code: notificationError?.code,
        });
      }
    } else {
      console.log('[EMAIL] ℹ️ Email già destinata a notifica/contatto, skip copia notifica');
    }

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
