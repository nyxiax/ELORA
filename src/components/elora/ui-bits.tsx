"use client";

import { Minus, Plus, PackageSearch, HeartCrack } from "lucide-react";
import { cn } from "@/lib/utils";
import { toFa } from "@/lib/fa";

export function QuantityStepper({
  value,
  onChange,
  max = 20,
  className,
}: {
  value: number;
  onChange: (v: number) => void;
  max?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-xl border border-rose-100 bg-white shadow-sm",
        className
      )}
    >
      <button
        onClick={() => onChange(Math.min(value + 1, max))}
        disabled={value >= max}
        aria-label="افزایش تعداد"
        className="grid size-10 place-items-center rounded-r-xl text-primary transition-colors hover:bg-rose-50 disabled:opacity-40"
      >
        <Plus size={16} />
      </button>
      <span className="w-10 text-center text-sm font-bold">{toFa(value)}</span>
      <button
        onClick={() => onChange(Math.max(value - 1, 1))}
        disabled={value <= 1}
        aria-label="کاهش تعداد"
        className="grid size-10 place-items-center rounded-l-xl text-primary transition-colors hover:bg-rose-50 disabled:opacity-40"
      >
        <Minus size={16} />
      </button>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  icon = "search",
  action,
}: {
  title: string;
  description?: string;
  icon?: "search" | "wishlist" | "cart" | "generic";
  action?: React.ReactNode;
}) {
  const Icon =
    icon === "wishlist" ? HeartCrack : icon === "cart" || icon === "generic" ? PackageSearch : PackageSearch;
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-rose-200 bg-white/70 px-6 py-16 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-blush text-rose-400">
        <Icon size={28} />
      </span>
      <h3 className="mt-4 text-base font-bold text-foreground">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
