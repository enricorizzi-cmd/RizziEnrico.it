import { NextResponse } from 'next/server';

/**
 * Endpoint di verifica variabili d'ambiente
 * NON espone valori completi delle chiavi per sicurezza
 */
export async function GET() {
  const envCheck = {
    // Variabili critiche email (SMTP Aruba)
    SMTP_HOST: {
      exists: !!process.env.SMTP_HOST,
      value: process.env.SMTP_HOST || 'non configurato',
    },
    SMTP_PORT: {
      exists: !!process.env.SMTP_PORT,
      value: process.env.SMTP_PORT || 'non configurato (default: 587)',
    },
    SMTP_USER: {
      exists: !!process.env.SMTP_USER,
      value: process.env.SMTP_USER ? process.env.SMTP_USER.substring(0, 10) + '...' : 'non configurato',
      length: process.env.SMTP_USER?.length || 0,
    },
    SMTP_PASS: {
      exists: !!process.env.SMTP_PASS,
      length: process.env.SMTP_PASS?.length || 0,
      masked: process.env.SMTP_PASS ? '***' : 'non configurato',
    },
    FROM_EMAIL: {
      exists: !!process.env.FROM_EMAIL,
      value: process.env.FROM_EMAIL || 'non configurato (usando default: info@rizzienrico.it)',
    },
    
    // Variabili critiche AI
    OPENAI_API_KEY: {
      exists: !!process.env.OPENAI_API_KEY,
      formatValid: process.env.OPENAI_API_KEY?.startsWith('sk-') || false,
      length: process.env.OPENAI_API_KEY?.length || 0,
      prefix: process.env.OPENAI_API_KEY?.substring(0, 10) + '...' || 'non configurato',
    },
    
    // Variabili critiche Database
    NEXT_PUBLIC_SUPABASE_URL: {
      exists: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      value: process.env.NEXT_PUBLIC_SUPABASE_URL || 'non configurato',
      isPlaceholder: process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder') || false,
    },
    NEXT_PUBLIC_SUPABASE_ANON_KEY: {
      exists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      length: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
      isPlaceholder: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'placeholder-key' || false,
    },
    SUPABASE_SERVICE_ROLE_KEY: {
      exists: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      length: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
    },
    
    // Variabili pubbliche importanti
    NEXT_PUBLIC_BASE_URL: {
      exists: !!process.env.NEXT_PUBLIC_BASE_URL,
      value: process.env.NEXT_PUBLIC_BASE_URL || 'non configurato',
    },
    NEXT_PUBLIC_CALENDLY_PRESENCE_URL: {
      exists: !!process.env.NEXT_PUBLIC_CALENDLY_PRESENCE_URL,
      value: process.env.NEXT_PUBLIC_CALENDLY_PRESENCE_URL || 'non configurato (usando default)',
    },
    NEXT_PUBLIC_CALENDLY_ZOOM_URL: {
      exists: !!process.env.NEXT_PUBLIC_CALENDLY_ZOOM_URL,
    },
    
    // Variabili opzionali
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: {
      exists: !!process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
      value: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'non configurato',
    },
    NEXT_PUBLIC_GA4_ID: {
      exists: !!process.env.NEXT_PUBLIC_GA4_ID,
    },
    
    // Sistema
    NODE_ENV: process.env.NODE_ENV || 'non configurato',
  };

  // Calcola statistiche
  const criticalVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'OPENAI_API_KEY', 'NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'] as const;
  const missingCritical = criticalVars.filter(v => {
    const envVar = envCheck[v];
    return envVar && typeof envVar === 'object' && 'exists' in envVar ? !envVar.exists : false;
  });
  const issues = [];

  // Verifica variabili SMTP
  if (!envCheck.SMTP_HOST.exists) issues.push('❌ SMTP_HOST mancante - email non funzionerà');
  if (!envCheck.SMTP_USER.exists) issues.push('❌ SMTP_USER mancante - email non funzionerà');
  if (!envCheck.SMTP_PASS.exists) issues.push('❌ SMTP_PASS mancante - email non funzionerà');
  
  if (!envCheck.OPENAI_API_KEY.exists) issues.push('❌ OPENAI_API_KEY mancante - chat AI non funzionerà');
  if (envCheck.OPENAI_API_KEY.exists && !envCheck.OPENAI_API_KEY.formatValid) {
    issues.push('⚠️ OPENAI_API_KEY formato non valido - deve iniziare con "sk-"');
  }
  
  if (!envCheck.NEXT_PUBLIC_SUPABASE_URL.exists || envCheck.NEXT_PUBLIC_SUPABASE_URL.isPlaceholder) {
    issues.push('❌ NEXT_PUBLIC_SUPABASE_URL mancante o placeholder - database non funzionerà');
  }
  
  if (!envCheck.NEXT_PUBLIC_SUPABASE_ANON_KEY.exists || envCheck.NEXT_PUBLIC_SUPABASE_ANON_KEY.isPlaceholder) {
    issues.push('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY mancante o placeholder - database non funzionerà');
  }
  
  if (!envCheck.SUPABASE_SERVICE_ROLE_KEY.exists) {
    issues.push('⚠️ SUPABASE_SERVICE_ROLE_KEY mancante - operazioni server-side DB falliranno');
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    status: missingCritical.length === 0 ? 'ok' : 'issues',
    summary: {
      totalChecked: Object.keys(envCheck).length,
      criticalMissing: missingCritical.length,
      issues: issues.length,
    },
    issues,
    variables: envCheck,
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}

