import type { Metadata } from "next";
import { byId, byTag } from "@/lib/data/products";
import { ListingView } from "@/components/elora/listing-view";

export const metadata: Metadata = { title: "منتخب‌های Elora" };

export default function EloraPicksPage() {
  const picks = [
    ...byId([
      "vitaplex-repair-mask",
      "yorn-volume-mascara",
      "mayb-fitme-foundation",
      "lrp-anthelios-sunscreen",
      "rare-soft-blush",
      "ordinary-niacinamide",
    ]),
    ...byTag("trending").filter((p) => !p.tags?.includes("pick")),
  ];

  return (
    <ListingView
      config={{
        title: "منتخب‌های Elora",
        description:
          "تیم اِلورا هر هفته محصولات برتر را از میان صدها کالا انتخاب می‌کند؛ این‌ها علاقه‌مندی‌های فعلی ما هستند.",
        crumbs: [{ label: "منتخب‌های Elora" }],
        products: picks,
      }}
    />
  );
}
