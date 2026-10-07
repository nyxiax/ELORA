"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeft } from "lucide-react";
import { searchProducts } from "@/lib/data/products";
import { brandNameFa } from "@/lib/data/products";
import { faPrice, toFa } from "@/lib/fa";
import { ProductImage } from "./product-card";
import { cn } from "@/lib/utils";

export function SearchBox({ mobile = false }: { mobile?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = q.trim() ? searchProducts(q).slice(0, 6) : [];
  const total = q.trim() ? searchProducts(q).length : 0;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const go = (query: string) => {
    setOpen(false);
    setQ(query);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const submit = () => {
    if (!q.trim()) {
      inputRef.current?.focus();
      return;
    }
    go(q.trim());
  };

  return (
    <div ref={boxRef} className={cn("relative w-full", mobile ? "" : "max-w-xl")}>
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-rose-300"
        />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          type="text"
          placeholder="جستجو در محصولات، برندها و دسته‌بندی‌ها…"
          aria-label="جستجو"
          className="h-11 w-full rounded-2xl border border-rose-100 bg-rose-50/60 pr-11 pl-4 text-[0.83rem] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
        />
      </div>

      {open && q.trim().length > 0 && (
        <div className="elora-scroll absolute inset-x-0 top-[calc(100%+8px)] z-50 max-h-[420px] overflow-y-auto rounded-2xl border border-rose-100 bg-white p-2 shadow-[0_24px_60px_-20px_rgba(160,60,100,0.35)]">
          <p className="px-3 py-2 text-[0.72rem] text-muted-foreground">
            نتایج جستجو برای «<span className="font-bold text-foreground">{q.trim()}</span>»
            {total > 0 && <> — {toFa(total)} محصول</>}
          </p>
          {results.length === 0 ? (
            <div className="px-3 pb-4 pt-1 text-center text-[0.8rem] text-muted-foreground">
              محصولی با این عبارت پیدا نشد. عبارت دیگری را امتحان کنید.
            </div>
          ) : (
            <>
              {results.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setOpen(false);
                    router.push(`/product/${p.id}`);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl p-2 text-right transition-colors hover:bg-rose-50/80"
                >
                  <span className="size-12 shrink-0 overflow-hidden rounded-lg bg-blush">
                    <ProductImage src={p.images[0]} alt={p.name} className="size-full" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.8rem] font-semibold text-foreground">
                      {p.name}
                    </span>
                    <span className="mt-0.5 block text-[0.68rem] text-lilac">
                      {brandNameFa(p.brandSlug)} — {p.sub}
                    </span>
                  </span>
                  <span className="shrink-0 text-[0.75rem] font-bold text-primary">
                    {faPrice(p.price)}
                  </span>
                </button>
              ))}
              <button
                onClick={() => go(q.trim())}
                className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl bg-rose-50/80 py-2.5 text-[0.78rem] font-bold text-primary transition-colors hover:bg-rose-100"
              >
                مشاهده همه نتایج ({toFa(total)})
                <ArrowLeft size={14} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
