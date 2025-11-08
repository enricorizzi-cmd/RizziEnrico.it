import Link from 'next/link';
import OSMBadge from './OSMBadge';
import LogoER from './LogoER';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-text)] text-white py-12 mt-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <LogoER variant="footer" className="text-white" />
            </div>
            <div className="mb-4">
              <h3 className="font-heading font-bold text-xl text-white">Enrico Rizzi</h3>
              <p className="text-xs text-gray-400 mt-1">Consulente Organizzazione PMI</p>
            </div>
            <p className="text-sm text-gray-300 mb-3">
              Consulenza per PMI che vogliono crescere con metodo:
              persone, KPI e processi.
            </p>
            <p className="text-sm text-gray-300 mb-4">
              Area servita: Venezia - Rovigo
            </p>
            <div className="flex items-center gap-2 pt-3 border-t border-gray-700">
              <span className="text-xs text-gray-400">Partner</span>
              <OSMBadge variant="footer" useImage={true} className="opacity-50" />
            </div>
          </div>

          {/* Navigazione Principale */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Navigazione</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/metodo" className="text-gray-300 hover:text-white transition-colors">
                  Metodo
                </Link>
              </li>
              <li>
                <Link href="/servizi" className="text-gray-300 hover:text-white transition-colors">
                  Servizi
                </Link>
              </li>
              <li>
                <Link href="/i-profile" className="text-gray-300 hover:text-white transition-colors">
                  i-Profile
                </Link>
              </li>
              <li>
                <Link href="/case-study" className="text-gray-300 hover:text-white transition-colors">
                  Case Study
                </Link>
              </li>
              <li>
                <Link href="/risorse" className="text-gray-300 hover:text-white transition-colors">
                  Risorse
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/eventi" className="text-gray-300 hover:text-white transition-colors">
                  Eventi
                </Link>
              </li>
              <li>
                <Link href="/chi-sono" className="text-gray-300 hover:text-white transition-colors">
                  Chi sono
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="text-gray-300 hover:text-white transition-colors">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          {/* Risorse */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Risorse</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/risorse" className="text-gray-300 hover:text-white transition-colors">
                  KPI Pack
                </Link>
              </li>
              <li>
                <Link href="/calcolatore-investimento" className="text-gray-300 hover:text-white transition-colors">
                  Calcolatore Investimento
                </Link>
              </li>
            </ul>
          </div>

          {/* Contatti & Legal */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contatti</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/contatti" className="hover:text-white transition-colors">
                  Prenota un incontro
                </Link>
              </li>
              <li>
                <a
                  href="tel:+393475290564"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +39 347 529 0564
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/393475290564"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 7.01c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-gray-600 space-y-2 text-xs text-gray-400">
              <Link href="/privacy" className="block hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookie" className="block hover:text-gray-300 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/termini" className="block hover:text-gray-300 transition-colors">
                Termini di servizio
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Enrico Rizzi. Tutti i diritti riservati.</p>
          <p className="mt-2">P.IVA: 05616690284 | Brand associato a OSM</p>
        </div>
      </div>
    </footer>
  );
}

