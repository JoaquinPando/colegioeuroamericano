import Reveal from "@/components/ui/Reveal";

const hitos = [
  {
    year: "2001",
    title: "Fundación",
    description:
      "El Colegio Euroamericano abre sus puertas con el objetivo de brindar educación de calidad, comenzando en un pequeño primer piso alquilado.",
  },
  {
    year: "2010",
    title: "Sede propia y ampliación",
    description:
      "Tras capitalizar los primeros años, el colegio invierte en una sede propia en San Martín de Porres y negocia una propiedad aledaña, hoy zona de recreación en el primer nivel y salones en el segundo.",
  },
  {
    year: "Actualidad",
    title: "Comunidad en crecimiento",
    description:
      "El Euroamericano continúa formando a estudiantes de primaria y secundaria con desarrollo integral, valores sólidos y docentes altamente capacitados.",
  },
];

export default function HistoriaTimeline() {
  return (
    <section className="flex flex-col gap-10 px-6 py-16 sm:px-10 lg:px-16">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-institucional sm:text-3xl">
          Nuestra historia
        </h2>
        <p className="mt-3 text-texto/80">
          Un recorrido de crecimiento sostenido, guiado siempre por el
          compromiso con la educación de calidad.
        </p>
      </Reveal>

      <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-10 border-l-2 border-institucional/20 pl-8 sm:pl-10">
        {hitos.map((hito, index) => (
          <Reveal key={hito.year} delay={index * 150} className="relative">
            <span className="absolute -left-[2.6rem] flex h-8 w-8 items-center justify-center rounded-full bg-dorado font-bold text-institucional shadow-md sm:-left-[3.1rem]">
              <span className="h-2.5 w-2.5 rounded-full bg-institucional" />
            </span>
            <span className="text-sm font-semibold uppercase tracking-wide text-dorado">
              {hito.year}
            </span>
            <h3 className="mt-1 text-xl font-bold text-institucional">
              {hito.title}
            </h3>
            <p className="mt-2 leading-7 text-texto/80">{hito.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
