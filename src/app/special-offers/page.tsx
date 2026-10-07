import type { Metadata } from "next";
import { discounted, byTag, byId, PRODUCTS } from "@/lib/data/products";
import { ListingView, SortKey } from "@/components/elora/listing-view";
import { SpecialOffersClient } from "@/components/elora/special-offers-client";

export const metadata: Metadata = { title: "پیشنهادات ویژه" };

interface Props {
  searchParams: Promise<{ section?: string; sort?: string }>;
}

export default async function SpecialOffersPage({ searchParams }: Props) {
  const { section = "daily", sort } = await searchParams;

  const sections: Record<
    string,
    { title: string; desc: string; products: typeof PRODUCTS }
  > = {
    daily: {
      title: "تخفیفات روزانه",
      desc: "هر روز با تخفیف‌های تازه و واقعی؛ امروز این‌ها منتظر شما هستند.",
      products: byId([
        "vs-pure-seduction-mist",
        "axisy-dark-spot-serum",
        "fino-hair-mask",
        "boj-relief-sunscreen",
        "lrp-hyalu-b5-serum",
      ]),
    },
    amazing: {
      title: "پیشنهادهای شگفت‌انگیز",
      desc: "تخفیف‌های باورنکردنی روی محصولات محبوب؛ تا موجودی تمام نشده!",
      products: discounted().sort((a, b) => b.oldPrice! - b.price - (a.oldPrice! - a.price)),
    },
    last: {
      title: "آخرین فرصت‌ها",
      desc: "این تخفیف‌ها به‌زودی تمام می‌شوند؛ الان بهترین زمان خرید است.",
      products: [...byTag("week"), ...byTag("trending")].filter(
        (p, i, arr) => arr.findIndex((x) => x.id === p.id) === i
      ),
    },
    all: {
      title: "محصولات با تخفیف",
      desc: "همه‌ی محصولات تخفیف‌دار اِلورا در یک نگاه.",
      products: discounted(),
    },
    makeup: {
      title: "پیشنهادهای ویژه آرایشی",
      desc: "تخفیف ویژه روی ریمل‌ها، رژلب‌ها و کرم پودرهای محبوب.",
      products: discounted().filter((p) => p.category === "makeup"),
    },
    care: {
      title: "پیشنهادهای ویژه مراقبتی",
      desc: "مراقبت پوست و مو با قیمت‌های دوست‌داشتنی.",
      products: discounted().filter((p) => p.category === "care"),
    },
    week: {
      title: "پرفروش‌های هفته",
      desc: "محصولاتی که این هفته بیش از همه به سبد مشتریان اضافه شدند.",
      products: byTag("week"),
    },
  };

  const current = sections[section] || sections.daily;

  return (
    <div>
      {/* section tabs */}
      <SpecialOffersClient current={section} />

      <ListingView
        config={{
          title: current.title,
          description: current.desc,
          crumbs: [{ label: "پیشنهادات ویژه", href: "/special-offers" }, { label: current.title }],
          products: current.products,
          initialSort: (sort as SortKey) || "discount",
          emptyDesc: "در این بخش فعلاً محصولی با تخفیف نداریم؛ به‌زودی برگردید!",
        }}
      />
    </div>
  );
}
