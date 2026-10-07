"use client";

import { cn } from "@/lib/utils";
import { Flower2 } from "lucide-react";

export function SectionTitle({
  title,
  subtitle,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex flex-wrap items-end justify-between gap-3", className)}>
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-rose-soft to-lilac-soft text-primary">
          <Flower2 size={20} />
        </span>
        <div>
          <h2 className="text-lg font-black text-foreground sm:text-xl">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-[0.8rem]">{subtitle}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}
