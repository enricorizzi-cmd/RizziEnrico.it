# Environment Variables

## Required for Production

```env
# OpenAI API Key (Server-side only)
OPENAI_API_KEY=sk-proj-your-key-here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Base URL
NEXT_PUBLIC_BASE_URL=https://rizzienrico.it

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=rizzienrico.it
```

## Important Notes

- **OPENAI_API_KEY**: Deve essere impostata come variabile d'ambiente SERVER-SIDE su Render
- Non esporre mai la chiave API nel codice client
- Le API routes `/api/ai/*` sono server-side only

