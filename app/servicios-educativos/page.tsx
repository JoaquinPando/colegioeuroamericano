import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServicesGrid from "@/components/servicios/ServicesGrid";
import { getAllServices } from "@/lib/servicios/data";

export const metadata: Metadata = {
  title: "Servicios educativos | Colegio Euroamericano",
  description:
    "Conoce los servicios educativos del Colegio Euroamericano: Primaria, Secundaria, Seminario de Reforzamiento y Cursos de Verano.",
};

export default function ServiciosEducativosPage() {
  const services = getAllServices();

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col gap-10 px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-institucional sm:text-4xl">
            Servicios educativos
          </h1>
          <p className="mt-4 text-texto/80">
            Acompañamos a cada estudiante en distintas etapas de su formación,
            desde Primaria hasta programas de reforzamiento y verano.
          </p>
        </div>

        <ServicesGrid services={services} />
      </main>
      <Footer />
    </>
  );
}
