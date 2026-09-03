import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ActivitiesGallery from "@/components/activities/ActivitiesGallery";
import EmptyState from "@/components/activities/EmptyState";
import { getAllActivities } from "@/lib/activities/getActivities";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Actividades del año | Colegio Euroamericano",
  description:
    "Cronograma completo de actividades del año escolar en el Colegio Euroamericano.",
};

export default async function ActividadesPage() {
  const activities = await getAllActivities();

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col gap-8 px-6 py-16 sm:px-10 lg:px-16">
        <h1 className="text-center text-3xl font-bold text-institucional sm:text-4xl">
          Actividades del año
        </h1>

        {activities.length === 0 ? (
          <EmptyState message="Aún no hay actividades publicadas." />
        ) : (
          <ActivitiesGallery activities={activities} />
        )}
      </main>
      <Footer />
    </>
  );
}
