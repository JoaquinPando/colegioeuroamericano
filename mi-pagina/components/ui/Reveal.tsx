"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useInView } from "@/hooks/useInView";

type RevealProps = ComponentPropsWithoutRef<"div"> & {
  delay?: number;
};

export default function Reveal({
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${isInView ? "reveal-visible" : ""} ${className}`}
      style={{ ...style, transitionDelay: isInView ? `${delay}ms` : undefined }}
      {...rest}
    >
      {children}
    </div>
  );
}
