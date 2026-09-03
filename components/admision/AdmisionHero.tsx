import Link from "next/link";

export default function AdmisionHero() {
  return (
    <section className="relative flex flex-col items-center gap-4 overflow-hidden bg-institucional px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16">
      <nav
        aria-label="Breadcrumb"
        className="hero-anim hero-anim-1 flex items-center gap-2 text-sm text-hueso/70"
      >
        <Link href="/" className="transition-colors duration-200 hover:text-dorado">
          Home
        </Link>
        <span>/</span>
        <span className="text-dorado">Admisión</span>
      </nav>

      <h1 className="hero-anim hero-anim-2 text-3xl font-bold tracking-tight text-hueso sm:text-4xl lg:text-5xl">
        Proceso de admisión
      </h1>

      <p className="hero-anim hero-anim-3 max-w-xl text-lg leading-8 text-hueso/80">
        Da el primer paso para que tu hijo o hija forme parte de la comunidad
        Euroamericano. Conoce el proceso, revisa los requisitos y regístrate
        como postulante.
      </p>

      <a
        href="#formulario-admision"
        className="hero-anim hero-anim-4 mt-2 rounded-full bg-dorado px-6 py-3 font-semibold text-institucional transition-all duration-300 hover:-translate-y-0.5 hover:bg-dorado/90 hover:shadow-md"
      >
        Regístrate como postulante
      </a>
    </section>
  );
}
