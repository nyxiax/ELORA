"use client";

import { cn } from "@/lib/utils";
import { faPrice, faNumber, discountPercent, toFa } from "@/lib/fa";
import { Product } from "@/lib/types";
import { brandNameFa } from "@/lib/data/products";
import { useCart, useUI, useAuth, useWishlist } from "@/lib/store";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { StarRating } from "./star-rating";
import { useMounted } from "./use-mounted";

/** Product image with elegant fallback */
export function ProductImage({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        className={cn(
          "grid place-items-center bg-gradient-to-bl from-rose-soft via-blush to-lilac-soft",
          className
        )}
        aria-label={alt}
      >
        <SparkleFallback />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={cn("object-cover", className)}
    />
  );
}

function SparkleFallback() {
  return (
    <svg viewBox="0 0 24 24" className="size-10 text-rose-300/70" fill="currentColor">
      <path d="M12 2l2.1 5.9L20 10l-5.9 2.1L12 18l-2.1-5.9L4 10l5.9-2.1L12 2z" />
    </svg>
  );
}

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const mounted = useMounted();
  const cart = useCart();
  const wishlist = useWishlist();
  const auth = useAuth();
  const ui = useUI();
  const [added, setAdded] = useState(false);
  const off = discountPercent(product.price, product.oldPrice);
  const liked = mounted && auth.user ? wishlist.items.includes(product.id) : false;

  const handleAddToCart = () => {
    cart.add(product.id);
    setAdded(true);
    toast.success(`«${product.name}» به سبد خرید اضافه شد.`, {
      icon: <ShoppingBag className="size-4 text-primary" />,
    });
    setTimeout(() => setAdded(false), 1600);
  };

  const handleWishlist = () => {
    const res = wishlist.toggle(product.id, Boolean(auth.user));
    if (res === "auth") {
      ui.openLoginModal();
      return;
    }
    if (res === "added") {
      toast.success(`«${product.name}» به علاقه‌مندی‌ها اضافه شد.`, {
        icon: <Heart className="size-4 fill-rose-500 text-rose-500" />,
      });
    } else {
      toast("از علاقه‌مندی‌ها حذف شد.");
    }
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border border-rose-100/80 bg-card p-3 transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-[0_18px_40px_-18px_rgba(212,83,126,0.35)]",
        className
      )}
    >
      {/* badges */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 items-start">
        {off > 0 && (
          <span className="rounded-full bg-primary px-2 py-0.5 text-[0.68rem] font-bold text-white shadow-sm">
            {toFa(off)}٪ تخفیف
          </span>
        )}
        {product.tags?.includes("new") && (
          <span className="rounded-full bg-lilac px-2 py-0.5 text-[0.68rem] font-bold text-white shadow-sm">
            جدید
          </span>
        )}
      </div>

      {/* wishlist */}
      <button
        onClick={handleWishlist}
        aria-label="افزودن به علاقه‌مندی‌ها"
        className={cn(
          "absolute top-3 left-3 z-10 grid size-9 place-items-center rounded-full bg-white/85 backdrop-blur border border-rose-100 shadow-sm transition-all hover:scale-110 active:scale-95",
          liked && "bg-rose-50"
        )}
      >
        <Heart
          size={17}
          className={cn(
            "text-rose-300 transition-colors",
            liked && "fill-rose-500 text-rose-500"
          )}
        />
      </button>

      {/* image */}
      <Link
        href={`/product/${product.id}`}
        className="relative block aspect-square overflow-hidden rounded-xl bg-blush"
      >
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          className="size-full transition-transform duration-500 group-hover:scale-105"
        />
        {product.images[1] && (
          <ProductImage
            src={product.images[1]}
            alt={product.name}
            className="absolute inset-0 size-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </Link>

      {/* info */}
      <div className="flex flex-1 flex-col gap-1.5 pt-3 px-1">
        <span className="text-[0.7rem] font-medium text-lilac">
          {brandNameFa(product.brandSlug)}
        </span>
        <Link
          href={`/product/${product.id}`}
          className="line-clamp-2 min-h-[2.6rem] text-[0.83rem] font-semibold leading-6 text-foreground transition-colors hover:text-primary"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-1.5 text-[0.68rem] text-muted-foreground">
          <StarRating rating={product.rating} size={11} />
          <span>({toFa(product.reviewCount)})</span>
        </div>
        <div className="mt-auto pt-2 flex items-end justify-between gap-2">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-[0.7rem] text-muted-foreground line-through decoration-rose-300">
                {faNumber(product.oldPrice)}
              </span>
            )}
            <span className="text-[0.95rem] font-black text-foreground">
              {faPrice(product.price)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            aria-label="افزودن به سبد خرید"
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-[#c2476f] text-white shadow-md shadow-rose-200 transition-all hover:shadow-lg hover:shadow-rose-300 active:scale-90",
              added && "from-emerald-500 to-emerald-600 shadow-emerald-200"
            )}
          >
            {added ? <Check size={18} /> : <ShoppingBag size={17} />}
          </button>
        </div>
      </div>
    </div>
  );
}
