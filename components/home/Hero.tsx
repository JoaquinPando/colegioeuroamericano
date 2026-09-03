import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center gap-6 overflow-hidden px-6 py-16 text-center sm:px-10 sm:py-24 lg:px-16">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videohome.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-hueso/40" />

      <span className="hero-anim hero-anim-1 relative rounded-full bg-dorado px-4 py-1.5 text-sm font-semibold text-institucional">
        Admisión 2026 abierta
      </span>

      <h1 className="hero-anim hero-anim-2 relative max-w-2xl text-3xl font-bold leading-tight tracking-tight text-institucional sm:text-4xl lg:text-5xl">
        Formamos a los líderes del mañana
      </h1>

      <p className="hero-anim hero-anim-3 relative max-w-xl text-lg leading-8 text-texto">
        En el Colegio Euroamericano combinamos exigencia académica, valores y
        una comunidad comprometida para acompañar a cada estudiante en su
        camino hacia el éxito.
      </p>

      <div className="hero-anim hero-anim-4 relative flex flex-col gap-4 sm:flex-row">
        <Link
          href={ROUTES.admision}
          className="rounded-full bg-institucional px-6 py-3 font-medium text-hueso transition-all duration-300 hover:-translate-y-0.5 hover:bg-institucional/90 hover:shadow-lg"
        >
          Solicitar información
        </Link>
        <Link
          href={ROUTES.nosotros}
          className="rounded-full border-2 border-institucional px-6 py-3 font-medium text-institucional transition-all duration-300 hover:-translate-y-0.5 hover:bg-institucional/10"
        >
          Conócenos
        </Link>
      </div>
    </section>
  );
}
