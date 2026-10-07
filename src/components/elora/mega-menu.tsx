"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/data/categories";
import { CategoryIcon, HairDryerIcon } from "./icons";
import { ChevronLeft, TrendingUp, Sparkles, Gift, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const ELORA_LINKS = [
  { label: "پرفروش‌های هفته", href: "/special-offers?section=week", icon: Flame },
  { label: "جدیدترین محصولات", href: "/category/all?sort=new", icon: Sparkles },
  { label: "تخفیف‌های ویژه", href: "/special-offers?section=all", icon: TrendingUp },
  { label: "محصولات ترند", href: "/category/all?tag=trending", icon: TrendingUp },
  { label: "منتخب‌های Elora", href: "/elora-picks", icon: Gift },
];

/**
 * Wide RTL mega menu anchored to the right side.
 * Right rail = 4 top categories (vertical tabs), content = grouped subcategories,
 * left column = Elora suggestions.
 */
export function MegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  const cat = CATEGORIES[active];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-plum/20 backdrop-blur-[2px]" onClick={onClose} />
      <div
        className="absolute right-0 top-full z-50 w-full max-w-[1180px] rounded-b-3xl border border-t-0 border-rose-100 bg-white shadow-[0_40px_80px_-30px_rgba(160,60,100,0.4)]"
        dir="rtl"
      >
        <div className="grid grid-cols-[220px_1fr_230px] lg:grid-cols-[250px_1fr_250px]">
          {/* right rail: categories */}
          <div className="rounded-br-3xl bg-gradient-to-b from-blush to-white p-3">
            <p className="px-2 pb-2 pt-1 text-[0.72rem] font-bold text-muted-foreground">
              دسته‌بندی محصولات
            </p>
            <ul className="space-y-1">
              {CATEGORIES.map((c, i) => (
                <li key={c.slug}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-right transition-all",
                      i === active
                        ? "bg-white shadow-sm ring-1 ring-rose-200"
                        : "hover:bg-white/70"
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-xl text-white shadow-sm",
                        i === 0 && "bg-gradient-to-br from-primary to-rose-400",
                        i === 1 && "bg-gradient-to-br from-lilac to-purple-400",
                        i === 2 && "bg-gradient-to-br from-amber-400 to-orange-400",
                        i === 3 && "bg-gradient-to-br from-sky-500 to-cyan-400"
                      )}
                    >
                      <CategoryIcon icon={c.icon} className="size-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[0.88rem] font-bold text-foreground">
                        {c.name}
                      </span>
                      <span className="mt-0.5 block text-[0.66rem] text-muted-foreground">
                        {c.groups.reduce((a, g) => a + g.subs.length, 0)} زیرشاخه
                      </span>
                    </span>
                    <ChevronLeft
                      size={15}
                      className={cn(
                        "text-rose-300 transition-transform",
                        i === active && "-translate-x-1 text-primary"
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* middle: groups & subs */}
          <div className="elora-scroll max-h-[520px] overflow-y-auto p-5">
            <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
              {cat.groups.map((g) => (
                <div key={g.title} className="mb-5 break-inside-avoid">
                  <p className="mb-2 flex items-center gap-2 text-[0.8rem] font-black text-foreground">
                    <span className="h-4 w-1 rounded-full bg-gradient-to-b from-primary to-lilac" />
                    {g.title}
                  </p>
                  <ul className="space-y-0.5 border-r border-dashed border-rose-100 pr-3">
                    {g.subs.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/category/${s.slug}`}
                          onClick={onClose}
                          className="group flex items-center gap-1.5 rounded-lg px-1.5 py-[0.28rem] text-[0.76rem] text-secondary-foreground transition-colors hover:bg-rose-50/70 hover:text-primary"
                        >
                          <span className="size-1 rounded-full bg-rose-200 transition-colors group-hover:bg-primary" />
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* left: Elora suggestions */}
          <div className="rounded-bl-3xl border-l border-rose-100 bg-gradient-to-b from-lilac-soft/70 to-white p-4">
            <p className="mb-3 flex items-center gap-2 text-[0.82rem] font-black text-foreground">
              <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-lilac text-white">
                <Sparkles size={14} />
              </span>
              پیشنهادهای Elora
            </p>
            <ul className="space-y-1">
              {ELORA_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={onClose}
                    className="flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-[0.78rem] font-semibold text-secondary-foreground transition-all hover:bg-white hover:shadow-sm hover:text-primary"
                  >
                    <l.icon size={15} className="text-primary" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/category/all"
              onClick={onClose}
              className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] py-3 text-[0.8rem] font-bold text-white shadow-md shadow-rose-200 transition-all hover:shadow-lg"
            >
              مشاهده همه محصولات
              <ChevronLeft size={15} />
            </Link>
            <div className="mt-4 hidden items-center gap-2 rounded-2xl bg-white/70 p-3 text-[0.68rem] leading-5 text-muted-foreground lg:flex">
              <HairDryerIcon className="size-8 shrink-0 text-sky-400" />
              جدیدترین لوازم برقی حالت‌دهی مو با ۱۲ ماه گارانتی معتبر در اِلورا
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
