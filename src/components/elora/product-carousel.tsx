"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./product-card";
import { Product } from "@/lib/types";
import { useMounted } from "./use-mounted";

/** Horizontal product carousel — arrows on desktop, native swipe everywhere */
export function ProductCarousel({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  const mounted = useMounted();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: "rtl",
    align: "start",
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const raf = useRef(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={cn("relative", className)}>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container -ml-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="embla__slide w-[46%] min-[420px]:w-[42%] sm:w-[36%] md:w-[30%] lg:w-[23.5%] xl:w-[19%] pl-3"
            >
              <ProductCard product={p} className="h-full" />
            </div>
          ))}
        </div>
      </div>

      {mounted && (
        <>
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label="اسلاید قبلی"
            className="absolute -right-2 top-[38%] z-20 hidden size-10 place-items-center rounded-full border border-rose-100 bg-white text-rose-500 shadow-md transition-all hover:bg-rose-50 disabled:opacity-0 md:grid"
          >
            <ChevronRight size={19} />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label="اسلاید بعدی"
            className="absolute -left-2 top-[38%] z-20 hidden size-10 place-items-center rounded-full border border-rose-100 bg-white text-rose-500 shadow-md transition-all hover:bg-rose-50 disabled:opacity-0 md:grid"
          >
            <ChevronLeft size={19} />
          </button>
        </>
      )}
    </div>
  );
}
