"use client";

import { useMemo, useState } from "react";
import ActivityCard from "@/components/activities/ActivityCard";
import Lightbox from "@/components/activities/Lightbox";
import Reveal from "@/components/ui/Reveal";
import type { Activity } from "@/lib/activities/types";

export default function ActivitiesGallery({
  activities,
}: {
  activities: Activity[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { startIndexes, images } = useMemo(() => {
    const starts: number[] = [];
    const flat: { id: string; alt: string }[] = [];

    for (const activity of activities) {
      starts.push(flat.length);
      for (const id of activity.imageIds) {
        flat.push({ id, alt: activity.title });
      }
    }

    return { startIndexes: starts, images: flat };
  }, [activities]);

  return (
    <>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        {activities.map((activity, activityIndex) => (
          <Reveal
            key={`${activity.title}-${activity.date}`}
            delay={(activityIndex % 4) * 80}
          >
            <ActivityCard
              activity={activity}
              variant="full"
              imageStartIndex={startIndexes[activityIndex]}
              onImageClick={setOpenIndex}
            />
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
