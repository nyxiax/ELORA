"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/store";
import { isValidIranPhone, normalizePhone, toFa } from "@/lib/fa";
import { EloraLogo } from "@/components/elora/icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ phone?: string; password?: string; form?: string }>({});

  const submit = () => {
    const errs: typeof errors = {};
    const p = normalizePhone(phone);
    if (!isValidIranPhone(p)) errs.phone = "شماره تماس باید ۱۱ رقم و با ۰۹ شروع شود.";
    if (password.length < 4) errs.password = "رمز عبور حداقل ۴ کاراکتر است.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const res = auth.login(p, password);
    if (!res.ok) {
      setErrors({ form: res.error });
      return;
    }
    toast.success("خوش آمدید! ورود با موفقیت انجام شد.");
    router.push("/account");
  };

  return (
    <div className="container-elora flex flex-1 items-center justify-center py-10">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-[2rem] border border-rose-100 bg-white shadow-[0_30px_80px_-30px_rgba(212,83,126,0.35)] lg:grid-cols-2">
        {/* side panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-bl from-rose-soft via-blush to-lilac-soft p-9 lg:flex">
          <div className="pointer-events-none absolute -left-10 -top-10 size-52 rounded-full bg-white/50 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-14 -right-10 size-64 rounded-full bg-white/40 blur-2xl" />
          <EloraLogo />
          <div>
            <h2 className="text-xl font-black leading-9 text-plum">
              به دنیای زیبایی اِلورا خوش آمدید
            </h2>
            <p className="mt-3 text-[0.82rem] leading-7 text-secondary-foreground">
              با ورود به حساب کاربری، از سفارش‌های آنلاین، لیست علاقه‌مندی‌ها، کدهای
              تخفیف اختصاصی و پیگیری سریع سفارش بهره‌مند شوید.
            </p>
            <ul className="mt-5 space-y-2.5 text-[0.78rem] font-semibold text-plum/80">
              <li className="flex items-center gap-2">
                <Sparkles size={15} className="text-primary" /> تخفیف‌های ویژه اعضا
              </li>
              <li className="flex items-center gap-2">
                <Sparkles size={15} className="text-primary" /> ذخیره‌ی علاقه‌مندی‌ها
              </li>
              <li className="flex items-center gap-2">
                <Sparkles size={15} className="text-primary" /> پیگیری لحظه‌ای سفارش
              </li>
            </ul>
          </div>
          <p className="text-[0.68rem] text-muted-foreground">
            حساب نمایشی: شماره {toFa("09123456789")} — رمز {toFa("123456")}
          </p>
        </div>

        {/* form */}
        <div className="p-7 sm:p-10">
          <h1 className="text-lg font-black text-foreground">ورود به حساب</h1>
          <p className="mt-2 text-[0.78rem] text-secondary-foreground">
            شماره تماس و رمز عبور خود را وارد کنید.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-[0.78rem] font-bold text-foreground">
                شماره تماس
              </label>
              <div className="relative">
                <Phone size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-rose-300" />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  dir="ltr"
                  inputMode="numeric"
                  className="h-12 w-full rounded-2xl border border-rose-100 bg-rose-50/40 pr-11 pl-4 text-left text-[0.88rem] outline-none transition-all focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
                />
              </div>
              {errors.phone && <p className="mt-1.5 text-[0.7rem] font-bold text-rose-500">{errors.phone}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-[0.78rem] font-bold text-foreground">رمز عبور</label>
              <div className="relative">
                <Lock size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-rose-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  placeholder="••••••"
                  dir="ltr"
                  className="h-12 w-full rounded-2xl border border-rose-100 bg-rose-50/40 pr-11 pl-4 text-left text-[0.88rem] outline-none transition-all focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
                />
              </div>
              {errors.password && <p className="mt-1.5 text-[0.7rem] font-bold text-rose-500">{errors.password}</p>}
            </div>

            {errors.form && (
              <p className="rounded-xl bg-rose-50 p-3 text-center text-[0.75rem] font-bold text-rose-500">
                {errors.form}
              </p>
            )}

            <Button
              onClick={submit}
              className="h-12 w-full rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] text-[0.9rem] font-bold shadow-md shadow-rose-200 hover:shadow-lg"
            >
              ورود به حساب
            </Button>

            <p className="pt-2 text-center text-[0.8rem] text-secondary-foreground">
              حساب کاربری ندارید؟{" "}
              <Link href="/register" className="font-bold text-primary hover:underline">
                ساخت حساب
              </Link>
            </p>

            <p className="flex items-center justify-center gap-1.5 text-[0.66rem] text-muted-foreground">
              <ShieldCheck size={13} className="text-emerald-500" />
              احراز هویت نمایشی — اطلاعات فقط در مرورگر شما ذخیره می‌شود.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
