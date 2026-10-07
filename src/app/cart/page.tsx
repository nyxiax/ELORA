"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ShoppingBag, Trash2, TicketPercent, ChevronLeft, BadgeCheck, MapPin, Truck,
} from "lucide-react";
import { useCart, useAddresses, useOrders, useAuth, useUI } from "@/lib/store";
import { getProduct } from "@/lib/data/products";
import { faPrice, faNumber, toFa } from "@/lib/fa";
import { ProductImage } from "@/components/elora/product-card";
import { QuantityStepper, EmptyState } from "@/components/elora/ui-bits";
import { Breadcrumb } from "@/components/elora/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { DISCOUNT_CODES } from "@/lib/data/misc";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useMounted } from "@/components/elora/use-mounted";

export default function CartPage() {
  const mounted = useMounted();
  const cart = useCart();
  const auth = useAuth();
  const ui = useUI();
  const [code, setCode] = useState("");
  const [appliedCode, setAppliedCode] = useState<{ code: string; percent: number } | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const items = cart.items
    .map((i) => ({ ...i, product: getProduct(i.productId)! }))
    .filter((i) => i.product);

  const subtotal = items.reduce((a, b) => a + b.product.price * b.qty, 0);
  const discount = appliedCode ? Math.round((subtotal * appliedCode.percent) / 100) : 0;
  const shipping = subtotal > 5000000 || subtotal === 0 ? 0 : 49000;
  const total = subtotal - discount + shipping;

  const applyCode = () => {
    const found = DISCOUNT_CODES.find(
      (d) => d.code.toLowerCase() === code.trim().toLowerCase()
    );
    if (!found) {
      toast.error("کد تخفیف معتبر نیست.");
      return;
    }
    setAppliedCode({ code: found.code, percent: found.percent });
    toast.success(`کد «${found.code}» اعمال شد؛ ${toFa(found.percent)}٪ تخفیف!`);
  };

  if (mounted && items.length === 0) {
    return (
      <div className="container-elora py-10">
        <Breadcrumb items={[{ label: "سبد خرید" }]} />
        <EmptyState
          icon="cart"
          title="سبد خرید شما خالی است"
          description="هنوز محصولی به سبد خرید اضافه نکرده‌اید. از میان هزاران محصول زیبایی، انتخاب‌تان را شروع کنید!"
          action={
            <Link
              href="/category/all"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] px-6 py-3 text-[0.85rem] font-bold text-white shadow-md shadow-rose-200"
            >
              شروع خرید
              <ChevronLeft size={16} />
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-elora py-6 lg:py-8">
      <Breadcrumb items={[{ label: "سبد خرید" }]} />
      <h1 className="mb-6 text-xl font-black text-foreground sm:text-2xl">سبد خرید</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        {/* items */}
        <div className="space-y-3">
          {items.map(({ product, qty }) => (
            <div
              key={product.id}
              className="flex items-center gap-4 rounded-3xl border border-rose-100 bg-white p-3.5 shadow-sm sm:gap-5 sm:p-4"
            >
              <Link
                href={`/product/${product.id}`}
                className="size-20 shrink-0 overflow-hidden rounded-2xl bg-blush sm:size-24"
              >
                <ProductImage src={product.images[0]} alt={product.name} className="size-full" />
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/product/${product.id}`}
                  className="line-clamp-2 text-[0.83rem] font-bold text-foreground transition-colors hover:text-primary sm:text-[0.88rem]"
                >
                  {product.name}
                </Link>
                <p className="mt-1 text-[0.72rem] text-muted-foreground">
                  {faPrice(product.price)} — واحد
                </p>
                <div className="mt-2.5 flex items-center gap-3">
                  <QuantityStepper
                    value={qty}
                    onChange={(v) => cart.setQty(product.id, v)}
                  />
                  <button
                    onClick={() => {
                      cart.remove(product.id);
                      toast("محصول از سبد خرید حذف شد.");
                    }}
                    aria-label="حذف از سبد"
                    className="grid size-9 place-items-center rounded-xl text-rose-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>

              <div className="shrink-0 text-left">
                <p className="text-[0.9rem] font-black text-foreground sm:text-[0.95rem]">
                  {faPrice(product.price * qty)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* summary */}
        <aside className="h-fit space-y-4 lg:sticky lg:top-36">
          {/* discount code */}
          <div className="rounded-3xl border border-rose-100 bg-white p-5 shadow-sm">
            <h3 className="flex items-center gap-2 text-[0.85rem] font-black text-foreground">
              <TicketPercent size={16} className="text-primary" />
              کد تخفیف
            </h3>
            <div className="mt-3 flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="مثلاً ELORA20"
                dir="ltr"
                className="h-10 w-full rounded-xl border border-rose-100 bg-rose-50/50 px-3 text-left text-[0.78rem] outline-none focus:border-rose-300 focus:bg-white"
              />
              <Button
                onClick={applyCode}
                className="h-10 shrink-0 rounded-xl bg-plum px-4 text-[0.75rem] font-bold hover:bg-plum/90"
              >
                اعمال
              </Button>
            </div>
            <p className="mt-2 text-[0.68rem] text-muted-foreground">
              کدهای فعال خود را در بخش کد تخفیف پنل کاربری ببینید.
            </p>
          </div>

          {/* totals */}
          <div className="rounded-3xl border border-rose-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-[0.85rem] font-black text-foreground">خلاصه سفارش</h3>
            <dl className="space-y-3 text-[0.8rem]">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">مبلغ کل ({toFa(items.reduce((a, b) => a + b.qty, 0))} کالا)</dt>
                <dd className="font-semibold">{faNumber(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <dt>تخفیف ({toFa(appliedCode!.percent)}٪)</dt>
                  <dd className="font-semibold">− {faNumber(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">هزینه ارسال</dt>
                <dd className={cn("font-semibold", shipping === 0 && "text-emerald-600")}>
                  {shipping === 0 ? "رایگان" : faNumber(shipping)}
                </dd>
              </div>
              <div className="border-t border-dashed border-rose-200 pt-3">
                <div className="flex justify-between text-[0.92rem]">
                  <dt className="font-bold text-foreground">مبلغ قابل پرداخت</dt>
                  <dd className="font-black text-primary">{faPrice(total)}</dd>
                </div>
              </div>
            </dl>

            <Button
              onClick={() => setCheckoutOpen(true)}
              className="mt-5 h-12 w-full rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] text-[0.88rem] font-bold shadow-md shadow-rose-200 hover:shadow-lg"
            >
              ادامه فرایند خرید
              <ChevronLeft size={17} />
            </Button>
            {shipping > 0 && (
              <p className="mt-3 text-center text-[0.68rem] text-muted-foreground">
                برای ارسال رایگان، {faPrice(5000000)} دیگر خرید کنید.
              </p>
            )}
          </div>
        </aside>
      </div>

      <CheckoutDialog
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        total={total}
        itemCount={items.reduce((a, b) => a + b.qty, 0)}
        onDone={(orderId) => {
          cart.clear();
          setAppliedCode(null);
        }}
        items={cart.items.map((i) => ({ productId: i.productId, qty: i.qty }))}
      />
    </div>
  );
}

function CheckoutDialog({
  open, onClose, total, itemCount, onDone, items,
}: {
  open: boolean;
  onClose: () => void;
  total: number;
  itemCount: number;
  onDone: (orderId: string) => void;
  items: { productId: string; qty: number }[];
}) {
  const addresses = useAddresses();
  const orders = useOrders();
  const auth = useAuth();
  const ui = useUI();
  const [selected, setSelected] = useState<string | null>(null);
  const [placed, setPlaced] = useState<string | null>(null);

  const placeOrder = () => {
    if (!selected && addresses.addresses.length > 0) {
      toast.error("لطفاً یک آدرس انتخاب کنید.");
      return;
    }
    const order = orders.place(items, total);
    setPlaced(order.id);
    onDone(order.id);
    toast.success("سفارش شما با موفقیت ثبت شد!");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { onClose(); setPlaced(null); } }}>
      <DialogContent className="max-w-md rounded-3xl border-rose-100" dir="rtl">
        {placed ? (
          <div className="py-6 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-500">
              <BadgeCheck size={32} />
            </span>
            <DialogHeader className="mt-4 items-center text-center">
              <DialogTitle className="text-[0.95rem] font-black">سفارش ثبت شد!</DialogTitle>
              <DialogDescription className="pt-2 text-[0.8rem] leading-7">
                شماره سفارش شما: <span className="font-black text-foreground" dir="ltr">{placed}</span>
                <br />
                این یک نسخه‌ی نمایشی است؛ می‌توانید سفارش را در پنل کاربری ببینید.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-5 flex gap-2.5">
              <Link
                href="/account?section=orders"
                onClick={() => { onClose(); setPlaced(null); }}
                className="flex h-11 flex-1 items-center justify-center rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] text-[0.82rem] font-bold text-white"
              >
                مشاهده سفارش‌ها
              </Link>
              <Button
                variant="outline"
                onClick={() => { onClose(); setPlaced(null); }}
                className="h-11 flex-1 rounded-2xl border-rose-200 text-[0.82rem] font-bold"
              >
                بازگشت
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="text-right">
              <DialogTitle className="flex items-center gap-2 text-[0.95rem] font-black">
                <Truck size={18} className="text-primary" />
                تکمیل خرید
              </DialogTitle>
              <DialogDescription className="pt-1 text-[0.75rem]">
                {toFa(itemCount)} کالا — پرداخت {faPrice(total)} (پرداخت شبیه‌سازی‌شده است)
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <div className="flex items-center gap-2 rounded-2xl bg-rose-50/60 p-3 text-[0.75rem] text-secondary-foreground">
                <MapPin size={15} className="shrink-0 text-primary" />
                آدرس تحویل را انتخاب کنید:
              </div>

              {addresses.addresses.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-rose-200 p-4 text-center text-[0.75rem] text-muted-foreground">
                  هنوز آدرسی ثبت نکرده‌اید. می‌توانید از پنل کاربری → آدرس‌ها اضافه کنید یا برای نمایش، همین‌جا ادامه دهید.
                </p>
              ) : (
                <div className="elora-scroll max-h-40 space-y-2 overflow-y-auto">
                  {addresses.addresses.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setSelected(a.id)}
                      className={cn(
                        "w-full rounded-2xl border p-3 text-right text-[0.75rem] transition-all",
                        selected === a.id
                          ? "border-primary bg-rose-50/70 shadow-sm"
                          : "border-rose-100 hover:border-rose-200"
                      )}
                    >
                      <span className="font-bold text-foreground">{a.receiver}</span>
                      <span className="block text-muted-foreground">
                        {a.province}، {a.city} — {a.full}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {!auth.user && (
                <button
                  onClick={() => {
                    onClose();
                    ui.openLoginModal();
                  }}
                  className="w-full rounded-2xl bg-amber-50 p-3 text-[0.72rem] font-semibold text-amber-700 transition-colors hover:bg-amber-100"
                >
                  برای ثبت سفارش، وارد حساب کاربری شوید (ورود نمایشی: ۰۹۱۲۳۴۵۶۷۸۹ / رمز ۱۲۳۴۵۶)
                </button>
              )}

              <Button
                onClick={placeOrder}
                disabled={!auth.user}
                className="h-12 w-full rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] text-[0.88rem] font-bold shadow-md shadow-rose-200 disabled:opacity-50"
              >
                ثبت سفارش و پرداخت
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
