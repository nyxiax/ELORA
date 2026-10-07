"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Percent, Sparkles, Clock3, Tag, Brush, Leaf, Flame } from "lucide-react";

const TABS = [
  { key: "daily", label: "تخفیفات روزانه", icon: Percent },
  { key: "amazing", label: "پیشنهادهای شگفت‌انگیز", icon: Sparkles },
  { key: "last", label: "آخرین فرصت‌ها", icon: Clock3 },
  { key: "all", label: "محصولات با تخفیف", icon: Tag },
  { key: "makeup", label: "ویژه آرایشی", icon: Brush },
  { key: "care", label: "ویژه مراقبتی", icon: Leaf },
  { key: "week", label: "پرفروش‌های هفته", icon: Flame },
];

export function SpecialOffersClient({ current }: { current: string }) {
  return (
    <div className="border-b border-rose-100 bg-gradient-to-l from-rose-soft/60 to-lilac-soft/50">
      <div className="container-elora elora-scroll flex gap-2 overflow-x-auto py-4">
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={`/special-offers?section=${t.key}`}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[0.76rem] font-bold transition-all",
              current === t.key
                ? "bg-gradient-to-l from-primary to-[#c2476f] text-white shadow-md shadow-rose-200"
                : "bg-white/80 text-secondary-foreground ring-1 ring-rose-100 hover:bg-white hover:text-primary"
            )}
          >
            <t.icon size={14} />
            {t.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
