import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import ActivitiesSection from "@/components/home/ActivitiesSection";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <StatsBar />
        <ActivitiesSection />
      </main>
      <Footer />
    </>
  );
}
