import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdmisionHero from "@/components/admision/AdmisionHero";
import ProcesoAdmision from "@/components/admision/ProcesoAdmision";
import Requisitos from "@/components/admision/Requisitos";
import AdmisionForm from "@/components/admision/AdmisionForm";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Admisión | Colegio Euroamericano",
  description:
    "Conoce el proceso de admisión, los requisitos y regístrate como postulante en el Colegio Euroamericano.",
};

export default function AdmisionPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <AdmisionHero />
        <ProcesoAdmision />
        <Requisitos />

        <section
          id="formulario-admision"
          className="flex flex-col gap-10 bg-institucional/5 px-6 py-16 sm:px-10 lg:px-16"
        >
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-institucional sm:text-3xl">
              Regístrate como postulante
            </h2>
            <p className="mt-3 text-texto/80">
              Completa el siguiente formulario y nuestro equipo de admisión
              se pondrá en contacto contigo.
            </p>
          </Reveal>
          <AdmisionForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
