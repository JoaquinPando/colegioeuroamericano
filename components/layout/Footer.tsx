import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Niveles educativos", href: "#niveles" },
  { label: "Vida escolar", href: "#vida-escolar" },
  { label: "Admisión", href: "#admision" },
];

export default function Footer() {
  return (
    <footer className="bg-institucional px-6 py-12 text-hueso sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Colegio Euroamericano San Diego"
              width={246}
              height={246}
              className="h-12 w-12"
            />
          </Link>
          <p className="text-sm leading-6 text-hueso/80">
            En el Colegio Euroamericano combinamos exigencia académica,
            valores y una comunidad comprometida para acompañar a cada
            estudiante en su camino hacia el éxito.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-dorado">Ubicación y contacto</h3>
          <ul className="flex flex-col gap-3 text-sm text-hueso/80">
            <li className="flex items-start gap-3">
              <svg
                viewBox="0 0 24 24"
                className="mt-0.5 h-5 w-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z"
                />
                <circle cx="12" cy="9" r="2.5" strokeLinecap="round" />
              </svg>
              <span>
                Calle San Isaías - Mz. U Lt. 24 y 26, Urb. San Diego - San
                Martín de Porres, Lima - Perú
              </span>
            </li>
            <li className="flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 5c0 8.284 6.716 15 15 15h1a1 1 0 001-1v-2.586a1 1 0 00-.293-.707l-2.414-2.414a1 1 0 00-1.414 0l-1.086 1.086a1 1 0 01-1.263.13 12.06 12.06 0 01-4.242-4.242 1 1 0 01.13-1.263l1.086-1.086a1 1 0 000-1.414L8.293 4.293A1 1 0 007.586 4H5a1 1 0 00-1 1z"
                />
              </svg>
              <a href="tel:+51997382368" className="transition-colors duration-200 hover:text-dorado">
                +51 997 382 368
              </a>
            </li>
            <li className="flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 6h18v12H3V6zm0 0l9 7 9-7"
                />
              </svg>
              <a
                href="mailto:admision@colegioeuroamericano.edu.pe"
                className="transition-colors duration-200 hover:text-dorado"
              >
                admision@colegioeuroamericano.edu.pe
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-dorado">Síguenos</h3>
          <a
            href="https://www.facebook.com/euroamericanoschool"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-hueso/10 transition-colors hover:bg-dorado hover:text-institucional"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.57 14.24 3.57 11.8 3.57 10.15 5.03 10.15 7.7v2.2H7.4V13h2.75v8h3.35z" />
            </svg>
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-dorado">Enlaces rápidos</h3>
          <ul className="flex flex-col gap-3 text-sm text-hueso/80">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors duration-200 hover:text-dorado">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-hueso/20 pt-6 text-center text-sm text-hueso/70">
        © 2026 I.E.P. Euroamericano. Todos los derechos reservados.
      </div>
    </footer>
  );
}
