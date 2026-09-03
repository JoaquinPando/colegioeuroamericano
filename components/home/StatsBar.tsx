const stats = [
  { value: "20+", label: "Años de experiencia" },
  { value: "500+", label: "Alumnos matriculados" },
  { value: "40+", label: "Docentes certificados" },
];

export default function StatsBar() {
  return (
    <section className="grid grid-cols-1 gap-8 bg-institucional px-6 py-12 text-center sm:grid-cols-3 sm:px-10 lg:px-16">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1">
          <span className="text-4xl font-bold text-dorado">{stat.value}</span>
          <span className="font-medium text-hueso">{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
