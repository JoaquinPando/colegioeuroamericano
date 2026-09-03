import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/servicios/types";
import ServiceIcon from "./ServiceIcon";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/servicios-educativos/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative h-40 w-full overflow-hidden sm:h-48">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-institucional/40" />
        <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-hueso text-institucional">
          <ServiceIcon icon={service.icon} className="h-5 w-5" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h2 className="text-xl font-semibold text-institucional">
          {service.title}
        </h2>
        <p className="flex-1 text-sm leading-6 text-texto/80">
          {service.shortDescription}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-institucional transition-transform duration-300 group-hover:translate-x-1">
          Ver más
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
