"use client";

import { useInView } from "@/hooks/useInView";

// La sola dirección de texto resolvía al negocio vecino equivocado (Grupo
// Corfamet, Mz. T Lt. 13, misma calle) en vez del colegio (Mz. U Lt. 24-26).
// Se usa el nombre del local, que sí está indexado como su propia ficha en
// Google Maps, para que el pin caiga en el colegio.
const PLACE_QUERY = "Colegio Euroamericano, San Isaías 163, San Martín de Porres";

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  PLACE_QUERY
)}&output=embed`;

export default function ContactMap() {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-institucional/5 shadow-sm sm:aspect-video"
    >
      {isInView ? (
        <iframe
          src={MAP_SRC}
          title="Ubicación del Colegio Euroamericano en Google Maps"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-texto/50">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
            />
          </svg>
          <span className="text-sm">Cargando mapa...</span>
        </div>
      )}
    </div>
  );
}
