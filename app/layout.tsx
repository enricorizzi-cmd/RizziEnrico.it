import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ClientWidgets from "@/components/ClientWidgets";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
  adjustFontFallback: true, // Migliora CLS prevenendo layout shift durante caricamento font
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
  adjustFontFallback: true, // Migliora CLS prevenendo layout shift durante caricamento font
});

export const metadata: Metadata = {
  title: "Consulente PMI Veneto - Enrico Rizzi | Venezia-Padova-Rovigo",
  description: "Consulenza aziendale per PMI venete: organizzazione, KPI, digitalizzazione e controllo di gestione. In 90 giorni mettiamo ordine, in 6 mesi vedi i numeri. Check-up gratuito.",
  keywords: "consulenza PMI Veneto, organizzazione aziendale, KPI, digitalizzazione PMI, AI per PMI, controllo di gestione, consulente Venezia, consulente Rovigo, consulente Padova, Enrico Rizzi, metodo OSM",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it'),
  icons: {
    icon: [
      { url: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: 'any', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/icon.svg',
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        {/* Preconnect a font Google per migliorare performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preconnect a domini third-party per analytics (migliora velocità caricamento) */}
        <link rel="preconnect" href="https://plausible.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://plausible.io" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Preload immagine hero critica per migliorare LCP */}
        <link rel="preload" as="image" href="/enrico-rizzi.jpg" fetchPriority="high" />
      </head>
      <body
        className={`${inter.variable} ${montserrat.variable} font-body antialiased`}
      >
        {/* Google Analytics - Inserito direttamente nell'head */}
        <GoogleAnalytics />
        <a href="#main-content" className="skip-to-content">
          Vai al contenuto principale
        </a>
        <Header />
        <main id="main-content" className="pt-24 lg:pt-16">{children}</main>
        <Footer />
        <CookieBanner />
        <ClientWidgets />
        <Analytics />
      </body>
    </html>
  );
}
