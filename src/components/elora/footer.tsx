"use client";

import Link from "next/link";
import {
  Phone, Mail, Instagram, Send, MessageCircle, MapPin,
  ShieldCheck, BadgeCheck, CreditCard, ChevronLeft,
} from "lucide-react";
import { EloraLogo } from "./icons";
import { SUPPORT_PHONE, SUPPORT_PHONE_FA, CONTACT_EMAIL } from "@/lib/data/misc";

const LINKS_COL1 = [
  { label: "صفحه اصلی", href: "/" },
  { label: "تماس با ما", href: "/contact" },
  { label: "وبلاگ", href: "/blog" },
  { label: "آدرس", href: "/contact" },
  { label: "درباره ما", href: "/#about" },
];

const LINKS_COL2 = [
  { label: "پرسش‌های متداول", href: "/account?section=support" },
  { label: "قوانین مرجوعی", href: "/shipping#returns" },
  { label: "گزارش خطا", href: "/account?section=support" },
];

const LINKS_COL3 = [
  { label: "پروفایل کاربر", href: "/account" },
  { label: "ثبت‌نام کاربر", href: "/register" },
  { label: "نحوه ثبت سفارش", href: "/shipping#how" },
  { label: "رویه ارسال", href: "/shipping" },
  { label: "شیوه پرداخت", href: "/shipping#payment" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-rose-100 bg-gradient-to-b from-white to-blush/60">
      {/* trust badges row */}
      <div className="border-b border-rose-100/70">
        <div className="container-elora grid grid-cols-1 gap-4 py-7 sm:grid-cols-3">
          <TrustBadge
            icon={<ShieldCheck className="size-6" />}
            title="نماد اعتماد الکترونیکی"
            desc="نماد و مجوز (نمایشی)"
          />
          <TrustBadge
            icon={<BadgeCheck className="size-6" />}
            title="مجوزهای صنفی"
            desc="اتحادیه فروشندگان (نمایشی)"
          />
          <TrustBadge
            icon={<CreditCard className="size-6" />}
            title="پرداخت امن"
            desc="درگاه بانکی امن (دمو)"
          />
        </div>
      </div>

      <div className="container-elora py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* column 1 */}
          <div>
            <h4 className="mb-4 text-[0.9rem] font-black text-foreground">لینک‌ها</h4>
            <ul className="space-y-2.5">
              {LINKS_COL1.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[0.8rem] text-secondary-foreground transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* column 2 */}
          <div>
            <h4 className="mb-4 text-[0.9rem] font-black text-foreground">خدمات مشتریان</h4>
            <ul className="space-y-2.5">
              {LINKS_COL2.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[0.8rem] text-secondary-foreground transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* column 3 */}
          <div>
            <h4 className="mb-4 text-[0.9rem] font-black text-foreground">راهنمای خرید</h4>
            <ul className="space-y-2.5">
              {LINKS_COL3.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[0.8rem] text-secondary-foreground transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* column 4 */}
          <div>
            <h4 className="mb-4 text-[0.9rem] font-black text-foreground">مجوزها و اعتماد</h4>
            <div className="grid grid-cols-3 gap-2.5 max-w-[220px]">
              {["نماد اعتماد", "ساماندهی", "پرداخت امن"].map((t) => (
                <div
                  key={t}
                  className="grid aspect-square place-items-center rounded-2xl border border-dashed border-rose-200 bg-white/70 p-1.5 text-center"
                >
                  <span className="text-[0.58rem] leading-4 text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <EloraLogo />
            <p className="mt-4 text-[0.78rem] leading-6 text-secondary-foreground">
              اِلورا؛ مقصد مدرن دنیای زیبایی با بیش از ۸ هزار محصول از برندهای معتبر
              آرایشی، مراقبتی، عطری و لوازم برقی.
            </p>
          </div>
        </div>
      </div>

      {/* final row */}
      <div className="border-t border-rose-100/70 bg-white/60">
        <div className="container-elora grid grid-cols-1 gap-8 py-8 md:grid-cols-2">
          <div>
            <h4 className="mb-3 text-[0.9rem] font-black text-foreground">درباره Elora</h4>
            <p className="max-w-md text-[0.78rem] leading-7 text-secondary-foreground">
              اِلورا یک مقصد مدرن خرید محصولات زیبایی است؛ از آرایشی و مراقبت پوست تا
              مو، عطر و لوازم برقی. ما با انتخاب دقیق محصولات از برندهای معتبر جهانی و
              ارسال سریع، تجربه‌ای لذت‌بخش و مطمئن برای شما می‌سازیم. این وب‌سایت یک
              قالب نمایشی است.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-[0.9rem] font-black text-foreground">با ما در ارتباط باشید</h4>
            <ul className="space-y-2.5 text-[0.8rem] text-secondary-foreground">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-primary" />
                <a href={`tel:${SUPPORT_PHONE}`} dir="ltr" className="transition-colors hover:text-primary">
                  {SUPPORT_PHONE_FA}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-primary" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-primary">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} className="text-primary" />
                تهران، خیابان ولیعصر، برج زیبایی اِلورا، طبقه ۵
              </li>
            </ul>
            <div className="mt-4 flex items-center gap-2.5">
              <Social href="https://instagram.com" label="اینستاگرام"><Instagram size={16} /></Social>
              <Social href="https://telegram.org" label="تلگرام"><Send size={16} /></Social>
              <Social href="https://wa.me/989120000000" label="واتساپ"><MessageCircle size={16} /></Social>
            </div>
          </div>
        </div>

        <div className="border-t border-rose-100/70">
          <div className="container-elora flex flex-col items-center justify-between gap-2 py-4 text-[0.7rem] text-muted-foreground sm:flex-row">
            <span>© تمامی حقوق این قالب نمایشی برای اِلورا محفوظ است.</span>
            <Link href="/shipping" className="inline-flex items-center gap-1 transition-colors hover:text-primary">
              راهنمای کامل خرید و ارسال
              <ChevronLeft size={12} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TrustBadge({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-rose-200 bg-white/70 px-4 py-3">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blush text-primary">
        {icon}
      </span>
      <div>
        <p className="text-[0.8rem] font-bold text-foreground">{title}</p>
        <p className="mt-0.5 text-[0.68rem] text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid size-9 place-items-center rounded-xl border border-rose-100 bg-white text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:bg-rose-50"
    >
      {children}
    </a>
  );
}
