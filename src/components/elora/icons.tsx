"use client";

import { cn } from "@/lib/utils";
import { Sparkles, Droplets, Flower2, Zap } from "lucide-react";

/** Custom hair-dryer SVG for the لوازم برقی category (spec requirement) */
export function HairDryerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 7.5C3 5 6 3.5 10.5 3.5c3.2 0 6.1 1 6.1 1l4.4 1.2c.6.16.6 1 0 1.2L16.6 8.1s-2.9 1-6.1 1C6 9.1 3 8.5 3 7.5Z" />
      <path d="M7 9v2.2c0 1.2 1 2.2 2.2 2.2h1.6" />
      <path d="M9.5 13.4 8.4 19c-.2.9.5 1.8 1.5 1.8h1.2c.7 0 1.3-.5 1.5-1.2l1.2-6" />
      <path d="M3.5 5.6v3.8" />
    </svg>
  );
}

export function CategoryIcon({
  icon,
  className,
}: {
  icon: "makeup" | "care" | "fragrance" | "electric";
  className?: string;
}) {
  if (icon === "electric") return <HairDryerIcon className={className} />;
  if (icon === "makeup") return <Sparkles className={className} aria-hidden />;
  if (icon === "care") return <Droplets className={className} aria-hidden />;
  return <Flower2 className={className} aria-hidden />;
}

export function ZapIcon({ className }: { className?: string }) {
  return <Zap className={className} aria-hidden />;
}

/** Elegant ELORA wordmark */
export function EloraLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 select-none", className)}>
      <span className="relative grid place-items-center size-10 rounded-2xl bg-gradient-to-br from-primary to-lilac text-white shadow-md shadow-rose-200/60">
        <span className="text-xl font-black leading-none pb-0.5" style={{ fontFamily: "Georgia, serif" }}>
          E
        </span>
        <span className="absolute -bottom-0.5 -left-0.5 size-3 rounded-full bg-amber-300/90 border-2 border-white" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className="text-[1.35rem] font-black tracking-[0.18em] bg-gradient-to-l from-primary to-lilac bg-clip-text text-transparent"
          style={{ fontFamily: "Georgia, serif" }}
        >
          ELORA
        </span>
        <span className="text-[0.6rem] text-muted-foreground tracking-[0.3em] mt-1">
          BEAUTY SHOP
        </span>
      </span>
    </span>
  );
}
