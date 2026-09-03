import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const fotos = [
  { src: "/sede-colegio.jpg", alt: "Fachada de la sede del Colegio Euroamericano" },
  { src: "/sede-colegio-2.jpg", alt: "Instalaciones del Colegio Euroamericano" },
];

export default function Infraestructura() {
  return (
    <section className="flex flex-col gap-10 bg-institucional/5 px-6 py-16 sm:px-10 lg:px-16">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-institucional sm:text-3xl">
          Nuestra infraestructura
        </h2>
        <p className="mt-3 text-texto/80">
          Contamos con dos locales conectados que albergan aulas, zonas de
          recreación y espacios pensados para el aprendizaje y el desarrollo
          de nuestros estudiantes.
        </p>
      </Reveal>

      <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
        {fotos.map((foto, index) => (
          <Reveal
            key={foto.src}
            delay={index * 150}
            className="overflow-hidden rounded-2xl shadow-md"
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              width={800}
              height={600}
              className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-72"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
