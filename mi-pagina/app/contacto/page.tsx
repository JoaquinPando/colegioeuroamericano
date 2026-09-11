import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactoHero from "@/components/contacto/ContactoHero";
import ContactInfoCards from "@/components/contacto/ContactInfoCards";
import ContactMap from "@/components/contacto/ContactMap";
import ContactForm from "@/components/contacto/ContactForm";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contacto | Colegio Euroamericano",
  description:
    "Ubicación, teléfono, correo y formulario de contacto del Colegio Euroamericano en San Martín de Porres, Lima.",
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <ContactoHero />

        <section className="grid grid-cols-1 gap-10 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:px-16">
          <div className="flex flex-col gap-8">
            <Reveal>
              <ContactInfoCards />
            </Reveal>
            <Reveal delay={100}>
              <ContactMap />
            </Reveal>
          </div>

          <Reveal delay={150} className="flex flex-col">
            <ContactForm />
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
