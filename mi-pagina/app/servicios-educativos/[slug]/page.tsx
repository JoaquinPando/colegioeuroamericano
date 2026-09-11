import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceHero from "@/components/servicios/ServiceHero";
import ServiceIncludes from "@/components/servicios/ServiceIncludes";
import { getAllServices, getServiceBySlug } from "@/lib/servicios/data";

export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/servicios-educativos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} | Colegio Euroamericano`,
    description: service.shortDescription,
  };
}

export default async function ServicioDetallePage({
  params,
}: PageProps<"/servicios-educativos/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <ServiceHero service={service} />

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-16 sm:px-10 lg:px-16">
          <p className="text-lg leading-8 text-texto/85">
            {service.description}
          </p>

          <ServiceIncludes includes={service.includes} />
        </div>
      </main>
      <Footer />
    </>
  );
}
