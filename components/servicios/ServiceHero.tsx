import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import type { Service } from "@/lib/servicios/types";
import ServiceIcon from "./ServiceIcon";

export default function ServiceHero({ service }: { service: Service }) {
  return (
    <div className="relative flex flex-col items-center gap-4 overflow-hidden px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16">
      <Image
        src={service.image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-institucional/80" />

      <nav
        aria-label="Breadcrumb"
        className="relative flex items-center gap-2 text-sm text-hueso/70"
      >
        <Link href={ROUTES.home} className="transition-colors duration-200 hover:text-dorado">
          Home
        </Link>
        <span>/</span>
        <Link
          href={ROUTES.servicios}
          className="transition-colors duration-200 hover:text-dorado"
        >
          Servicios educativos
        </Link>
        <span>/</span>
        <span className="text-dorado">{service.title}</span>
      </nav>

      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-hueso/10 text-dorado">
        <ServiceIcon icon={service.icon} className="h-8 w-8" />
      </div>
      <h1 className="relative text-3xl font-bold text-hueso sm:text-4xl">
        {service.title}
      </h1>
      <p className="relative max-w-2xl text-hueso/85">
        {service.shortDescription}
      </p>
    </div>
  );
}
