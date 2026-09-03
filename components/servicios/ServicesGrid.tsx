import type { Service } from "@/lib/servicios/types";
import Reveal from "@/components/ui/Reveal";
import ServiceCard from "./ServiceCard";

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service, index) => (
        <Reveal key={service.slug} delay={index * 80}>
          <ServiceCard service={service} />
        </Reveal>
      ))}
    </div>
  );
}
