"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X, Check } from "lucide-react";
import { ProductCard } from "./product-card";
import { Product } from "@/lib/types";
import { brandNameFa, PRODUCTS } from "@/lib/data/products";
import { BRANDS } from "@/lib/data/brands";
import { faNumber, toFa } from "@/lib/fa";
import { EmptyState } from "./ui-bits";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Breadcrumb, Crumb } from "./breadcrumb";

export type SortKey = "popular" | "new" | "cheap" | "expensive" | "discount";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "popular", label: "محبوب‌ترین" },
  { key: "new", label: "جدیدترین" },
  { key: "cheap", label: "ارزان‌ترین" },
  { key: "expensive", label: "گران‌ترین" },
  { key: "discount", label: "بیشترین تخفیف" },
];

export interface ListingConfig {
  title: string;
  description?: string;
  crumbs: Crumb[];
  products: Product[];
  initialSort?: SortKey;
  filters?: { brands?: boolean; price?: boolean; skinTypes?: boolean };
  emptyTitle?: string;
  emptyDesc?: string;
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const arr = [...list];
  switch (sort) {
    case "popular":
      return arr.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
    case "new":
      return arr.sort(
        (a, b) => (b.tags?.includes("new") ? 1 : 0) - (a.tags?.includes("new") ? 1 : 0)
      );
    case "cheap":
      return arr.sort((a, b) => a.price - b.price);
    case "expensive":
      return arr.sort((a, b) => b.price - a.price);
    case "discount": {
      const d = (p: Product) => (p.oldPrice ? (p.oldPrice - p.price) / p.oldPrice : -1);
      return arr.sort((a, b) => d(b) - d(a));
    }
  }
}

export function ListingView({ config, tagParam }: { config: ListingConfig; tagParam?: string }) {
  const [sort, setSort] = useState<SortKey>(config.initialSort || "popular");
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [skinFilter, setSkinFilter] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedPrice, setAppliedPrice] = useState<[number, number] | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const availableBrands = useMemo(() => {
    const slugs = [...new Set(config.products.map((p) => p.brandSlug))];
    return BRANDS.filter((b) => slugs.includes(b.slug));
  }, [config.products]);

  const availableSkinTypes = useMemo(() => {
    const set = new Set<string>();
    config.products.forEach((p) => p.skinTypes?.forEach((s) => set.add(s)));
    return [...set];
  }, [config.products]);

  const filtered = useMemo(() => {
    let list = config.products;
    if (tagParam) list = list.filter((p) => p.tags?.includes(tagParam as never));
    if (brandFilter.length) list = list.filter((p) => brandFilter.includes(p.brandSlug));
    if (skinFilter.length) list = list.filter((p) => p.skinTypes?.some((s) => skinFilter.includes(s)));
    if (appliedPrice) {
      const [min, max] = appliedPrice;
      list = list.filter((p) => p.price >= min && (!max || p.price <= max));
    }
    return sortProducts(list, sort);
  }, [config.products, brandFilter, skinFilter, appliedPrice, sort, tagParam]);

  const activeFilterCount =
    brandFilter.length + skinFilter.length + (appliedPrice ? 1 : 0);

  const resetAll = () => {
    setBrandFilter([]);
    setSkinFilter([]);
    setMinPrice("");
    setMaxPrice("");
    setAppliedPrice(null);
  };

  const filters = config.filters || { brands: true, price: true, skinTypes: true };

  const FilterPanel = (
    <div className="space-y-6">
      {/* brands */}
      {filters.brands && availableBrands.length > 0 && (
        <div>
          <h4 className="mb-3 text-[0.82rem] font-black text-foreground">برند</h4>
          <div className="elora-scroll max-h-48 space-y-1 overflow-y-auto pl-1">
            {availableBrands.map((b) => (
              <label
                key={b.slug}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-[0.78rem] text-secondary-foreground transition-colors hover:bg-rose-50/70"
              >
                <input
                  type="checkbox"
                  checked={brandFilter.includes(b.slug)}
                  onChange={() =>
                    setBrandFilter((prev) =>
                      prev.includes(b.slug) ? prev.filter((x) => x !== b.slug) : [...prev, b.slug]
                    )
                  }
                  className="size-4 accent-rose-500"
                />
                <span dir="ltr" className="font-semibold">{b.name}</span>
                <span className="text-[0.68rem] text-muted-foreground">
                  ({toFa(config.products.filter((p) => p.brandSlug === b.slug).length)})
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* price */}
      {filters.price && (
        <div>
          <h4 className="mb-3 text-[0.82rem] font-black text-foreground">محدوده قیمت (تومان)</h4>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              placeholder="از"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="h-10 w-full rounded-xl border border-rose-100 bg-rose-50/50 px-3 text-[0.78rem] outline-none focus:border-rose-300 focus:bg-white"
            />
            <span className="text-rose-300">—</span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="تا"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="h-10 w-full rounded-xl border border-rose-100 bg-rose-50/50 px-3 text-[0.78rem] outline-none focus:border-rose-300 focus:bg-white"
            />
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {[
              { label: "زیر ۱ میلیون", min: 0, max: 1000000 },
              { label: "۱ تا ۳ میلیون", min: 1000000, max: 3000000 },
              { label: "بالای ۳ میلیون", min: 3000000, max: 0 },
            ].map((r) => (
              <button
                key={r.label}
                onClick={() => setAppliedPrice([r.min, r.max])}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[0.68rem] transition-colors",
                  appliedPrice?.[0] === r.min && appliedPrice?.[1] === r.max
                    ? "border-primary bg-rose-50 text-primary"
                    : "border-rose-100 text-secondary-foreground hover:border-rose-200"
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
          <Button
            size="sm"
            onClick={() => {
              const min = Number(minPrice) || 0;
              const max = Number(maxPrice) || 0;
              setAppliedPrice(max || min ? [min, max] : null);
            }}
            className="mt-3 h-9 w-full rounded-xl bg-plum text-[0.75rem] font-bold hover:bg-plum/90"
          >
            اعمال قیمت
          </Button>
        </div>
      )}

      {/* skin types */}
      {filters.skinTypes && availableSkinTypes.length > 0 && (
        <div>
          <h4 className="mb-3 text-[0.82rem] font-black text-foreground">مناسب برای</h4>
          <div className="flex flex-wrap gap-1.5">
            {availableSkinTypes.map((s) => (
              <button
                key={s}
                onClick={() =>
                  setSkinFilter((prev) =>
                    prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
                  )
                }
                className={cn(
                  "rounded-full border px-3 py-1.5 text-[0.72rem] font-semibold transition-colors",
                  skinFilter.includes(s)
                    ? "border-primary bg-rose-50 text-primary"
                    : "border-rose-100 text-secondary-foreground hover:border-rose-200"
                )}
              >
                پوست {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeFilterCount > 0 && (
        <button
          onClick={resetAll}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-rose-200 py-2.5 text-[0.75rem] font-bold text-rose-500 transition-colors hover:bg-rose-50"
        >
          <X size={14} />
          حذف همه فیلترها
        </button>
      )}
    </div>
  );

  return (
    <div className="container-elora py-6 lg:py-8">
      <Breadcrumb items={config.crumbs} />

      <div className="mb-6 rounded-3xl bg-gradient-to-l from-blush via-white to-lilac-soft/50 p-5 ring-1 ring-rose-100 sm:p-7">
        <h1 className="text-xl font-black text-foreground sm:text-2xl">{config.title}</h1>
        {config.description && (
          <p className="mt-2 max-w-2xl text-[0.8rem] leading-6 text-secondary-foreground">
            {config.description}
          </p>
        )}
        <p className="mt-2 text-[0.75rem] text-muted-foreground">
          {toFa(filtered.length)} محصول پیدا شد
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        {/* sidebar filters — desktop */}
        <aside className="hidden h-fit rounded-3xl border border-rose-100 bg-white p-5 shadow-sm lg:block">
          <h3 className="mb-5 flex items-center gap-2 text-[0.85rem] font-black text-foreground">
            <SlidersHorizontal size={16} className="text-primary" />
            فیلترها
          </h3>
          {FilterPanel}
        </aside>

        <div>
          {/* toolbar */}
          <div className="mb-4 flex items-center justify-between gap-3">
            {/* mobile filter sheet */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 rounded-xl border-rose-200 text-[0.78rem] font-bold text-plum lg:hidden"
                >
                  <SlidersHorizontal size={15} className="ml-1" />
                  فیلترها
                  {activeFilterCount > 0 && (
                    <span className="grid size-5 place-items-center rounded-full bg-primary text-[0.62rem] text-white">
                      {toFa(activeFilterCount)}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="elora-scroll w-[300px] overflow-y-auto">
                <SheetHeader className="p-4 pb-2 text-right">
                  <SheetTitle className="text-[0.9rem]">فیلترها</SheetTitle>
                </SheetHeader>
                <div className="p-4 pt-0">{FilterPanel}</div>
              </SheetContent>
            </Sheet>

            {/* sort */}
            <div className="flex flex-wrap items-center gap-1.5">
              {SORTS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setSort(s.key)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-[0.72rem] font-semibold transition-colors",
                    sort === s.key
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white text-secondary-foreground ring-1 ring-rose-100 hover:bg-rose-50"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* grid */}
          {filtered.length === 0 ? (
            <EmptyState
              title="محصولی یافت نشد"
              description={
                config.emptyDesc ||
                "با فیلترهای فعلی محصولی پیدا نشد. فیلترها را تغییر دهید یا عبارت دیگری جستجو کنید."
              }
            />
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** subcategory slug → related product set (with graceful fallback to group/category) */
export function productsForSubSlug(subSlug: string): Product[] {
  const direct = PRODUCTS.filter((p) => p.subSlug === subSlug);
  if (direct.length) return direct;
  // keyword-ish fallbacks so no subcategory link is dead
  const alias: Record<string, string[]> = {
    concealer: ["foundation"],
    powder: ["foundation"],
    "bb-cream": ["foundation"],
    "cc-cream": ["bb-cream", "foundation"],
    primer: ["foundation", "setting-spray"],
    highlighter: ["blush"],
    contour: ["blush", "bronzer"],
    bronzer: ["blush"],
    "lip-tint": ["lipstick", "liquid-lipstick"],
    "lip-liner": ["lipstick"],
    "lip-balm": ["lip-oil", "lip-gloss"],
    "liquid-lipstick": ["lipstick"],
    eyeliner: ["mascara"],
    "eye-pencil": ["eyeliner", "mascara"],
    "false-lashes": ["mascara"],
    "lash-glue": ["false-lashes", "mascara"],
    "eyebrow-pencil": ["brow-gel"],
    "brow-shadow": ["brow-gel"],
    "brow-soap": ["brow-gel"],
    "brow-mascara": ["brow-gel"],
    "base-coat": ["nail-polish"],
    "top-coat": ["nail-polish"],
    "nail-strengthener": ["nail-polish"],
    "manicure-tools": ["nail-polish"],
    "makeup-pads": ["beauty-sponge", "makeup-brush"],
    mirror: ["beauty-sponge", "makeup-brush"],
    "eyelash-curler": ["mascara"],
    "makeup-razor": ["beauty-sponge"],
    "makeup-bag": ["makeup-brush"],
    "micellar-water": ["cleanser"],
    "face-wash": ["cleanser"],
    "face-foam": ["cleanser"],
    moisturizer: ["hydrator"],
    hydrator: ["moisturizer", "serum"],
    sunscreen: ["serum"],
    "eye-cream": ["serum", "moisturizer"],
    "face-mask": ["exfoliator", "serum"],
    "face-scrub": ["exfoliator"],
    "acne-care": ["serum"],
    "anti-spot": ["serum"],
    "anti-wrinkle": ["serum"],
    "skin-repair": ["serum"],
    brightening: ["serum", "toner"],
    "oily-skin": ["serum", "moisturizer", "cleanser"],
    "dry-skin": ["moisturizer", "serum"],
    "combination-skin": ["serum", "moisturizer"],
    "sensitive-skin": ["cleanser", "serum", "moisturizer"],
    conditioner: ["shampoo"],
    "hair-serum": ["hair-oil"],
    "hair-oil": ["hair-serum", "hair-mask"],
    "hair-spray": ["heat-protectant"],
    "heat-protectant": ["hair-spray"],
    "anti-hair-loss": ["shampoo", "hair-oil"],
    "anti-dandruff": ["shampoo"],
    "dry-hair": ["hair-mask", "hair-oil"],
    "oily-hair": ["shampoo"],
    "curly-hair": ["hair-mask", "hair-oil"],
    "colored-hair": ["hair-mask", "shampoo"],
    "hair-repair": ["hair-mask"],
    "body-cream": ["body-lotion"],
    "body-scrub": ["body-lotion"],
    "body-oil": ["body-lotion"],
    "body-butter": ["body-lotion"],
    "body-wash": ["shower-gel", "body-lotion"],
    "shower-gel": ["body-wash"],
    "hand-cream": ["body-lotion"],
    "foot-cream": ["hand-cream", "body-lotion"],
    "stretch-mark": ["body-lotion", "body-butter"],
    "lip-balm-care": ["lip-balm"],
    "lip-scrub": ["lip-mask", "lip-balm"],
    "lip-mask": ["lip-scrub"],
    "dry-lips": ["lip-balm", "lip-mask"],
    toothpaste: ["mouthwash"],
    toothbrush: ["toothpaste"],
    mouthwash: ["toothpaste"],
    "dental-floss": ["toothpaste"],
    "teeth-whitening": ["toothpaste"],
    "gum-care": ["mouthwash"],
    "feminine-care": ["intimate-wash"],
    "intimate-wash": ["feminine-care"],
    "wet-wipes": ["sanitizer"],
    sanitizer: ["wet-wipes"],
    "daily-hygiene": ["wet-wipes", "sanitizer"],
    "hand-cream-dp": ["hand-cream"],
    "foot-cream-dp": ["foot-cream"],
    "hand-mask": ["hand-cream"],
    "foot-mask": ["foot-cream"],
    "cracked-heels": ["foot-cream"],
    "eau-de-parfum": ["women-perfume"],
    "eau-de-toilette": ["eau-de-parfum"],
    cologne: ["eau-de-parfum"],
    "men-perfume": ["unisex-perfume", "eau-de-parfum"],
    "unisex-perfume": ["eau-de-parfum"],
    "body-mist": ["body-splash"],
    "body-spray": ["body-mist", "body-splash"],
    deodorant: ["body-spray"],
    "fragranced-hand-cream": ["fragranced-lotion", "hand-cream"],
    "fragrance-sets": ["gift-sets"],
    "gift-sets": ["fragrance-sets"],
    "scented-body": ["fragranced-lotion"],
    "hot-air-brush": ["hair-dryer", "hair-straightener"],
    "hair-straightener": ["hair-dryer"],
    "hair-curler": ["hair-straightener"],
    "hair-styler": ["hair-straightener", "hair-curler"],
    "electric-rollers": ["hair-curler"],
    "thermal-brush": ["hot-air-brush"],
    "ladies-trimmer": ["ladies-shaver", "epilator"],
    "body-groomer": ["ladies-shaver"],
    "men-shaver": ["beard-shaver"],
    "edger": ["men-trimmer", "beard-shaver"],
    "facial-device": ["face-massager"],
    "cleansing-brush": ["facial-device", "face-massager"],
    "skincare-device": ["face-massager", "facial-device"],
  };
  const relatedSlugs = alias[subSlug] || [];
  for (const rs of relatedSlugs) {
    const list = PRODUCTS.filter((p) => p.subSlug === rs);
    if (list.length) return list;
  }
  // fallback: same group
  const any = PRODUCTS.find((p) => p.subSlug === subSlug);
  const group = PRODUCTS.find((p) =>
    p.subSlug === subSlug ? true : relatedSlugs.includes(p.subSlug)
  );
  if (group) return PRODUCTS.filter((p) => p.group === group.group);
  return PRODUCTS.filter((p) => p.category === "care").slice(0, 8);
}

export { brandNameFa, faNumber };
