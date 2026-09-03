import Link from "next/link";
import { getLatestActivities } from "@/lib/activities/getActivities";
import ActivitiesCarousel from "@/components/home/ActivitiesCarousel";
import EmptyState from "@/components/activities/EmptyState";
import Reveal from "@/components/ui/Reveal";

export default async function ActivitiesSection() {
  const activities = await getLatestActivities(12);

  return (
    <section
      id="actividades"
      className="flex flex-col gap-8 bg-hueso px-6 py-16 sm:px-10 lg:px-16"
    >
      <Reveal className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-3xl font-bold text-institucional">
          Nuestras actividades
        </h2>
        <p className="max-w-xl text-texto/80">
          Así vivimos el año escolar en el Colegio Euroamericano.
        </p>
      </Reveal>

      {activities.length === 0 ? (
        <EmptyState message="Muy pronto publicaremos las actividades del año." />
      ) : (
        <ActivitiesCarousel activities={activities} />
      )}

      <Reveal delay={150} className="mx-auto">
        <Link
          href="/actividades"
          className="rounded-full bg-institucional px-6 py-3 font-medium text-hueso transition-all duration-300 hover:-translate-y-0.5 hover:bg-institucional/90 hover:shadow-lg"
        >
          Ver todas
        </Link>
      </Reveal>
    </section>
  );
}
