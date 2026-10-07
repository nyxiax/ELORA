"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMounted } from "./use-mounted";
import { ProductImage } from "./product-card";
import { img } from "@/lib/data/images";

interface Slide {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image: string;
  bg: string;
  badge?: string;
}

const SLIDES: Slide[] = [
  {
    title: "جدیدترین محصولات مراقبت پوست سنتلا",
    subtitle: "مراقبت عمیق و ملایم برای پوست تو",
    cta: "مشاهده و خرید",
    href: "/brand/centella",
    image: img("skincare_flatlay", 0),
    bg: "from-rose-100 via-rose-50 to-white",
    badge: "تازه رسیده",
  },
  {
    title: "مراقبت حرفه‌ای از مو با Fino",
    subtitle: "برای موهایی سالم، نرم و درخشان",
    cta: "مشاهده و خرید",
    href: "/product/fino-hair-mask",
    image: img("fino", 0),
    bg: "from-amber-100 via-orange-50 to-white",
    badge: "پرفروش هفته",
  },
  {
    title: "محبوب‌ترین‌های آرایشی",
    subtitle: "Rare Beauty • Maybelline • MAC — محبوب‌های همیشه",
    cta: "مشاهده و خرید",
    href: "/category/makeup",
    image: img("makeup_flatlay", 0),
    bg: "from-lilac-soft via-purple-50 to-white",
    badge: "ترند امروز",
  },
  {
    title: "روتین کامل مراقبت از پوست",
    subtitle: "سرم، پاک‌کننده، مرطوب‌کننده و ضدآفتاب — همه در یک مجموعه",
    cta: "مشاهده و خرید",
    href: "/category/serum",
    image: img("hero_skincare", 4),
    bg: "from-teal-50 via-cyan-50 to-white",
    badge: "مجموعه کامل",
  },
];

export function HeroSlider() {
  const mounted = useMounted();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ direction: "rtl", loop: true }, [
    Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative" data-mounted={mounted}>
      <div className="embla rounded-3xl" ref={emblaRef}>
        <div className="embla__container">
          {SLIDES.map((slide) => (
            <div key={slide.title} className="embla__slide min-w-0 flex-[0_0_100%]">
              <div
                className={cn(
                  "relative flex h-[300px] items-center overflow-hidden rounded-3xl bg-gradient-to-l sm:h-[360px] lg:h-[440px]",
                  slide.bg
                )}
              >
                {/* decorative blobs */}
                <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/50 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-1/3 size-48 rounded-full bg-white/40 blur-3xl" />

                {/* text */}
                <div className="relative z-10 flex h-full w-full items-center justify-between gap-4 px-6 sm:px-12 lg:px-16">
                  <div className="max-w-[62%]">
                    {slide.badge && (
                      <span className="mb-3 inline-block rounded-full bg-white/80 px-3 py-1 text-[0.66rem] font-bold text-primary shadow-sm backdrop-blur sm:text-[0.72rem]">
                        {slide.badge}
                      </span>
                    )}
                    <h2 className="text-balance-fa text-lg font-black leading-8 text-plum sm:text-2xl sm:leading-10 lg:text-[2rem] lg:leading-[3rem]">
                      {slide.title}
                    </h2>
                    <p className="mt-2 text-[0.8rem] leading-6 text-secondary-foreground sm:mt-3 sm:text-sm sm:leading-7">
                      {slide.subtitle}
                    </p>
                    <Link
                      href={slide.href}
                      className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] px-5 py-2.5 text-[0.8rem] font-bold text-white shadow-lg shadow-rose-300/50 transition-all hover:-translate-y-0.5 hover:shadow-xl sm:mt-6 sm:px-7 sm:py-3 sm:text-[0.9rem]"
                    >
                      {slide.cta}
                      <ChevronLeft size={16} />
                    </Link>
                  </div>

                  {/* image */}
                  <div className="relative hidden h-[70%] w-[30%] sm:block">
                    <div className="absolute inset-0 rotate-3 rounded-[2rem] bg-white/60 shadow-2xl shadow-rose-200/60" />
                    <ProductImage
                      src={slide.image}
                      alt={slide.title}
                      className="absolute inset-0 size-full rounded-[2rem] object-cover shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* controls */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="اسلاید قبلی"
        className="absolute right-4 top-1/2 z-10 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-plum shadow-md backdrop-blur transition-all hover:bg-white md:grid"
      >
        <ChevronRight size={19} />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        aria-label="اسلاید بعدی"
        className="absolute left-4 top-1/2 z-10 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-plum shadow-md backdrop-blur transition-all hover:bg-white md:grid"
      >
        <ChevronLeft size={19} />
      </button>

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`اسلاید ${i + 1}`}
            className={cn(
              "h-2 rounded-full bg-plum/25 transition-all",
              i === selectedIndex ? "w-6 bg-primary" : "w-2 hover:bg-plum/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
