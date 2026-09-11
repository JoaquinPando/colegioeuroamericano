"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import ActivityCard from "@/components/activities/ActivityCard";
import Reveal from "@/components/ui/Reveal";
import type { Activity } from "@/lib/activities/types";

export default function ActivitiesCarousel({
  activities,
}: {
  activities: Activity[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollPrev(track.scrollLeft > 8);
    setCanScrollNext(
      track.scrollLeft + track.clientWidth < track.scrollWidth - 8
    );
  }, []);

  useEffect(() => {
    updateScrollState();
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-carousel-item]");
    const amount = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  const showArrows = activities.length > 3;

  return (
    <div className="relative">
      {showArrows && (
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={!canScrollPrev}
          aria-label="Actividades anteriores"
          className="absolute left-0 top-1/2 z-10 hidden -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 text-institucional shadow-md transition-opacity disabled:opacity-0 sm:flex"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
          </svg>
        </button>
      )}

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {activities.map((activity, index) => (
          <Reveal
            key={`${activity.title}-${activity.date}`}
            data-carousel-item
            delay={(index % 3) * 100}
            className="w-[85%] shrink-0 snap-start sm:w-[45%] lg:w-[31%]"
          >
            <ActivityCard activity={activity} />
          </Reveal>
        ))}
      </div>

      {showArrows && (
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canScrollNext}
          aria-label="Siguientes actividades"
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-4 items-center justify-center rounded-full bg-white p-2 text-institucional shadow-md transition-opacity disabled:opacity-0 sm:flex"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
