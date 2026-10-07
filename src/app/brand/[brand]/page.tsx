import type { Metadata } from "next";
import { findBrand } from "@/lib/data/brands";
import { getProductsByBrand } from "@/lib/data/products";
import { ListingView, SortKey } from "@/components/elora/listing-view";

interface Props {
  params: Promise<{ brand: string }>;
  searchParams: Promise<{ sort?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  const b = findBrand(brand);
  return { title: b ? `محصولات ${b.name}` : "برند" };
}

export default async function BrandPage({ params, searchParams }: Props) {
  const { brand } = await params;
  const sp = await searchParams;
  const b = findBrand(brand);
  const products = getProductsByBrand(brand);

  return (
    <ListingView
      config={{
        title: b ? `محصولات برند ${b.name}` : "برند موردنظر",
        description: b?.tagline
          ? `${b.name} — ${b.tagline}${b.country ? ` • کشور: ${b.country}` : ""}`
          : "محصولات این برند در اِلورا.",
        crumbs: [{ label: b?.name || "برند" }],
        products,
        initialSort: (sp.sort as SortKey) || "popular",
        emptyDesc:
          "از این برند در حال حاضر محصولی نداریم؛ اما برندهای دیگری را ببینید که عاشقشان می‌شوید!",
      }}
    />
  );
}
