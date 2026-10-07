import type { Metadata } from "next";
import { findSub, findTopCategory, CATEGORIES } from "@/lib/data/categories";
import { PRODUCTS, getProductsByCategory, getProductsBySub } from "@/lib/data/products";
import { ListingView, productsForSubSlug, sortProducts, SortKey } from "@/components/elora/listing-view";

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sort?: string; tag?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return { title: `محصولات ${decodeURIComponent(category)}` };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const sp = await searchParams;

  // "all" → all products
  if (category === "all") {
    return (
      <ListingView
        config={{
          title: "همه محصولات اِلورا",
          description:
            "تازه‌ترین محصولات آرایشی، مراقبتی، عطری و لوازم برقی اِلورا؛ هر آنچه برای روتین زیبایی‌تان لازم دارید.",
          crumbs: [{ label: "همه محصولات" }],
          products: PRODUCTS,
          initialSort: (sp.sort as SortKey) || "popular",
        }}
        tagParam={sp.tag}
      />
    );
  }

  const sub = findSub(category);
  if (sub) {
    const direct = getProductsBySub(category);
    const products = direct.length ? direct : productsForSubSlug(category);
    return (
      <ListingView
        config={{
          title: sub.sub.name,
          description: `بهترین محصولات «${sub.sub.name}» از برندهای معتبر جهان؛ مناسب برای ${sub.cat.name}.`,
          crumbs: [
            { label: sub.cat.name, href: `/category/${sub.cat.slug}` },
            { label: sub.sub.name },
          ],
          products,
        }}
      />
    );
  }

  const top = findTopCategory(category);
  if (top) {
    return (
      <ListingView
        config={{
          title: top.name,
          description: `دنیای ${top.name} در اِلورا — محصولات اورجینال با ضمانت اصالت.`,
          crumbs: [{ label: top.name }],
          products: getProductsByCategory(category),
        }}
      />
    );
  }

  // skin types (پوست چرب ...)
  const skinCat = CATEGORIES[1].groups[0].subs.find((s) => s.slug === category);
  if (skinCat) {
    const skinName = skinCat.name.replace("محصولات مخصوص ", "").replace("پوست ", "");
    return (
      <ListingView
        config={{
          title: skinCat.name,
          description: `محصولات مخصوص ${skinCat.name}؛ فرمول‌های آزموده‌شده برای مراقبت بی‌دغدغه.`,
          crumbs: [
            { label: "بهداشتی و مراقبت", href: "/category/care" },
            { label: skinCat.name },
          ],
          products: sortProducts(
            PRODUCTS.filter((p) => p.skinTypes?.includes(skinName)),
            "popular"
          ),
        }}
      />
    );
  }

  return (
    <ListingView
      config={{
        title: "دسته‌بندی یافت نشد",
        crumbs: [{ label: "همه محصولات" }],
        products: PRODUCTS,
        emptyDesc: "این دسته‌بندی در حال حاضر موجود نیست.",
      }}
    />
  );
}
