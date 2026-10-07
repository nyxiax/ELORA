"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Heart, ShoppingBag, Check, ShieldCheck, Truck, RotateCcw,
  Star, ChevronLeft, Send,
} from "lucide-react";
import { Product, Review } from "@/lib/types";
import { discountPercent, faPrice, toFa, faDateLong } from "@/lib/fa";
import { seedReviewsFor } from "@/lib/data/reviews";
import { useCart, useComments, useUI, useAuth, useWishlist } from "@/lib/store";
import { ProductImage } from "./product-card";
import { ProductCarousel } from "./product-carousel";
import { QuantityStepper, EmptyState } from "./ui-bits";
import { StarRating } from "./star-rating";
import { Breadcrumb } from "./breadcrumb";
import { SectionTitle } from "./section-title";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useMounted } from "./use-mounted";

interface Props {
  product: Product;
  categoryName: string;
  categoryHref: string;
  subName: string;
  subHref: string;
  brandName: string;
  brandHref: string;
  related: Product[];
}

export function ProductDetail(props: Props) {
  const { product } = props;
  const off = discountPercent(product.price, product.oldPrice);

  return (
    <div className="container-elora py-6 lg:py-8">
      <Breadcrumb
        items={[
          { label: props.categoryName, href: props.categoryHref },
          { label: props.subName, href: props.subHref },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[420px_1fr] xl:grid-cols-[480px_1fr]">
        <Gallery images={product.images} name={product.name} off={off} />
        <Info {...props} off={off} />
      </div>

      {/* tabs section */}
      <ProductTabs product={product} />

      {/* related */}
      <section className="mt-14">
        <SectionTitle title="محصولات مشابه" subtitle="بر اساس دسته‌بندی و برند محصول فعلی" />
        <ProductCarousel products={props.related} />
      </section>
    </div>
  );
}

/* ─── Gallery ─── */
function Gallery({ images, name, off }: { images: string[]; name: string; off: number }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl border border-rose-100 bg-white p-3 shadow-sm">
        {off > 0 && (
          <span className="absolute right-6 top-6 z-10 rounded-full bg-primary px-3 py-1 text-[0.75rem] font-bold text-white shadow">
            {toFa(off)}٪ تخفیف
          </span>
        )}
        <div className="aspect-square overflow-hidden rounded-2xl bg-blush">
          <ProductImage src={images[active]} alt={name} className="size-full" />
        </div>
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`تصویر ${toFa(i + 1)}`}
              className={cn(
                "size-[74px] shrink-0 overflow-hidden rounded-2xl border-2 bg-white transition-all",
                i === active ? "border-primary shadow-md" : "border-rose-100 hover:border-rose-200"
              )}
            >
              <ProductImage src={img} alt={`${name} ${i + 1}`} className="size-full" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Info ─── */
function Info({ product, brandName, brandHref, off }: Props & { off: number }) {
  const cart = useCart();
  const ui = useUI();
  const auth = useAuth();
  const wishlist = useWishlist();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const mounted = useMounted();
  const liked = mounted && auth.user ? wishlist.items.includes(product.id) : false;

  const addToCart = () => {
    cart.add(product.id, qty);
    setAdded(true);
    toast.success(`${toFa(qty)} عدد «${product.name}» به سبد اضافه شد.`);
    setTimeout(() => setAdded(false), 1800);
  };

  const toggleWish = () => {
    const res = wishlist.toggle(product.id, Boolean(auth.user));
    if (res === "auth") return ui.openLoginModal();
    toast.success(
      res === "added" ? "به علاقه‌مندی‌ها اضافه شد." : "از علاقه‌مندی‌ها حذف شد."
    );
  };

  return (
    <div className="flex flex-col">
      <Link href={brandHref} className="w-fit text-[0.8rem] font-bold text-lilac transition-colors hover:text-primary">
        برند {brandName}
      </Link>
      <h1 className="mt-2 text-xl font-black leading-9 text-foreground sm:text-2xl">
        {product.name}
      </h1>

      <div className="mt-3 flex items-center gap-3">
        <StarRating rating={product.rating} size={16} />
        <span className="text-[0.8rem] font-bold text-foreground">{toFa(product.rating.toFixed(1))}</span>
        <span className="text-[0.75rem] text-muted-foreground">
          ({toFa(product.reviewCount)} نظر)
        </span>
      </div>

      <p className="mt-4 text-[0.85rem] leading-7 text-secondary-foreground">{product.short}</p>

      {/* price box */}
      <div className="mt-5 rounded-3xl border border-rose-100 bg-gradient-to-l from-blush/70 to-white p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            {product.oldPrice && (
              <div className="flex items-center gap-2">
                <span className="text-[0.85rem] text-muted-foreground line-through decoration-rose-400">
                  {faPrice(product.oldPrice)}
                </span>
                {off > 0 && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[0.68rem] font-bold text-white">
                    {toFa(off)}٪
                  </span>
                )}
              </div>
            )}
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-foreground">{faPrice(product.price)}</span>
            </div>
            {product.oldPrice && (
              <p className="mt-1 text-[0.72rem] text-emerald-600">
                سود شما از این خرید: {faPrice(product.oldPrice - product.price)}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <QuantityStepper value={qty} onChange={setQty} />
          <button
            onClick={addToCart}
            className={cn(
              "flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl text-[0.85rem] font-bold text-white shadow-md shadow-rose-200 transition-all hover:shadow-lg active:scale-[0.98] min-w-[180px]",
              added
                ? "bg-gradient-to-l from-emerald-500 to-emerald-600"
                : "bg-gradient-to-l from-primary to-[#c2476f]"
            )}
          >
            {added ? <Check size={18} /> : <ShoppingBag size={18} />}
            {added ? "به سبد اضافه شد" : "افزودن به سبد خرید"}
          </button>
          <button
            onClick={toggleWish}
            aria-label="افزودن به علاقه‌مندی‌ها"
            className={cn(
              "grid size-11 place-items-center rounded-2xl border border-rose-200 bg-white text-rose-400 transition-all hover:bg-rose-50",
              liked && "border-rose-300 bg-rose-50"
            )}
          >
            <Heart size={19} className={cn(liked && "fill-rose-500 text-rose-500")} />
          </button>
        </div>
      </div>

      {/* trust row */}
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Perk icon={<ShieldCheck size={16} />} label="ضمانت اصالت" />
        <Perk icon={<Truck size={16} />} label="ارسال سریع" />
        <Perk icon={<RotateCcw size={16} />} label="۷ روز مرجوعی" />
      </div>
    </div>
  );
}

function Perk({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-rose-100 bg-white px-3 py-2.5 text-[0.74rem] font-semibold text-secondary-foreground">
      <span className="text-primary">{icon}</span>
      {label}
    </div>
  );
}

/* ─── Tabs: specs, description, how to use, reviews ─── */
function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<"specs" | "desc" | "howto" | "reviews">("specs");
  const TABS = [
    { key: "specs", label: "مشخصات محصول" },
    { key: "desc", label: "توضیحات محصول" },
    { key: "howto", label: "نحوه استفاده" },
    { key: "reviews", label: `نظرات کاربران (${toFa(product.reviewCount)})` },
  ] as const;

  return (
    <section className="mt-12">
      <div className="flex gap-2 overflow-x-auto border-b border-rose-100 pb-px no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "shrink-0 rounded-t-2xl px-4 py-3 text-[0.8rem] font-bold transition-all",
              tab === t.key
                ? "bg-gradient-to-b from-rose-50 to-white text-primary shadow-[0_-4px_12px_-6px_rgba(212,83,126,0.4)] ring-1 ring-rose-100"
                : "text-secondary-foreground hover:text-primary"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-b-3xl rounded-tl-3xl border border-rose-100 bg-white p-6 sm:p-8">
        {tab === "specs" && (
          <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {product.specs.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between gap-4 border-b border-dashed border-rose-100 py-3.5 text-[0.82rem]"
              >
                <dt className="text-muted-foreground">{s.label}</dt>
                <dd className="font-semibold text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {tab === "desc" && (
          <div className="space-y-4">
            {product.description.map((d, i) => (
              <p key={i} className="text-[0.85rem] leading-8 text-secondary-foreground">
                {d}
              </p>
            ))}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-4">
                <p className="text-[0.8rem] font-black text-foreground">ترکیبات کلیدی</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="rounded-full bg-white px-3 py-1.5 text-[0.72rem] font-bold text-secondary-foreground ring-1 ring-rose-100"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "howto" && (
          <ol className="space-y-4">
            {product.howToUse.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-lilac text-[0.75rem] font-bold text-white">
                  {toFa(i + 1)}
                </span>
                <p className="pt-1 text-[0.85rem] leading-7 text-secondary-foreground">{step}</p>
              </li>
            ))}
          </ol>
        )}

        {tab === "reviews" && <ReviewsSection product={product} />}
      </div>
    </section>
  );
}

/* ─── Reviews ─── */
function ReviewsSection({ product }: { product: Product }) {
  const comments = useComments();
  const auth = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);

  const all: Review[] = useMemo(() => {
    const local = comments.comments.filter((c) => c.productId === product.id);
    return [...local, ...seedReviewsFor(product.id)];
  }, [comments.comments, product.id]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-black text-foreground">{toFa(product.rating.toFixed(1))}</span>
          <div>
            <StarRating rating={product.rating} size={15} />
            <p className="mt-1 text-[0.72rem] text-muted-foreground">
              از مجموع {toFa(product.reviewCount)} نظر ثبت‌شده
            </p>
          </div>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="h-10 rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] px-5 text-[0.8rem] font-bold shadow-md shadow-rose-200"
        >
          <Send size={15} className="ml-1.5" />
          ثبت نظر
        </Button>
      </div>

      {all.length === 0 ? (
        <EmptyState
          title="هنوز نظری ثبت نشده"
          description="اولین نفری باشید که نظر خود را درباره‌ی این محصول به اشتراک می‌گذارد."
        />
      ) : (
        <ul className="space-y-4">
          {all.map((r) => (
            <li key={r.id} className="rounded-2xl border border-rose-100 bg-rose-50/30 p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-rose-soft to-lilac-soft text-[0.85rem] font-black text-primary">
                  {r.user.charAt(0)}
                </span>
                <div className="flex-1">
                  <p className="text-[0.83rem] font-bold text-foreground">{r.user}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <StarRating rating={r.rating} size={12} />
                    <span className="text-[0.68rem] text-muted-foreground">
                      {faDateLong(r.date)}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[0.83rem] leading-7 text-secondary-foreground">{r.text}</p>
            </li>
          ))}
        </ul>
      )}

      <CommentDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        productId={product.id}
        defaultName={auth.user?.name}
      />
    </div>
  );
}

function CommentDialog({
  open, onClose, productId, defaultName,
}: {
  open: boolean; onClose: () => void; productId: string; defaultName?: string;
}) {
  const comments = useComments();
  const [name, setName] = useState(defaultName || "");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [hover, setHover] = useState(0);
  const [error, setError] = useState("");

  const submit = () => {
    if (!name.trim() || name.trim().length < 2) {
      setError("لطفاً نام خود را وارد کنید.");
      return;
    }
    if (text.trim().length < 10) {
      setError("متن نظر باید حداقل ۱۰ کاراکتر باشد.");
      return;
    }
    comments.add({ productId, user: name.trim(), rating, text: text.trim() });
    toast.success("نظر شما با موفقیت ثبت شد. سپاس از همراهی شما!");
    setText("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : onClose())}>
      <DialogContent className="max-w-md rounded-3xl border-rose-100" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="text-[0.95rem] font-black">ثبت نظر</DialogTitle>
          <DialogDescription className="pt-1 text-[0.75rem]">
            نظر شما پس از ثبت بلافاصله در همین صفحه نمایش داده می‌شود.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[0.78rem] font-bold text-foreground">نام</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام شما"
              className="h-11 rounded-xl border-rose-100 bg-rose-50/50 focus-visible:ring-rose-200"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[0.78rem] font-bold text-foreground">امتیاز</label>
            <div className="flex items-center gap-1.5" dir="ltr">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(i)}
                  aria-label={`${i} ستاره`}
                >
                  <Star
                    size={26}
                    className={cn(
                      "transition-colors",
                      i <= (hover || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-rose-100 text-rose-200"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[0.78rem] font-bold text-foreground">نظر شما</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="تجربه‌ی خود از این محصول را بنویسید…"
              rows={4}
              className="rounded-xl border-rose-100 bg-rose-50/50 focus-visible:ring-rose-200"
            />
          </div>

          {error && <p className="text-[0.74rem] font-bold text-rose-500">{error}</p>}

          <div className="flex gap-2.5">
            <Button
              onClick={submit}
              className="h-11 flex-1 rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] text-[0.82rem] font-bold"
            >
              ارسال نظر
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="h-11 rounded-2xl border-rose-200 text-[0.82rem] font-bold text-secondary-foreground"
            >
              انصراف
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
