"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { toFa } from "@/lib/fa";

export function StarRating({
  rating,
  size = 14,
  className,
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`امتیاز ${toFa(rating.toFixed(1))} از ۵`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-rose-100/70 text-rose-100/70"
          )}
        />
      ))}
    </span>
  );
}
