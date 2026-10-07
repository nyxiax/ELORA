import type { Metadata } from "next";
import { searchProducts } from "@/lib/data/products";
import { ListingView, SortKey } from "@/components/elora/listing-view";
import { toFa } from "@/lib/fa";

interface Props {
  searchParams: Promise<{ q?: string; sort?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q ? `نتایج جستجو برای «${q}»` : "جستجو" };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "", sort } = await searchParams;
  const results = searchProducts(q);

  return (
    <ListingView
      config={{
        title: `نتایج جستجو برای «${q}»`,
        description: `${toFa(results.length)} محصول مطابق جستجوی شما پیدا شد. می‌توانید نتایج را فیلتر یا مرتب کنید.`,
        crumbs: [{ label: `جستجو: ${q}` }],
        products: results,
        initialSort: (sort as SortKey) || "popular",
        emptyDesc:
          "محصولی با این عبارت پیدا نشد. املای عبارت را بررسی کنید یا نام برند و دسته‌بندی را جستجو کنید — مثلاً «فینو»، «ریمل» یا «ضدآفتاب».",
      }}
    />
  );
}
