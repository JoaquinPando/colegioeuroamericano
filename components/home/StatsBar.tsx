import Reveal from "@/components/ui/Reveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 20, suffix: "+", label: "Años de experiencia" },
  { value: 500, suffix: "+", label: "Alumnos matriculados" },
  { value: 40, suffix: "+", label: "Docentes certificados" },
];

export default function StatsBar() {
  return (
    <section className="grid grid-cols-1 gap-8 bg-institucional px-6 py-12 text-center sm:grid-cols-3 sm:px-10 lg:px-16">
      {stats.map((stat, index) => (
        <Reveal
          key={stat.label}
          delay={index * 100}
          className="flex flex-col gap-1"
        >
          <span className="text-4xl font-bold text-dorado">
            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
          </span>
          <span className="font-medium text-hueso">{stat.label}</span>
        </Reveal>
      ))}
    </section>
  );
}
