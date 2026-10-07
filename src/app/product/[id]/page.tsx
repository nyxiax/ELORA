import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getRelated, brandNameFa, PRODUCTS } from "@/lib/data/products";
import { ProductDetail } from "@/components/elora/product-detail";
import { findSub } from "@/lib/data/categories";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = getProduct(id);
  return { title: p?.name || "محصول" };
}

export function generateStaticParams() {
  return PRODUCTS.slice(0, 1).map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const sub = findSub(product.subSlug);
  const related = getRelated(product, 8);

  return (
    <ProductDetail
      product={product}
      categoryName={sub ? sub.cat.name : product.category}
      categoryHref={sub ? `/category/${sub.cat.slug}` : "/category/all"}
      subName={sub ? sub.sub.name : product.sub}
      subHref={`/category/${product.subSlug}`}
      brandName={brandNameFa(product.brandSlug)}
      brandHref={`/brand/${product.brandSlug}`}
      related={related}
    />
  );
}
