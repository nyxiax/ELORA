"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useWishlist, useAuth } from "@/lib/store";
import { getProduct } from "@/lib/data/products";
import { ProductImage } from "@/components/elora/product-card";
import { faPrice } from "@/lib/fa";
import { Breadcrumb } from "@/components/elora/breadcrumb";
import { EmptyState } from "@/components/elora/ui-bits";
import { useMounted } from "@/components/elora/use-mounted";
import { useCart } from "@/lib/store";
import { ShoppingBag, Trash2, Heart } from "lucide-react";
import { toast } from "sonner";

export default function WishlistPage() {
  const mounted = useMounted();
  const wishlist = useWishlist();
  const cart = useCart();
  const auth = useAuth();

  const items = wishlist.items
    .map((id) => getProduct(id)!)
    .filter(Boolean);

  if (mounted && !auth.user) {
    return (
      <div className="container-elora py-10">
        <Breadcrumb items={[{ label: "علاقه‌مندی‌ها" }]} />
        <EmptyState
          icon="wishlist"
          title="برای مشاهده‌ی علاقه‌مندی‌ها وارد شوید"
          description="برای افزودن محصول به علاقه‌مندی‌ها ابتدا وارد حساب کاربری خود شوید."
          action={
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] px-6 py-3 text-[0.85rem] font-bold text-white shadow-md shadow-rose-200"
            >
              ورود / ثبت‌نام
              <ChevronLeft size={16} />
            </Link>
          }
        />
      </div>
    );
  }

  if (mounted && items.length === 0) {
    return (
      <div className="container-elora py-10">
        <Breadcrumb items={[{ label: "علاقه‌مندی‌ها" }]} />
        <EmptyState
          icon="wishlist"
          title="هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید."
          description="روی آیکون قلب هر محصولی که دوست داشتید کلیک کنید تا اینجا ذخیره شود."
          action={
            <Link
              href="/category/all"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] px-6 py-3 text-[0.85rem] font-bold text-white shadow-md shadow-rose-200"
            >
              مرور محصولات
              <ChevronLeft size={16} />
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-elora py-6 lg:py-8">
      <Breadcrumb items={[{ label: "علاقه‌مندی‌ها" }]} />
      <h1 className="mb-2 text-xl font-black text-foreground sm:text-2xl">علاقه‌مندی‌های من</h1>
      <p className="mb-6 text-[0.78rem] text-muted-foreground">
        {items.length > 0 && `${items.length} محصول ذخیره شده`}
      </p>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {items.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 rounded-3xl border border-rose-100 bg-white p-3.5 shadow-sm sm:gap-5"
          >
            <Link
              href={`/product/${p.id}`}
              className="size-20 shrink-0 overflow-hidden rounded-2xl bg-blush sm:size-24"
            >
              <ProductImage src={p.images[0]} alt={p.name} className="size-full" />
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                href={`/product/${p.id}`}
                className="line-clamp-2 text-[0.83rem] font-bold text-foreground transition-colors hover:text-primary"
              >
                {p.name}
              </Link>
              <p className="mt-1.5 text-[0.85rem] font-black text-primary">{faPrice(p.price)}</p>
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  onClick={() => {
                    cart.add(p.id);
                    toast.success(`«${p.name}» به سبد خرید اضافه شد.`);
                  }}
                  className="flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-l from-primary to-[#c2476f] px-3.5 text-[0.72rem] font-bold text-white shadow-sm transition-all hover:shadow-md"
                >
                  <ShoppingBag size={14} />
                  افزودن به سبد
                </button>
                <button
                  onClick={() => {
                    wishlist.remove(p.id);
                    toast("از علاقه‌مندی‌ها حذف شد.");
                  }}
                  aria-label="حذف از علاقه‌مندی‌ها"
                  className="grid size-9 place-items-center rounded-xl text-rose-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
