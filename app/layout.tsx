import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import AIAssistant from "@/components/AIAssistant";
import Analytics from "@/components/Analytics";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Enrico Rizzi - Consulente Organizzazione PMI | Venezia-Rovigo",
  description: "Organizziamo la tua PMI per crescere: persone, KPI e processi. In 90 giorni mettiamo ordine, in 6 mesi vedi i numeri. Consulente PMI Veneto.",
  keywords: "consulenza PMI, organizzazione aziendale, KPI, controllo di gestione, consulente Venezia, consulente Rovigo, Enrico Rizzi",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${montserrat.variable} font-body antialiased`}
      >
        <a href="#main-content" className="skip-to-content">
          Vai al contenuto principale
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieBanner />
        <AIAssistant />
        <WhatsAppWidget />
        <Analytics />
      </body>
    </html>
  );
}
