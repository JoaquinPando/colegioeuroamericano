import Reveal from "@/components/ui/Reveal";

// Lista referencial de documentos habituales para matrícula en colegios peruanos.
// TODO: confirmar con secretaría la lista exacta según grado y modalidad.
const requisitos = [
  "Partida de nacimiento (original o copia certificada)",
  "Copia del DNI del estudiante",
  "Libreta o boleta de notas del año escolar anterior",
  "Constancia de no adeudo del colegio de procedencia",
  "2 fotografías tamaño carnet",
  "Ficha de matrícula completa (formulario de esta página)",
];

export default function Requisitos() {
  return (
    <section className="flex flex-col gap-10 bg-institucional/5 px-6 py-16 sm:px-10 lg:px-16">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-institucional sm:text-3xl">
          Requisitos y documentos
        </h2>
        <p className="mt-3 text-texto/80">
          Ten a la mano estos documentos para agilizar el proceso de
          matrícula.
        </p>
      </Reveal>

      <Reveal
        delay={100}
        className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-6 shadow-sm sm:p-8"
      >
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {requisitos.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-institucional/10 text-institucional">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span className="text-sm leading-6 text-texto/85">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs italic text-texto/60">
          Lista referencial: la secretaría del colegio confirmará los
          documentos exactos según el grado y la modalidad de ingreso.
        </p>
      </Reveal>
    </section>
  );
}
