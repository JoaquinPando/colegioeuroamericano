import Reveal from "@/components/ui/Reveal";

const cards = [
  {
    title: "Dirección",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      />
    ),
    content: (
      <p>
        Calle San Isaías - Mz. U Lt. 24 y 26, Urb. San Diego, San Martín de
        Porres, Lima - Perú
      </p>
    ),
  },
  {
    title: "Teléfono",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5c0 8.284 6.716 15 15 15h1a1 1 0 001-1v-2.586a1 1 0 00-.293-.707l-2.414-2.414a1 1 0 00-1.414 0l-1.086 1.086a1 1 0 01-1.263.13 12.06 12.06 0 01-4.242-4.242 1 1 0 01.13-1.263l1.086-1.086a1 1 0 000-1.414L8.293 4.293A1 1 0 007.586 4H5a1 1 0 00-1 1z"
      />
    ),
    content: (
      <a
        href="tel:+51997382368"
        className="transition-colors duration-200 hover:text-institucional"
      >
        +51 997 382 368
      </a>
    ),
  },
  {
    title: "Correo",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6h18v12H3V6zm0 0l9 7 9-7"
      />
    ),
    content: (
      <a
        href="mailto:admision@colegioeuroamericano.edu.pe"
        className="break-all transition-colors duration-200 hover:text-institucional"
      >
        admision@colegioeuroamericano.edu.pe
      </a>
    ),
  },
  {
    title: "Horario de atención",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4l2.5 2.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    content: (
      <p>
        {/* TODO: confirmar horario real de atención con administración. */}
        Por confirmar
      </p>
    ),
  },
];

export default function ContactInfoCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {cards.map((card, index) => (
        <Reveal
          key={card.title}
          delay={index * 80}
          className="flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-institucional/10 text-institucional">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              {card.icon}
            </svg>
          </span>
          <h3 className="font-semibold text-institucional">{card.title}</h3>
          <div className="text-sm leading-6 text-texto/80">
            {card.content}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
