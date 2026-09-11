import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ROUTES } from "@/lib/routes";

export default function ServicioNotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-institucional">
          Servicio no encontrado
        </h1>
        <p className="text-texto/80">
          El servicio que buscas no existe o fue movido.
        </p>
        <Link
          href={ROUTES.servicios}
          className="rounded-full bg-institucional px-5 py-2.5 font-medium text-hueso transition-colors hover:bg-institucional/90"
        >
          Ver todos los servicios
        </Link>
      </main>
      <Footer />
    </>
  );
}
