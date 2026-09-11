import Reveal from "@/components/ui/Reveal";

export default function MisionVision() {
  return (
    <section className="grid grid-cols-1 gap-8 px-6 py-16 sm:grid-cols-2 sm:px-10 lg:px-16">
      <Reveal className="flex flex-col gap-4 rounded-2xl bg-institucional/5 p-8">
        <span className="w-fit rounded-full bg-institucional px-4 py-1 text-sm font-semibold text-hueso">
          Misión
        </span>
        <p className="leading-7 text-texto/80">
          Ser una Institución Educativa Privada que garantiza educación de
          calidad a estudiantes de primaria y secundaria, promoviendo su
          desarrollo integral a través de valores y conocimientos sólidos,
          con el acompañamiento de profesores altamente capacitados.
        </p>
      </Reveal>

      <Reveal delay={150} className="flex flex-col gap-4 rounded-2xl bg-institucional/5 p-8">
        <span className="w-fit rounded-full bg-dorado px-4 py-1 text-sm font-semibold text-institucional">
          Visión
        </span>
        <p className="leading-7 text-texto/80">
          Ser reconocidos como una institución líder en la formación de
          estudiantes íntegros, capaces de enfrentar los retos del mundo
          actual con valores, pensamiento crítico y vocación de servicio a
          su comunidad.
        </p>
      </Reveal>
    </section>
  );
}
