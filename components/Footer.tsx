import Link from 'next/link';
import OSMBadge from './OSMBadge';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-text)] text-white py-12 mt-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div>
                <h3 className="font-heading font-bold text-xl text-white">Enrico Rizzi</h3>
                <p className="text-xs text-gray-400 mt-1">Consulente Organizzazione PMI</p>
              </div>
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
              <OSMBadge variant="footer" className="opacity-50" />
            </div>
          </div>

          {/* Servizi */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Servizi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/servizi/consulenza-pmi" className="text-gray-300 hover:text-white transition-colors">
                  Consulenza PMI
                </Link>
              </li>
              <li>
                <Link href="/servizi/organizzazione-mansionari" className="text-gray-300 hover:text-white transition-colors">
                  Organizzazione & Mansionari
                </Link>
              </li>
              <li>
                <Link href="/servizi/sviluppo-persone" className="text-gray-300 hover:text-white transition-colors">
                  Sviluppo Persone
                </Link>
              </li>
              <li>
                <Link href="/servizi/kpi-controllo-gestione" className="text-gray-300 hover:text-white transition-colors">
                  KPI & Controllo
                </Link>
              </li>
            </ul>
          </div>

          {/* Risorse */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Risorse</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/case-study" className="text-gray-300 hover:text-white transition-colors">
                  Case Study
                </Link>
              </li>
              <li>
                <Link href="/risorse" className="text-gray-300 hover:text-white transition-colors">
                  KPI Pack
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
                <Link href="/chi-sono" className="hover:text-white transition-colors">
                  Chi sono
                </Link>
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
          <p className="mt-2">Brand associato a OSM</p>
        </div>
      </div>
    </footer>
  );
}

