import Image from "next/image";
import type { Activity } from "@/lib/activities/types";

const dateFormatter = new Intl.DateTimeFormat("es-PE", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`));
}

export default function ActivityCard({
  activity,
  variant = "compact",
  onImageClick,
  imageStartIndex = 0,
}: {
  activity: Activity;
  variant?: "compact" | "full";
  onImageClick?: (index: number) => void;
  imageStartIndex?: number;
}) {
  const [coverImage, ...restImages] = activity.images;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-institucional/10">
        {coverImage ? (
          <button
            type="button"
            onClick={() => onImageClick?.(imageStartIndex)}
            disabled={!onImageClick}
            aria-label={`Ver foto de ${activity.title} en grande`}
            className="relative block h-full w-full disabled:cursor-default"
          >
            <Image
              src={coverImage.url}
              alt={activity.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          </button>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-texto/50">
            Sin foto
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-5">
        <span className="text-sm font-medium text-institucional">
          {formatDate(activity.date)}
        </span>
        <h3 className="text-lg font-semibold text-texto">{activity.title}</h3>

        {variant === "full" && activity.description && (
          <p className="text-sm leading-6 text-texto/80">
            {activity.description}
          </p>
        )}

        {variant === "full" && restImages.length > 0 && (
          <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {restImages.map((image, restIndex) => (
              <button
                key={image.url}
                type="button"
                onClick={() => onImageClick?.(imageStartIndex + 1 + restIndex)}
                disabled={!onImageClick}
                aria-label={`Ver foto de ${activity.title} en grande`}
                className="relative aspect-square overflow-hidden rounded-lg disabled:cursor-default"
              >
                <Image
                  src={image.thumbnailUrl}
                  alt={activity.title}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
