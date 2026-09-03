import type { ReactNode } from "react";
import type { ServiceIconKey } from "@/lib/servicios/types";

const paths: Record<ServiceIconKey, ReactNode> = {
  book: (
    <path d="M4 5.5C4 4.67 4.67 4 5.5 4H12v16H5.5A1.5 1.5 0 014 18.5v-13zM20 5.5C20 4.67 19.33 4 18.5 4H12v16h6.5a1.5 1.5 0 001.5-1.5v-13z" />
  ),
  cap: (
    <path d="M12 3l10 5-10 5L2 8l10-5zm-6 8.2v4.3c0 .5 3 3 6 3s6-2.5 6-3v-4.3M20 9v6" />
  ),
  pencil: (
    <path d="M4 20h4L18.5 9.5a2.1 2.1 0 00-3-3L5 17v3zm10.5-14l3 3" />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8L6 18M18 6l1.8-1.8" />
    </>
  ),
};

export default function ServiceIcon({
  icon,
  className = "h-7 w-7",
}: {
  icon: ServiceIconKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[icon]}
    </svg>
  );
}
