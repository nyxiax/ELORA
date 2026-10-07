"use client";

import { cn } from "@/lib/utils";
import { Package, PackageSearch, Truck, CheckCircle2, Clock3 } from "lucide-react";

export function OrderStatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; icon: React.ReactNode }> = {
    "ثبت شده": { cls: "bg-sky-50 text-sky-600 ring-sky-100", icon: <Clock3 size={12} /> },
    "در حال آماده‌سازی": { cls: "bg-amber-50 text-amber-600 ring-amber-100", icon: <Package size={12} /> },
    "ارسال شده": { cls: "bg-purple-50 text-lilac ring-purple-100", icon: <Truck size={12} /> },
    "تحویل داده شده": { cls: "bg-emerald-50 text-emerald-600 ring-emerald-100", icon: <CheckCircle2 size={12} /> },
  };
  const m = map[status] || map["ثبت شده"];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.7rem] font-bold ring-1",
        m.cls
      )}
    >
      {m.icon}
      {status}
    </span>
  );
}

export { PackageSearch };
