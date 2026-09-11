import Reveal from "@/components/ui/Reveal";

// TODO: Reemplazar estos pasos placeholder con el proceso real de admisión
// (nombres, descripciones y plazos) una vez que el colegio los confirme.
const pasos = [
  {
    title: "Paso 1 (TODO)",
    description: "TODO: descripción pendiente de confirmar con el colegio.",
  },
  {
    title: "Paso 2 (TODO)",
    description: "TODO: descripción pendiente de confirmar con el colegio.",
  },
  {
    title: "Paso 3 (TODO)",
    description: "TODO: descripción pendiente de confirmar con el colegio.",
  },
  {
    title: "Paso 4 (TODO)",
    description: "TODO: descripción pendiente de confirmar con el colegio.",
  },
];

export default function ProcesoAdmision() {
  return (
    <section className="flex flex-col gap-10 px-6 py-16 sm:px-10 lg:px-16">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-institucional sm:text-3xl">
          ¿Cómo es el proceso?
        </h2>
        <p className="mt-3 text-texto/80">
          Un recorrido claro, pensado para acompañarte en cada etapa de la
          postulación.
        </p>
      </Reveal>

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {pasos.map((paso, index) => (
          <Reveal
            key={paso.title}
            delay={index * 120}
            className="relative flex flex-col items-center gap-3 text-center"
          >
            {index < pasos.length - 1 && (
              <span className="absolute left-1/2 top-5 hidden h-0.5 w-full bg-institucional/20 lg:block" />
            )}
            <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-institucional font-bold text-hueso">
              {index + 1}
            </span>
            <h3 className="font-semibold text-institucional">{paso.title}</h3>
            <p className="text-sm leading-6 text-texto/70">
              {paso.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
