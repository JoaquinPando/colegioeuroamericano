import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NosotrosHero from "@/components/nosotros/NosotrosHero";
import HistoriaTimeline from "@/components/nosotros/HistoriaTimeline";
import StatsBar from "@/components/home/StatsBar";
import MisionVision from "@/components/nosotros/MisionVision";
import Infraestructura from "@/components/nosotros/Infraestructura";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Nosotros | Colegio Euroamericano",
  description:
    "Conoce la historia, misión, visión e infraestructura del Colegio Euroamericano.",
};

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <NosotrosHero />
        <HistoriaTimeline />
        <StatsBar />
        <MisionVision />
        <Infraestructura />
      </main>
      <Footer />
    </>
  );
}
