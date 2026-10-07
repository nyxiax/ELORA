"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  UserRound, PackageOpen, TicketPercent, Headset, Heart,
  MapPin, LogOut, ChevronLeft, Copy, Trash2, Pencil, Plus,
  MessageSquarePlus, Phone, HelpCircle,
} from "lucide-react";
import { useAuth, useWishlist, useAddresses, useTickets, useOrders, allOrders } from "@/lib/store";
import { Breadcrumb } from "@/components/elora/breadcrumb";
import { EmptyState } from "@/components/elora/ui-bits";
import { ProductImage } from "@/components/elora/product-card";
import { useMounted } from "@/components/elora/use-mounted";
import { getProduct } from "@/lib/data/products";
import { faPrice, toFa, faDateLong, isValidIranPhone, normalizePhone, isValidNationalCode } from "@/lib/fa";
import { DISCOUNT_CODES, FAQS, PROVINCES, SUPPORT_PHONE, SUPPORT_PHONE_FA } from "@/lib/data/misc";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { OrderStatusBadge } from "@/components/elora/account-bits";

const SECTIONS = [
  { key: "profile", label: "پروفایل کاربری", icon: UserRound },
  { key: "orders", label: "سفارشات", icon: PackageOpen },
  { key: "discounts", label: "کد تخفیف", icon: TicketPercent },
  { key: "support", label: "درخواست پشتیبانی", icon: Headset },
  { key: "wishlist", label: "علاقه‌مندی‌ها", icon: Heart },
  { key: "addresses", label: "آدرس‌ها", icon: MapPin },
  { key: "logout", label: "خروج از حساب", icon: LogOut },
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

export function AccountDashboard() {
  const mounted = useMounted();
  const router = useRouter();
  const sp = useSearchParams();
  const auth = useAuth();
  const section = (sp.get("section") as SectionKey) || "profile";

  useEffect(() => {
    if (mounted && !auth.user) {
      if (sessionStorage.getItem("elora-just-logged-out")) return;
      router.replace("/login");
    }
  }, [mounted, auth.user, router]);

  if (!mounted || !auth.user) {
    return (
      <div className="container-elora flex flex-1 items-center justify-center py-24">
        <div className="size-10 animate-spin rounded-full border-4 border-rose-100 border-t-primary" />
      </div>
    );
  }

  const logout = () => {
    auth.logout();
    toast.success("با موفقیت از حساب خود خارج شدید.");
    router.push("/");
    setTimeout(() => sessionStorage.removeItem("elora-just-logged-out"), 800);
  };

  return (
    <div className="container-elora py-6 lg:py-8">
      <Breadcrumb items={[{ label: "حساب کاربری" }]} />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-gradient-to-l from-blush via-white to-lilac-soft/60 p-5 ring-1 ring-rose-100 sm:p-7">
        <div className="flex items-center gap-4">
          <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-lilac text-xl font-black text-white shadow-md">
            {auth.user.name.charAt(0)}
          </span>
          <div>
            <h1 className="text-lg font-black text-foreground">{auth.user.name}</h1>
            <p className="mt-0.5 text-[0.75rem] text-muted-foreground" dir="ltr">
              {toFa(auth.user.phone)}
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[0.76rem] font-bold text-primary transition-colors hover:text-[#b03a63]"
        >
          بازگشت به فروشگاه
          <ChevronLeft size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_1fr]">
        {/* sidebar */}
        <aside className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
          <div className="hidden rounded-3xl border border-rose-100 bg-white p-3 shadow-sm lg:block">
            <ul className="space-y-1">
              {SECTIONS.map((s) => (
                <li key={s.key}>
                  {s.key === "logout" ? (
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-[0.82rem] font-semibold text-rose-500 transition-colors hover:bg-rose-50"
                    >
                      <s.icon size={17} />
                      {s.label}
                    </button>
                  ) : (
                    <button
                      onClick={() => router.replace(`/account?section=${s.key}`)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-[0.82rem] font-semibold transition-colors",
                        section === s.key
                          ? "bg-gradient-to-l from-rose-soft to-rose-50 text-primary ring-1 ring-rose-200"
                          : "text-secondary-foreground hover:bg-rose-50/70 hover:text-primary"
                      )}
                    >
                      <s.icon size={17} />
                      {s.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* mobile chips */}
          <div className="flex gap-2 lg:hidden">
            {SECTIONS.map((s) =>
              s.key === "logout" ? (
                <button
                  key={s.key}
                  onClick={logout}
                  className="flex shrink-0 items-center gap-1.5 rounded-full border border-rose-200 bg-white px-4 py-2.5 text-[0.74rem] font-bold text-rose-500"
                >
                  <s.icon size={14} />
                  {s.label}
                </button>
              ) : (
                <button
                  key={s.key}
                  onClick={() => router.replace(`/account?section=${s.key}`)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-[0.74rem] font-bold transition-all",
                    section === s.key
                      ? "bg-primary text-white shadow-sm"
                      : "border border-rose-100 bg-white text-secondary-foreground"
                  )}
                >
                  <s.icon size={14} />
                  {s.label}
                </button>
              )
            )}
          </div>
        </aside>

        {/* content */}
        <div className="min-w-0">
          {section === "profile" && <ProfileSection />}
          {section === "orders" && <OrdersSection />}
          {section === "discounts" && <DiscountsSection />}
          {section === "support" && <SupportSection />}
          {section === "wishlist" && <WishlistSection />}
          {section === "addresses" && <AddressesSection />}
        </div>
      </div>
    </div>
  );
}

/* ─── Profile ─── */
function ProfileSection() {
  const auth = useAuth();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", birthday: "", nationalCode: "" });

  const startEdit = () => {
    if (!auth.user) return;
    setForm({
      name: auth.user.name,
      phone: auth.user.phone,
      birthday: auth.user.birthday || "",
      nationalCode: auth.user.nationalCode || "",
    });
    setEdit(true);
  };

  const save = () => {
    if (form.name.trim().length < 3) return toast.error("نام و نام خانوادگی را کامل وارد کنید.");
    const p = normalizePhone(form.phone);
    if (!isValidIranPhone(p)) return toast.error("شماره تماس معتبر نیست.");
    if (form.nationalCode && !isValidNationalCode(form.nationalCode))
      return toast.error("کد ملی معتبر نیست.");
    auth.updateProfile({
      name: form.name.trim(),
      phone: p,
      birthday: form.birthday,
      nationalCode: form.nationalCode,
    });
    setEdit(false);
    toast.success("تغییرات با موفقیت ذخیره شد.");
  };

  const u = auth.user!;
  const rows = [
    { label: "نام و نام خانوادگی", value: u.name },
    { label: "شماره موبایل", value: toFa(u.phone) },
    { label: "تاریخ تولد", value: u.birthday ? toFa(u.birthday) : "ثبت نشده" },
    { label: "کد ملی", value: u.nationalCode ? toFa(u.nationalCode) : "ثبت نشده" },
  ];

  return (
    <SectionCard title="پروفایل کاربری">
      {!edit ? (
        <>
          <dl className="divide-y divide-dashed divide-rose-100">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between gap-4 py-4">
                <dt className="text-[0.8rem] text-muted-foreground">{r.label}</dt>
                <dd className="text-[0.85rem] font-bold text-foreground">{r.value}</dd>
              </div>
            ))}
          </dl>
          <Button
            onClick={startEdit}
            className="mt-6 h-11 rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] px-6 text-[0.82rem] font-bold shadow-md shadow-rose-200"
          >
            <Pencil size={15} className="ml-1" />
            ویرایش اطلاعات
          </Button>
        </>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="نام و نام خانوادگی" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="شماره موبایل" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} ltr />
          <Field label="تاریخ تولد" value={form.birthday} onChange={(v) => setForm({ ...form, birthday: v })} hint="۱۳۷۵/۰۵/۱۲" />
          <Field label="کد ملی" value={form.nationalCode} onChange={(v) => setForm({ ...form, nationalCode: v })} />
          <div className="flex gap-2.5 sm:col-span-2">
            <Button
              onClick={save}
              className="h-11 flex-1 rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] text-[0.82rem] font-bold"
            >
              ذخیره تغییرات
            </Button>
            <Button
              variant="outline"
              onClick={() => setEdit(false)}
              className="h-11 rounded-2xl border-rose-200 text-[0.82rem] font-bold text-secondary-foreground"
            >
              انصراف
            </Button>
          </div>
        </div>
      )}
    </SectionCard>
  );
}

/* ─── Orders ─── */
function OrdersSection() {
  const placed = useOrders((s) => s.orders);
  const orders = allOrders(placed);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <SectionCard title="سفارش‌های من">
      {orders.length === 0 ? (
        <EmptyState
          icon="generic"
          title="هنوز سفارشی ثبت نکرده‌اید."
          description="پس از ثبت اولین سفارش، جزئیات و وضعیت آن را در این بخش می‌بینید."
        />
      ) : (
      <div className="space-y-4">
        {orders.map((o) => {
          const open = openId === o.id;
          return (
            <div key={o.id} className="rounded-2xl border border-rose-100 bg-rose-50/30 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[0.82rem] font-black text-foreground" dir="ltr">
                    {o.id}
                  </p>
                  <p className="mt-1 text-[0.72rem] text-muted-foreground">{faDateLong(o.date)}</p>
                </div>
                <OrderStatusBadge status={o.status} />
                <div className="text-left">
                  <p className="text-[0.68rem] text-muted-foreground">مجموع پرداخت</p>
                  <p className="text-[0.85rem] font-black text-primary">{faPrice(o.total)}</p>
                </div>
                <button
                  onClick={() => setOpenId(open ? null : o.id)}
                  className="inline-flex items-center gap-1 rounded-xl bg-white px-3 py-2 text-[0.72rem] font-bold text-primary ring-1 ring-rose-100 transition-colors hover:bg-rose-50"
                >
                  {open ? "بستن جزئیات" : "مشاهده جزئیات"}
                  <ChevronLeft size={13} className={cn("transition-transform", open && "-rotate-90")} />
                </button>
              </div>

              {open && (
                <div className="mt-4 space-y-2.5 border-t border-dashed border-rose-200 pt-4">
                  {o.items.map((it) => {
                    const p = getProduct(it.productId);
                    if (!p) return null;
                    return (
                      <div key={it.productId} className="flex items-center gap-3">
                        <span className="size-12 shrink-0 overflow-hidden rounded-xl bg-white">
                          <ProductImage src={p.images[0]} alt={p.name} className="size-full" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/product/${p.id}`}
                            className="line-clamp-1 text-[0.78rem] font-bold text-foreground hover:text-primary"
                          >
                            {p.name}
                          </Link>
                          <p className="mt-0.5 text-[0.68rem] text-muted-foreground">
                            تعداد: {toFa(it.qty)}
                          </p>
                        </div>
                        <span className="text-[0.75rem] font-bold text-secondary-foreground">
                          {faPrice(p.price * it.qty)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      )}
    </SectionCard>
  );
}

/* ─── Discounts ─── */
function DiscountsSection() {
  const copy = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    toast.success("کد تخفیف کپی شد.");
  };

  return (
    <SectionCard title="کد تخفیف">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {DISCOUNT_CODES.map((d) => {
          const expired = new Date(d.expiresAt) < new Date();
          return (
            <div
              key={d.code}
              className={cn(
                "relative overflow-hidden rounded-3xl border p-5",
                expired ? "border-rose-100 opacity-60" : "border-rose-200 bg-gradient-to-bl from-rose-soft/70 to-white"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xl font-black tracking-widest text-primary" dir="ltr">
                    {d.code}
                  </p>
                  <p className="mt-1.5 text-[0.85rem] font-bold text-foreground">{d.title}</p>
                  <p className="mt-1 max-w-[220px] text-[0.7rem] leading-5 text-secondary-foreground">
                    {d.description}
                  </p>
                  <p className="mt-2 text-[0.68rem] text-muted-foreground">
                    اعتبار تا: {faDateLong(d.expiresAt)}
                    {expired && " — منقضی شده"}
                  </p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                  <TicketPercent size={22} />
                </span>
              </div>
              <button
                onClick={() => copy(d.code)}
                className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-plum py-2.5 text-[0.76rem] font-bold text-white transition-colors hover:bg-plum/90"
              >
                <Copy size={14} />
                کپی کد
              </button>
            </div>
          );
        })}
      </div>
      <p className="mt-5 rounded-2xl bg-amber-50 p-3.5 text-[0.72rem] leading-6 text-amber-700">
        راهنما: در صفحه‌ی سبد خرید، کد را در کادر «کد تخفیف» وارد و روی «اعمال» بزنید تا تخفیف محاسبه شود.
      </p>
    </SectionCard>
  );
}

/* ─── Support ─── */
function SupportSection() {
  const tickets = useTickets((s) => s.tickets);
  const addTicket = useTickets((s) => s.add);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <SectionCard title="پشتیبانی Elora">
      <h3 className="mb-4 flex items-center gap-2 text-[0.85rem] font-black text-foreground">
        <HelpCircle size={16} className="text-primary" />
        پرسش‌های پرتکرار
      </h3>
      <Accordion type="single" collapsible className="rounded-2xl border border-rose-100 px-4">
        {FAQS.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-rose-100">
            <AccordionTrigger className="py-4 text-right text-[0.8rem] font-bold text-foreground hover:no-underline hover:text-primary">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-[0.78rem] leading-7 text-secondary-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 rounded-3xl bg-gradient-to-l from-lilac-soft/80 to-white p-5 ring-1 ring-rose-100">
        <h3 className="text-[0.88rem] font-black text-foreground">پاسخ سوال خود را پیدا نکردید؟</h3>
        <p className="mt-2 text-[0.78rem] leading-7 text-secondary-foreground">
          اگر پاسخ پرسش شما در بخش سوالات متداول وجود ندارد، می‌توانید با پشتیبانی تماس
          بگیرید یا برای ما تیکت ارسال کنید. کارشناسان ما در سریع‌ترین زمان پاسخگو هستند.
        </p>
        <p className="mt-3 flex items-center gap-2 text-[0.85rem] font-black text-primary" dir="ltr">
          <Phone size={16} />
          {SUPPORT_PHONE_FA}
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <a
            href={`tel:${SUPPORT_PHONE}`}
            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] px-5 text-[0.8rem] font-bold text-white shadow-md shadow-rose-200"
          >
            <Phone size={15} />
            تماس با پشتیبانی
          </a>
          <Button
            onClick={() => setDialogOpen(true)}
            variant="outline"
            className="h-11 rounded-2xl border-rose-200 px-5 text-[0.8rem] font-bold text-primary hover:bg-rose-50"
          >
            <MessageSquarePlus size={15} className="ml-1" />
            ارسال تیکت
          </Button>
        </div>
      </div>

      {/* previous tickets */}
      <h3 className="mb-3 mt-8 text-[0.85rem] font-black text-foreground">تیکت‌های من</h3>
      {tickets.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-rose-200 p-6 text-center text-[0.76rem] text-muted-foreground">
          هنوز تیکتی ثبت نکرده‌اید. برای ارسال، روی دکمه‌ی «ارسال تیکت» بزنید.
        </p>
      ) : (
        <ul className="space-y-2.5">
          {tickets.map((t) => (
            <li key={t.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-rose-100 bg-rose-50/30 p-4">
              <div>
                <p className="text-[0.8rem] font-bold text-foreground">{t.subject}</p>
                <p className="mt-1 text-[0.68rem] text-muted-foreground">
                  {t.id} — {faDateLong(t.date)} — {t.category}
                </p>
              </div>
              <span className={cn(
                "rounded-full px-3 py-1 text-[0.68rem] font-bold",
                t.status === "در حال بررسی" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
              )}>
                {t.status}
              </span>
            </li>
          ))}
        </ul>
      )}

      <TicketDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSubmit={addTicket} />
    </SectionCard>
  );
}

function TicketDialog({
  open, onClose, onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (t: { subject: string; category: string; description: string }) => void;
}) {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("سفارش");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (subject.trim().length < 3) return setError("موضوع را وارد کنید.");
    if (description.trim().length < 15) return setError("توضیحات باید حداقل ۱۵ کاراکتر باشد.");
    setError("");
    onSubmit({ subject: subject.trim(), category, description: description.trim() });
    toast.success("تیکت شما با موفقیت ثبت شد.");
    setSubject("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? null : onClose())}>
      <DialogContent className="max-w-md rounded-3xl border-rose-100" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="text-[0.95rem] font-black">ارسال تیکت</DialogTitle>
          <DialogDescription className="pt-1 text-[0.75rem]">
            فرم زیر را پر کنید؛ پاسخ در پنل کاربری و پیامک اعلام می‌شود.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[0.78rem] font-bold">موضوع</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="مثلاً پیگیری سفارش EL-102438"
              className="h-11 w-full rounded-xl border border-rose-100 bg-rose-50/50 px-3.5 text-[0.8rem] outline-none focus:border-rose-300 focus:bg-white"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[0.78rem] font-bold">دسته‌بندی</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 w-full rounded-xl border border-rose-100 bg-rose-50/50 px-3.5 text-[0.8rem] outline-none focus:border-rose-300 focus:bg-white"
            >
              {["سفارش", "پرداخت", "مرجوعی", "محصول", "پیشنهاد و انتقاد", "سایر"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[0.78rem] font-bold">توضیحات</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="شرح کامل درخواست خود را بنویسید…"
              className="rounded-xl border-rose-100 bg-rose-50/50 focus-visible:ring-rose-200"
            />
          </div>
          {error && <p className="text-[0.74rem] font-bold text-rose-500">{error}</p>}
          <Button
            onClick={submit}
            className="h-11 w-full rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] text-[0.82rem] font-bold"
          >
            ارسال تیکت
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Account wishlist (same store as /wishlist) ─── */
function WishlistSection() {
  const wishlist = useWishlist();
  const cart = useCart();
  const items = wishlist.items.map((id) => getProduct(id)!).filter(Boolean);

  return (
    <SectionCard title="علاقه‌مندی‌های من" action={
      <Link href="/wishlist" className="text-[0.74rem] font-bold text-primary hover:underline">
        مشاهده صفحه کامل
      </Link>
    }>
      {items.length === 0 ? (
        <EmptyState
          icon="wishlist"
          title="هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید."
          description="با زدن آیکون قلب روی محصولات، آن‌ها را برای بعد ذخیره کنید."
        />
      ) : (
        <ul className="space-y-3">
          {items.map((p) => (
            <li key={p.id} className="flex items-center gap-4 rounded-2xl border border-rose-100 bg-rose-50/30 p-3">
              <Link href={`/product/${p.id}`} className="size-16 shrink-0 overflow-hidden rounded-xl bg-white">
                <ProductImage src={p.images[0]} alt={p.name} className="size-full" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link href={`/product/${p.id}`} className="line-clamp-1 text-[0.8rem] font-bold text-foreground hover:text-primary">
                  {p.name}
                </Link>
                <p className="mt-1 text-[0.78rem] font-black text-primary">{faPrice(p.price)}</p>
              </div>
              <button
                onClick={() => {
                  cart.add(p.id);
                  toast.success("به سبد خرید اضافه شد.");
                }}
                className="shrink-0 rounded-xl bg-gradient-to-l from-primary to-[#c2476f] px-3.5 py-2 text-[0.7rem] font-bold text-white"
              >
                خرید
              </button>
              <button
                onClick={() => {
                  wishlist.remove(p.id);
                  toast("از علاقه‌مندی‌ها حذف شد.");
                }}
                aria-label="حذف"
                className="grid size-9 shrink-0 place-items-center rounded-xl text-rose-400 hover:bg-rose-50"
              >
                <Trash2 size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}

/* ─── Addresses ─── */
function AddressesSection() {
  const addresses = useAddresses();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [form, setForm] = useState({ receiver: "", phone: "", province: "تهران", city: "", full: "", postal: "" });
  const [error, setError] = useState("");

  const openNew = () => {
    setEditing(null);
    setForm({ receiver: "", phone: "", province: "تهران", city: "", full: "", postal: "" });
    setError("");
    setDialogOpen(true);
  };

  const openEdit = (id: string) => {
    const a = addresses.addresses.find((x) => x.id === id);
    if (!a) return;
    setEditing(id);
    setForm({ receiver: a.receiver, phone: a.phone, province: a.province, city: a.city, full: a.full, postal: a.postal });
    setError("");
    setDialogOpen(true);
  };

  const save = () => {
    if (form.receiver.trim().length < 3) return setError("نام گیرنده را وارد کنید.");
    if (!isValidIranPhone(normalizePhone(form.phone))) return setError("شماره تماس معتبر نیست.");
    if (form.city.trim().length < 2) return setError("نام شهر را وارد کنید.");
    if (form.full.trim().length < 10) return setError("آدرس کامل را وارد کنید.");
    if (!/^\d{5}$/.test(form.postal.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))))
      return setError("کد پستی باید ۵ رقم باشد.");
    if (editing) {
      addresses.update(editing, { ...form, phone: normalizePhone(form.phone) });
      toast.success("آدرس با موفقیت ویرایش شد.");
    } else {
      addresses.add({ ...form, phone: normalizePhone(form.phone) });
      toast.success("آدرس جدید اضافه شد.");
    }
    setDialogOpen(false);
  };

  return (
    <SectionCard title="آدرس‌های من" action={
      <button onClick={openNew} className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-l from-primary to-[#c2476f] px-3.5 py-2 text-[0.74rem] font-bold text-white shadow-sm">
        <Plus size={14} />
        افزودن آدرس جدید
      </button>
    }>
      {addresses.addresses.length === 0 ? (
        <EmptyState
          icon="generic"
          title="هنوز آدرسی ثبت نکرده‌اید"
          description="برای تسریع در ارسال سفارش‌ها، آدرس‌های خود را اضافه کنید."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {addresses.addresses.map((a) => (
            <div key={a.id} className="rounded-3xl border border-rose-100 bg-rose-50/30 p-5">
              <div className="flex items-center justify-between">
                <p className="text-[0.85rem] font-black text-foreground">{a.receiver}</p>
                <span className="rounded-full bg-white px-2.5 py-1 text-[0.64rem] font-bold text-lilac">
                  {a.province}
                </span>
              </div>
              <p className="mt-2 text-[0.75rem] leading-6 text-secondary-foreground">{a.full}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.68rem] text-muted-foreground">
                <span dir="ltr">{toFa(a.phone)}</span>
                <span>شهر: {a.city}</span>
                <span>کد پستی: {toFa(a.postal)}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => openEdit(a.id)}
                  className="inline-flex items-center gap-1 rounded-xl bg-white px-3 py-2 text-[0.72rem] font-bold text-primary ring-1 ring-rose-100 hover:bg-rose-50"
                >
                  <Pencil size={13} />
                  ویرایش
                </button>
                <button
                  onClick={() => setConfirmDelete(a.id)}
                  className="inline-flex items-center gap-1 rounded-xl bg-white px-3 py-2 text-[0.72rem] font-bold text-rose-500 ring-1 ring-rose-100 hover:bg-rose-50"
                >
                  <Trash2 size={13} />
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* add/edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={(v) => (v ? null : setDialogOpen(false))}>
        <DialogContent className="max-w-md rounded-3xl border-rose-100" dir="rtl">
          <DialogHeader className="text-right">
            <DialogTitle className="text-[0.95rem] font-black">
              {editing ? "ویرایش آدرس" : "افزودن آدرس جدید"}
            </DialogTitle>
            <DialogDescription className="pt-1 text-[0.75rem]">
              اطلاعات تحویل سفارش‌ها را دقیق وارد کنید.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <input value={form.receiver} onChange={(e) => setForm({ ...form, receiver: e.target.value })} placeholder="نام گیرنده" className={inp} />
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="شماره تماس" dir="ltr" className={`${inp} text-left`} />
            <select value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} className={inp}>
              {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="شهر" className={inp} />
            <textarea value={form.full} onChange={(e) => setForm({ ...form, full: e.target.value })} placeholder="آدرس کامل (خیابان، کوچه، پلاک، واحد)" rows={2} className={`${inp} h-auto py-2.5 sm:col-span-2`} />
            <input value={form.postal} onChange={(e) => setForm({ ...form, postal: e.target.value })} placeholder="کد پستی (۵ رقم)" inputMode="numeric" className={inp} />
          </div>
          {error && <p className="mt-2 text-[0.74rem] font-bold text-rose-500">{error}</p>}
          <Button onClick={save} className="h-11 w-full rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] text-[0.82rem] font-bold">
            ذخیره آدرس
          </Button>
        </DialogContent>
      </Dialog>

      {/* delete confirm */}
      <Dialog open={Boolean(confirmDelete)} onOpenChange={(v) => (v ? null : setConfirmDelete(null))}>
        <DialogContent className="max-w-sm rounded-3xl border-rose-100 text-center" dir="rtl">
          <DialogHeader className="items-center text-center">
            <DialogTitle className="text-[0.92rem] font-black">حذف آدرس</DialogTitle>
            <DialogDescription className="pt-2 text-[0.78rem] leading-7">
              آیا از حذف این آدرس مطمئن هستید؟ این عمل قابل بازگشت نیست.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-3 flex gap-2.5">
            <Button
              onClick={() => {
                addresses.remove(confirmDelete!);
                setConfirmDelete(null);
                toast.success("آدرس حذف شد.");
              }}
              className="h-11 flex-1 rounded-2xl bg-rose-500 text-[0.82rem] font-bold text-white hover:bg-rose-600"
            >
              بله، حذف کن
            </Button>
            <Button
              variant="outline"
              onClick={() => setConfirmDelete(null)}
              className="h-11 flex-1 rounded-2xl border-rose-200 text-[0.82rem] font-bold"
            >
              انصراف
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </SectionCard>
  );
}

const inp =
  "h-11 w-full rounded-xl border border-rose-100 bg-rose-50/50 px-3.5 text-[0.8rem] outline-none transition-all focus:border-rose-300 focus:bg-white";

function SectionCard({
  title, action, children,
}: {
  title: string; action?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-rose-100 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[0.95rem] font-black text-foreground">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Field({
  label, value, onChange, ltr, hint,
}: {
  label: string; value: string; onChange: (v: string) => void; ltr?: boolean; hint?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[0.78rem] font-bold text-foreground">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir={ltr ? "ltr" : undefined}
        placeholder={hint}
        className={`${inp} ${ltr ? "text-left" : ""}`}
      />
    </div>
  );
}
