import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function ContactoHero() {
  return (
    <section className="relative flex flex-col items-center gap-4 overflow-hidden bg-institucional px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16">
      <nav
        aria-label="Breadcrumb"
        className="hero-anim hero-anim-1 flex items-center gap-2 text-sm text-hueso/70"
      >
        <Link href={ROUTES.home} className="transition-colors duration-200 hover:text-dorado">
          Home
        </Link>
        <span>/</span>
        <span className="text-dorado">Contacto</span>
      </nav>

      <h1 className="hero-anim hero-anim-2 text-3xl font-bold tracking-tight text-hueso sm:text-4xl lg:text-5xl">
        Contáctanos
      </h1>

      <p className="hero-anim hero-anim-3 max-w-xl text-lg leading-8 text-hueso/80">
        Escríbenos, llámanos o visítanos. Nuestro equipo está listo para
        responder tus consultas y acompañarte en lo que necesites.
      </p>
    </section>
  );
}
