-- Schema Supabase per Sito Enrico Rizzi

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles (opzionale, per utenti admin)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  company TEXT,
  role TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads (lead generati da form, AI, eventi, download)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  size_employees INTEGER,
  revenue_range TEXT,
  main_problem TEXT,
  source TEXT DEFAULT 'form',
  score INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings (appuntamenti prenotati)
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('diagnosi30', 'onsite')),
  datetime TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resources (lead magnet & tool)
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('file', 'tool', 'video')),
  url TEXT,
  gated BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Case Studies
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  sector TEXT,
  size TEXT,
  context TEXT,
  problem TEXT,
  intervention TEXT,
  kpi_before JSONB,
  kpi_after JSONB,
  testimonial_text TEXT,
  testimonial_video_url TEXT,
  cover_image TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  deliverables JSONB,
  timelines TEXT,
  kpis JSONB,
  price_from NUMERIC(10, 2),
  faq JSONB,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  date_start TIMESTAMPTZ NOT NULL,
  date_end TIMESTAMPTZ,
  location_name TEXT,
  address TEXT,
  capacity INTEGER,
  is_online BOOLEAN DEFAULT false,
  registration_url TEXT,
  qr_code_url TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content_mdx TEXT,
  cover_image TEXT,
  tags TEXT[],
  author TEXT DEFAULT 'Enrico Rizzi',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  quote TEXT NOT NULL,
  video_url TEXT,
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Sessions (conversazioni con chatbot)
CREATE TABLE IF NOT EXISTS ai_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  transcript JSONB,
  outcome TEXT CHECK (outcome IN ('info', 'booked', 'download')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Consents (consensi GDPR)
CREATE TABLE IF NOT EXISTS consents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('marketing', 'profiling', 'terms')),
  granted BOOLEAN DEFAULT false,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Indici per performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_case_studies_published ON case_studies(published_at DESC) WHERE published_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at DESC) WHERE published_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_events_published ON events(published_at DESC) WHERE published_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_services_published ON services(published_at DESC) WHERE published_at IS NOT NULL;

-- RLS Policies (Row Level Security)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Policy: lettura pubblica solo su contenuti pubblicati
CREATE POLICY "Public can view published case studies" ON case_studies
  FOR SELECT USING (published_at IS NOT NULL);

CREATE POLICY "Public can view published services" ON services
  FOR SELECT USING (published_at IS NOT NULL);

CREATE POLICY "Public can view published events" ON events
  FOR SELECT USING (published_at IS NOT NULL);

CREATE POLICY "Public can view published blog posts" ON blog_posts
  FOR SELECT USING (published_at IS NOT NULL);

CREATE POLICY "Public can view testimonials" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Public can view resources" ON resources
  FOR SELECT USING (true);

-- Policy: scrittura form solo "insert" (anonimo può inserire)
CREATE POLICY "Anyone can insert leads" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert consents" ON consents
  FOR INSERT WITH CHECK (true);

