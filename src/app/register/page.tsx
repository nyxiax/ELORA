"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Phone, Lock, Cake, IdCard, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/store";
import { isValidIranPhone, isValidNationalCode, normalizePhone, toFa } from "@/lib/fa";
import { EloraLogo } from "@/components/elora/icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Fields {
  name: string;
  phone: string;
  password: string;
  confirm: string;
  birthday: string;
  nationalCode: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const auth = useAuth();
  const [f, setF] = useState<Fields>({
    name: "", phone: "", password: "", confirm: "", birthday: "", nationalCode: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields | "form", string>>>({});

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));

  const submit = () => {
    const errs: Partial<Record<keyof Fields | "form", string>> = {};
    if (f.name.trim().length < 3) errs.name = "نام و نام خانوادگی را کامل وارد کنید.";
    const p = normalizePhone(f.phone);
    if (!isValidIranPhone(p)) errs.phone = "شماره تماس باید ۱۱ رقم و با ۰۹ شروع شود.";
    if (auth.isPhoneTaken(p)) errs.phone = "این شماره قبلاً ثبت شده است؛ وارد شوید.";
    if (f.password.length < 6) errs.password = "رمز عبور حداقل ۶ کاراکتر باشد.";
    if (f.password !== f.confirm) errs.confirm = "تکرار رمز عبور با رمز عبور یکسان نیست.";
    if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(toEnSlash(f.birthday)))
      errs.birthday = "تاریخ تولد را به شکل ۱۳۷۵/۰۵/۱۲ وارد کنید.";
    if (!isValidNationalCode(f.nationalCode)) errs.nationalCode = "کد ملی ۱۰ رقمی معتبر وارد کنید.";

    setErrors(errs);
    if (Object.keys(errs).length) return;

    const res = auth.register({
      name: f.name.trim(),
      phone: p,
      password: f.password,
      birthday: f.birthday,
      nationalCode: f.nationalCode,
    });
    if (!res.ok) {
      setErrors({ form: res.error });
      return;
    }
    toast.success("حساب شما با موفقیت ساخته شد. به اِلورا خوش آمدید!");
    router.push("/account");
  };

  return (
    <div className="container-elora flex flex-1 items-center justify-center py-10">
      <div className="w-full max-w-xl rounded-[2rem] border border-rose-100 bg-white p-7 shadow-[0_30px_80px_-30px_rgba(212,83,126,0.35)] sm:p-10">
        <EloraLogo />
        <h1 className="mt-6 text-lg font-black text-foreground">ساخت حساب کاربری</h1>
        <p className="mt-2 text-[0.78rem] text-secondary-foreground">
          اطلاعات زیر را پر کنید تا به دنیای زیبایی اِلورا بپیوندید.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="نام و نام خانوادگی"
            icon={<User size={15} />}
            error={errors.name}
            className="sm:col-span-2"
          >
            <input
              value={f.name}
              onChange={set("name")}
              placeholder="مثلاً مریم احمدی"
              className={inputCls}
            />
          </Field>

          <Field label="شماره تماس" icon={<Phone size={15} />} error={errors.phone}>
            <input
              value={f.phone}
              onChange={set("phone")}
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              dir="ltr"
              inputMode="numeric"
              className={`${inputCls} text-left`}
            />
          </Field>

          <Field
            label="تاریخ تولد"
            icon={<Cake size={15} />}
            error={errors.birthday}
            hint="مثال: ۱۳۷۵/۰۵/۱۲"
          >
            <input
              value={f.birthday}
              onChange={set("birthday")}
              placeholder="۱۳۷۵/۰۵/۱۲"
              className={inputCls}
            />
          </Field>

          <Field
            label="کد ملی"
            icon={<IdCard size={15} />}
            error={errors.nationalCode}
          >
            <input
              value={f.nationalCode}
              onChange={set("nationalCode")}
              placeholder="۱۰ رقم"
              inputMode="numeric"
              className={inputCls}
            />
          </Field>

          <div className="sm:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="رمز عبور" icon={<Lock size={15} />} error={errors.password}>
                <input
                  type="password"
                  value={f.password}
                  onChange={set("password")}
                  placeholder="حداقل ۶ کاراکتر"
                  dir="ltr"
                  className={`${inputCls} text-left`}
                />
              </Field>
              <Field label="تکرار رمز عبور" icon={<Lock size={15} />} error={errors.confirm}>
                <input
                  type="password"
                  value={f.confirm}
                  onChange={set("confirm")}
                  placeholder="تکرار رمز"
                  dir="ltr"
                  className={`${inputCls} text-left`}
                />
              </Field>
            </div>
          </div>
        </div>

        {errors.form && (
          <p className="mt-4 rounded-xl bg-rose-50 p-3 text-center text-[0.75rem] font-bold text-rose-500">
            {errors.form}
          </p>
        )}

        <Button
          onClick={submit}
          className="mt-6 h-12 w-full rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] text-[0.9rem] font-bold shadow-md shadow-rose-200 hover:shadow-lg"
        >
          ساخت حساب
        </Button>

        <p className="mt-4 text-center text-[0.8rem] text-secondary-foreground">
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link href="/login" className="font-bold text-primary hover:underline">
            ورود به حساب
          </Link>
        </p>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-[0.66rem] text-muted-foreground">
          <ShieldCheck size={13} className="text-emerald-500" />
          ثبت‌نام نمایشی — اطلاعات فقط در مرورگر شما ذخیره می‌شود.
        </p>
      </div>
    </div>
  );
}

const inputCls =
  "h-12 w-full rounded-2xl border border-rose-100 bg-rose-50/40 px-4 pl-4 pr-11 text-[0.85rem] outline-none transition-all placeholder:text-muted-foreground/70 focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100";

function Field({
  label, icon, error, hint, children, className,
}: {
  label: string; icon: React.ReactNode; error?: string; hint?: string;
  children: React.ReactNode; className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-[0.78rem] font-bold text-foreground">{label}</label>
      <div className="relative">
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-rose-300">{icon}</span>
        {children}
      </div>
      {hint && !error && <p className="mt-1 text-[0.66rem] text-muted-foreground">{hint}</p>}
      {error && <p className="mt-1.5 text-[0.7rem] font-bold text-rose-500">{error}</p>}
    </div>
  );
}

function toEnSlash(s: string): string {
  return s
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}
