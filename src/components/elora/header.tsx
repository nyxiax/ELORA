"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Heart, ShoppingBag, User, LogOut, LayoutGrid, ChevronDown,
  Menu, X, Percent, Clock3, Sparkles, Tag, Brush, Leaf,
} from "lucide-react";
import { EloraLogo } from "./icons";
import { SearchBox } from "./search-box";
import { MegaMenu } from "./mega-menu";
import { CATEGORIES } from "@/lib/data/categories";
import { useAuth, useCart, useUI, useWishlist } from "@/lib/store";
import { useMounted } from "./use-mounted";
import { toFa } from "@/lib/fa";
import { toast } from "sonner";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "./icons";

const SPECIAL_OFFER_ITEMS = [
  { label: "تخفیفات روزانه", href: "/special-offers?section=daily", icon: Percent },
  { label: "پیشنهادهای شگفت‌انگیز", href: "/special-offers?section=amazing", icon: Sparkles },
  { label: "آخرین فرصت‌ها", href: "/special-offers?section=last", icon: Clock3 },
  { label: "محصولات با تخفیف", href: "/special-offers?section=all", icon: Tag },
  { label: "پیشنهادهای ویژه آرایشی", href: "/special-offers?section=makeup", icon: Brush },
  { label: "پیشنهادهای ویژه مراقبتی", href: "/special-offers?section=care", icon: Leaf },
];

const IMPORTANT_PAGES = [
  { label: "پیگیری سفارش", href: "/order-tracking" },
  { label: "رویه ارسال", href: "/shipping" },
  { label: "تماس با ما", href: "/contact" },
  { label: "وبلاگ زیبایی", href: "/blog" },
];

export function Header() {
  const mounted = useMounted();
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const cart = useCart();
  const wishlist = useWishlist();
  const ui = useUI();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // close menus on navigation (adjust state during render — React approved)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  const cartCount = mounted ? cart.items.reduce((a, b) => a + b.qty, 0) : 0;
  const wishCount = mounted && auth.user ? wishlist.items.length : 0;

  const logout = () => {
    auth.logout();
    toast.success("با موفقیت از حساب خود خارج شدید.");
    router.push("/");
    setTimeout(() => sessionStorage.removeItem("elora-just-logged-out"), 800);
  };

  // close drawer with Escape + lock body scroll while open
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rose-100/80 bg-white/90 backdrop-blur-lg">
      <div className="container-elora">
        {/* ── top row: logo+search (right) / actions (left) ── */}
        <div className="flex h-16 items-center gap-4 lg:h-[72px] lg:gap-8">
          {/* mobile hamburger */}
          <div className="lg:hidden">
            <button
              aria-label="منوی اصلی"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="grid size-10 place-items-center rounded-xl text-plum transition-colors hover:bg-rose-50"
            >
              <Menu size={22} />
            </button>
            {mobileOpen &&
              mounted &&
              typeof document !== "undefined" &&
              createPortal(
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-label="منوی اصلی"
                  className="fixed inset-0 z-[70] lg:hidden"
                >
                  <div
                    className="absolute inset-0 bg-plum/40 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setMobileOpen(false)}
                    aria-hidden="true"
                  />
                  <div className="elora-scroll absolute inset-y-0 right-0 flex w-[320px] max-w-[86vw] animate-in slide-in-from-right flex-col overflow-y-auto bg-white shadow-2xl duration-300">
                    <div className="flex items-center justify-between border-b border-rose-100 p-4">
                      <EloraLogo />
                      <button
                        aria-label="بستن منو"
                        onClick={() => setMobileOpen(false)}
                        className="grid size-9 place-items-center rounded-xl text-plum transition-colors hover:bg-rose-50"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <MobileNav onNavigate={() => setMobileOpen(false)} />
                  </div>
                </div>,
                document.body
              )}
          </div>

          {/* RIGHT group: logo + search */}
          <div className="flex min-w-0 flex-1 items-center gap-3 lg:gap-6">
            <Link href="/" aria-label="اِلورا — صفحه اصلی" className="shrink-0">
              <EloraLogo />
            </Link>
            <div className="hidden flex-1 justify-center md:flex">
              <SearchBox />
            </div>
          </div>

          {/* LEFT group: actions */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Link
              href="/wishlist"
              aria-label="علاقه‌مندی‌ها"
              className="relative grid size-10 place-items-center rounded-xl text-plum transition-colors hover:bg-rose-50"
            >
              <Heart size={20} />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -left-0.5 grid min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[0.62rem] font-bold text-white">
                  {toFa(wishCount)}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              aria-label="سبد خرید"
              className="relative grid size-10 place-items-center rounded-xl text-plum transition-colors hover:bg-rose-50"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -left-0.5 grid min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[0.62rem] font-bold text-white">
                  {toFa(cartCount)}
                </span>
              )}
            </Link>

            {mounted && auth.user ? (
              <div className="group relative">
                <button className="flex h-10 items-center gap-2 rounded-xl border border-rose-100 bg-rose-50/60 px-3 text-[0.78rem] font-bold text-plum transition-colors hover:bg-rose-50">
                  <User size={17} className="text-primary" />
                  <span className="max-w-[90px] truncate">{auth.user.name}</span>
                </button>
                <div className="invisible absolute left-0 top-full z-50 mt-2 w-48 translate-y-1 rounded-2xl border border-rose-100 bg-white p-1.5 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <Link href="/account" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[0.8rem] text-foreground transition-colors hover:bg-rose-50">
                    <LayoutGrid size={15} className="text-primary" /> حساب کاربری
                  </Link>
                  <Link href="/account?section=orders" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[0.8rem] text-foreground transition-colors hover:bg-rose-50">
                    <ShoppingBag size={15} className="text-primary" /> سفارش‌های من
                  </Link>
                  <button onClick={logout} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-[0.8rem] text-rose-600 transition-colors hover:bg-rose-50">
                    <LogOut size={15} /> خروج از حساب
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex h-10 items-center gap-2 rounded-xl bg-gradient-to-l from-primary to-[#c2476f] px-3 text-[0.78rem] font-bold text-white shadow-md shadow-rose-200 transition-all hover:shadow-lg sm:px-4"
              >
                <User size={16} />
                <span className="hidden sm:inline">ورود / ثبت‌نام</span>
              </Link>
            )}
          </div>
        </div>

        {/* mobile search row */}
        <div className="pb-3 md:hidden">
          <SearchBox />
        </div>
      </div>

      {/* ── nav row (desktop) ── */}
      <div className="relative hidden border-t border-rose-100/70 lg:block">
        <div className="container-elora">
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setMegaOpen((v) => !v)}
              className={cn(
                "flex items-center gap-2 rounded-t-xl px-4 py-3 text-[0.85rem] font-bold text-plum transition-colors hover:text-primary",
                megaOpen && "text-primary"
              )}
              aria-expanded={megaOpen}
            >
              <LayoutGrid size={17} className="text-primary" />
              دسته‌بندی محصولات
              <ChevronDown size={14} className={cn("transition-transform", megaOpen && "rotate-180")} />
            </button>

            {/* special offers dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1.5 rounded-t-xl px-4 py-3 text-[0.85rem] font-bold text-plum transition-colors hover:text-primary">
                پیشنهادات ویژه
                <ChevronDown size={14} />
              </button>
              <div className="invisible absolute right-0 top-full z-50 w-64 translate-y-1 rounded-2xl rounded-tr-none border border-rose-100 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {SPECIAL_OFFER_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[0.8rem] text-foreground transition-colors hover:bg-rose-50 hover:text-primary"
                  >
                    <item.icon size={15} className="text-primary" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/blog"
              className="rounded-t-xl px-4 py-3 text-[0.85rem] font-bold text-plum transition-colors hover:text-primary"
            >
              وبلاگ
            </Link>

            {/* important pages dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1.5 rounded-t-xl px-4 py-3 text-[0.85rem] font-bold text-plum transition-colors hover:text-primary">
                صفحات مهم
                <ChevronDown size={14} />
              </button>
              <div className="invisible absolute right-0 top-full z-50 w-52 translate-y-1 rounded-2xl rounded-tr-none border border-rose-100 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {IMPORTANT_PAGES.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[0.8rem] text-foreground transition-colors hover:bg-rose-50 hover:text-primary"
                  >
                    <span className="size-1.5 rounded-full bg-rose-200" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>

        {/* mega menu anchored right */}
        <div className="container-elora relative">
          <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
        </div>
      </div>
    </header>
  );
}

/* ── Mobile accordion navigation ── */
function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const linkCls =
    "block rounded-xl px-4 py-3 text-[0.85rem] font-semibold text-foreground transition-colors hover:bg-rose-50";

  return (
    <div className="p-3">
      <div>
        <Link href="/special-offers" onClick={onNavigate} className={cn(linkCls, "text-primary")}>
          پیشنهادات ویژه
        </Link>
      </div>
      <div>
        <Link href="/blog" onClick={onNavigate} className={linkCls}>
          وبلاگ
        </Link>
      </div>

      <Accordion type="multiple" className="mt-1">
        <AccordionItem value="cats" className="border-rose-100">
          <AccordionTrigger className="rounded-xl px-4 py-3 text-[0.85rem] font-semibold hover:no-underline hover:bg-rose-50">
            دسته‌بندی محصولات
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            {CATEGORIES.map((c) => (
              <Accordion key={c.slug} type="multiple" className="px-2">
                <AccordionItem value={c.slug} className="border-rose-100/70">
                  <AccordionTrigger className="rounded-xl px-3 py-2.5 text-[0.82rem] font-bold text-plum hover:no-underline hover:bg-rose-50/60">
                    <span className="flex items-center gap-2.5">
                      <CategoryIcon icon={c.icon} className="size-4.5 text-primary" />
                      {c.name}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    {c.groups.map((g) => (
                      <div key={g.title} className="mb-2">
                        <p className="px-4 py-1 text-[0.7rem] font-bold text-muted-foreground">
                          {g.title}
                        </p>
                        <div className="flex flex-wrap gap-1 px-3">
                          {g.subs.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/category/${s.slug}`}
                              onClick={onNavigate}
                              className="rounded-full bg-rose-50/80 px-2.5 py-1 text-[0.7rem] text-secondary-foreground transition-colors hover:bg-rose-100 hover:text-primary"
                            >
                              {s.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pages" className="border-rose-100">
          <AccordionTrigger className="rounded-xl px-4 py-3 text-[0.85rem] font-semibold hover:no-underline hover:bg-rose-50">
            صفحات مهم
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            {IMPORTANT_PAGES.map((p) => (
              <Link key={p.label} href={p.href} onClick={onNavigate} className={cn(linkCls, "py-2.5 text-[0.8rem]")}>
                {p.label}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-3 border-t border-rose-100 pt-3">
        <Link href="/account" onClick={onNavigate} className={linkCls}>
          حساب کاربری
        </Link>
        <Link href="/wishlist" onClick={onNavigate} className={linkCls}>
          علاقه‌مندی‌ها
        </Link>
      </div>
    </div>
  );
}
