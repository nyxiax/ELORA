import Link from "next/link";
import {
  ChevronLeft, Users, ShoppingBag, Package, Store,
  ShieldCheck, Truck, Headphones, BadgePercent, Quote,
} from "lucide-react";
import { HeroSlider } from "@/components/elora/hero-slider";
import { SectionTitle } from "@/components/elora/section-title";
import { ProductCarousel } from "@/components/elora/product-carousel";
import { ProductImage } from "@/components/elora/product-card";
import { StarRating } from "@/components/elora/star-rating";
import { EloraLogo } from "@/components/elora/icons";
import { byId, TRENDING_IDS } from "@/lib/data/products";
import { BRANDS, FEATURED_BRAND_SLUGS } from "@/lib/data/brands";
import { SKIN_TYPES } from "@/lib/data/categories";
import { HOME_TESTIMONIALS } from "@/lib/data/misc";
import { img } from "@/lib/data/images";
import { toFa } from "@/lib/fa";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const deals = byId([
    "vs-pure-seduction-mist",
    "axisy-dark-spot-serum",
    "fino-hair-mask",
    "boj-relief-sunscreen",
    "lrp-hyalu-b5-serum",
    "diva-pro-hair-dryer",
    "dior-jadore-parfum",
    "mac-eyeshadow-palette",
  ]);
  const bestsellers = byId([
    "note-matte-foundation",
    "sericate-hydrating-gel",
    "boj-relief-sunscreen",
    "loreal-total-repair-shampoo",
    "mayb-sky-high-mascara",
    "cerave-moisturizing-cream",
    "cosrx-snail-essence",
    "philips-s5885-shaver",
  ]);
  const picks = byId([
    "vitaplex-repair-mask",
    "yorn-volume-mascara",
    "mayb-fitme-foundation",
    "lrp-anthelios-sunscreen",
    "rare-soft-blush",
    "ordinary-niacinamide",
  ]);
  const trending = byId(TRENDING_IDS);

  return (
    <div className="container-elora space-y-12 py-6 lg:space-y-16 lg:py-8">
      {/* ── 1. Hero ── */}
      <section aria-label="بنرهای اصلی">
        <HeroSlider />
      </section>

      {/* ── 2. Daily deals ── */}
      <section aria-label="تخفیفات روزانه">
        <SectionTitle
          title="تخفیفات روزانه"
          subtitle="تا پایان امروز — تخفیف‌های واقعی روی محبوب‌ترین محصولات"
          action={<SeeAllLink href="/special-offers?section=daily" label="همه تخفیف‌ها" />}
        />
        <div className="rounded-3xl bg-gradient-to-l from-rose-soft/80 via-blush to-white p-3 sm:p-4 ring-1 ring-rose-100">
          <ProductCarousel products={deals} />
        </div>
      </section>

      {/* ── 3. Shop by skin type ── */}
      <section aria-label="انتخاب محصولات بر اساس نوع پوست">
        <SectionTitle
          title="انتخاب محصولات بر اساس نوع پوست"
          subtitle="پوستی که دارید را انتخاب کنید؛ ما مناسب‌ترین محصولات را نشانتان می‌دهیم"
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {SKIN_TYPES.map((s, i) => (
            <Link
              key={s.slug}
              href={`/category/${s.slug}`}
              className="group relative block overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-200/50"
            >
              <div className="relative aspect-square overflow-hidden bg-blush">
                <ProductImage
                  src={img("skin_faces", [0, 1, 6, 4][i])}
                  alt={s.name}
                  className="size-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-plum/10 to-transparent" />
                <div className="absolute bottom-0 right-0 left-0 p-4">
                  <h3 className="text-base font-black text-white">{s.name}</h3>
                  <p className="mt-1 text-[0.7rem] text-white/85">
                    محصولات مخصوص {s.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[0.78rem] font-bold text-primary">مشاهده محصولات</span>
                <ChevronLeft size={15} className="text-rose-300 transition-transform group-hover:-translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 4. Best sellers ── */}
      <section aria-label="پرفروش‌های ماه">
        <SectionTitle
          title="پرفروش‌های ماه"
          subtitle="محصولاتی که مشتریان اِلورا این ماه بیش از همه دوست داشتند"
          action={<SeeAllLink href="/category/all?sort=popular" label="مشاهده همه" />}
        />
        <ProductCarousel products={bestsellers} />
      </section>

      {/* ── 5. Trending products ── */}
      <section aria-label="محصولات ترند">
        <SectionTitle
          title="محصولات ترند"
          subtitle="داغ‌ترین محصولات آرایشی، مراقبت پوست و مو، عطر و بدن این روزها در اِلورا"
          action={<SeeAllLink href="/category/all?tag=trending" label="مشاهده همه" />}
        />
        <ProductCarousel products={trending} />
      </section>

      {/* ── 6. Popular brands ── */}
      <section aria-label="محبوب‌ترین برندها">
        <SectionTitle
          title="محبوب‌ترین برندها"
          subtitle="برای مشاهده محصولات هر برند روی آن کلیک کنید"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
          {FEATURED_BRAND_SLUGS.map((slug) => {
            const b = BRANDS.find((x) => x.slug === slug)!;
            return (
              <Link
                key={slug}
                href={`/brand/${slug}`}
                className="group flex h-20 items-center justify-center rounded-2xl border border-rose-100 bg-white px-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-md"
              >
                <BrandWordmark name={b.name} />
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 7. About + trust ── */}
      <section aria-label="درباره اِلورا" id="about" className="scroll-mt-24">
        <div className="overflow-hidden rounded-3xl border border-rose-100 bg-gradient-to-l from-white via-blush/70 to-lilac-soft/60">
          <div className="grid grid-cols-1 items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
            <div className="text-center lg:text-right">
              <EloraLogo className="scale-110" />
              <h2 className="mt-5 text-xl font-black text-foreground">درباره Elora Shop</h2>
              <p className="mt-3 text-[0.85rem] leading-8 text-secondary-foreground">
                اِلورا یک مقصد مدرن خرید در دنیای زیبایی است؛ با تنوعی گسترده از محصولات
                آرایشی، مراقبت پوست و مو، عطر و رایحه و لوازم برقی زیبایی. ما محصولات را
                از برندهای معتبر جهان انتخاب می‌کنیم تا شما با خیال راحت و تجربه‌ای لذت‌بخش،
                بهترین‌ها را برای خود و عزیزانتان بخرید.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <TrustChip icon={<ShieldCheck size={14} />} label="ضمانت اصالت کالا" />
                <TrustChip icon={<Truck size={14} />} label="ارسال سریع" />
                <TrustChip icon={<Headphones size={14} />} label="پشتیبانی ۷ روز هفته" />
                <TrustChip icon={<BadgePercent size={14} />} label="تخفیف‌های واقعی" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <StatCard icon={<Users className="size-5" />} value="۵۰K+" label="کاربران" tint="bg-rose-50 text-primary" />
              <StatCard icon={<ShoppingBag className="size-5" />} value="۱۲K+" label="ثبت سفارش" tint="bg-purple-50 text-lilac" />
              <StatCard icon={<Package className="size-5" />} value="۸K+" label="تنوع محصولات" tint="bg-amber-50 text-amber-600" />
              <StatCard icon={<Store className="size-5" />} value="۱۲۰+" label="فروشندگان فعال" tint="bg-teal-50 text-teal-600" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Elora picks ── */}
      <section aria-label="منتخب‌های Elora">
        <SectionTitle
          title="منتخب‌های Elora"
          subtitle="تیم اِلورا این‌ها را برای شما انتخاب کرده است"
          action={<SeeAllLink href="/elora-picks" label="مشاهده همه" />}
        />
        <ProductCarousel products={picks} />
      </section>

      {/* ── 9. Four promo banners (2×2) ── */}
      <section aria-label="بنرهای تبلیغاتی">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <PromoBanner
            title="ریمل‌های پرطرفدار"
            desc="مژه‌های بلند و پرحجم در یک حرکت"
            href="/category/mascara"
            image={img("maybelline_mascara", 1)}
          />
          <PromoBanner
            title="محبوب‌ترین محصولات لب"
            desc="رژلب، گلاس و لیپ اویل‌های وایرال"
            href="/category/lipstick"
            image={img("lipstick_set", 1)}
            tint="bg-rose-50"
          />
          <PromoBanner
            title="روتین جدید مراقبت از مو"
            desc="Fino • L'Oréal • Kérastase"
            href="/category/hair-mask"
            image={img("loreal_shampoo", 0)}
            tint="bg-amber-50"
          />
          <PromoBanner
            title="مراقبت از پوست"
            desc="COSRX • Centella • Beauty of Joseon"
            href="/category/serum"
            image={img("skincare_flatlay", 1)}
            tint="bg-teal-50"
          />
        </div>
      </section>

      {/* ── 10. Customer reviews ── */}
      <section aria-label="تجربه مشتریان">
        <SectionTitle
          title="تجربه مشتریان Elora"
          subtitle="حرف‌های مشتریان ما پس از خرید از اِلورا"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_TESTIMONIALS.map((t) => (
            <figure
              key={t.user}
              className="relative rounded-3xl border border-rose-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <Quote className="absolute left-4 top-4 size-7 text-rose-100" />
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-rose-soft to-lilac-soft text-[0.9rem] font-black text-primary">
                  {t.user.charAt(0)}
                </span>
                <div>
                  <figcaption className="text-[0.85rem] font-bold text-foreground">{t.user}</figcaption>
                  <StarRating rating={t.rating} size={12} className="mt-1" />
                </div>
              </div>
              <blockquote className="mt-4 text-[0.82rem] leading-7 text-secondary-foreground">
                «{t.text}»
              </blockquote>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}

function SeeAllLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-[0.78rem] font-bold text-primary transition-colors hover:text-[#b03a63]"
    >
      {label}
      <ChevronLeft size={15} />
    </Link>
  );
}

function PromoBanner({
  title, desc, href, image, tint = "bg-lilac-soft",
}: {
  title: string; desc: string; href: string; image: string; tint?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-40 items-center overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg sm:h-48"
    >
      <div className={cn("absolute inset-0 opacity-90", tint)} />
      <div className="relative z-10 flex h-full w-full items-center justify-between p-5 sm:p-7">
        <div className="max-w-[60%]">
          <h3 className="text-base font-black text-plum sm:text-lg">{title}</h3>
          <p className="mt-1.5 text-[0.72rem] text-secondary-foreground sm:text-[0.8rem]">{desc}</p>
          <span className="mt-3 inline-flex items-center gap-1 rounded-xl bg-white/85 px-3 py-1.5 text-[0.7rem] font-bold text-primary shadow-sm backdrop-blur transition-all group-hover:gap-2">
            خرید کنید
            <ChevronLeft size={13} />
          </span>
        </div>
        <div className="relative size-24 shrink-0 sm:size-32">
          <ProductImage
            src={image}
            alt={title}
            className="size-full rounded-2xl object-cover shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
          />
        </div>
      </div>
    </Link>
  );
}

function BrandWordmark({ name }: { name: string }) {
  const serif = ["Dior", "NARS", "Kérastase"].includes(name);
  return (
    <span
      dir="ltr"
      className={cn(
        "truncate text-center text-[0.95rem] font-black tracking-wide text-plum/80 transition-colors group-hover:text-primary",
        serif ? "font-serif" : ""
      )}
      style={serif ? { fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: "0.12em" } : undefined}
    >
      {name}
    </span>
  );
}

function TrustChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-[0.7rem] font-bold text-secondary-foreground shadow-sm">
      <span className="text-primary">{icon}</span>
      {label}
    </span>
  );
}

function StatCard({
  icon, value, label, tint,
}: {
  icon: React.ReactNode; value: string; label: string; tint: string;
}) {
  return (
    <div className="rounded-3xl border border-rose-100 bg-white/85 p-4 text-center shadow-sm backdrop-blur sm:p-6">
      <span className={cn("mx-auto grid size-11 place-items-center rounded-2xl", tint)}>
        {icon}
      </span>
      <p className="mt-3 text-xl font-black text-foreground sm:text-2xl">{value}</p>
      <p className="mt-1 text-[0.72rem] text-muted-foreground">{label}</p>
    </div>
  );
}
