"use client";

import { useState } from "react";
import { PackageSearch, CheckCircle2, ClipboardList, Package, Truck, MapPin, Home } from "lucide-react";
import { Breadcrumb } from "@/components/elora/breadcrumb";
import { Button } from "@/components/ui/button";
import { normalizePhone, isValidIranPhone } from "@/lib/fa";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STAGES = [
  { label: "ثبت سفارش", icon: ClipboardList, done: true },
  { label: "آماده‌سازی", icon: Package, done: true },
  { label: "ارسال", icon: Truck, done: true },
  { label: "در مسیر", icon: MapPin, done: true },
  { label: "تحویل", icon: Home, done: false },
];

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ orderId?: string; phone?: string }>({});
  const [result, setResult] = useState<null | { id: string; current: number }>(null);

  const submit = () => {
    const errs: typeof errors = {};
    if (!/^(EL-)?\d{6,9}$/i.test(orderId.trim()))
      errs.orderId = "شماره سفارش معتبر نیست (مثال: EL-102438).";
    if (!isValidIranPhone(normalizePhone(phone))) errs.phone = "شماره تماس معتبر نیست.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      setResult(null);
      return;
    }
    // demo: show a realistic mid-delivery status
    setResult({ id: orderId.trim().toUpperCase(), current: 3 });
    toast.success("وضعیت سفارش شما پیدا شد.");
  };

  return (
    <div className="container-elora py-6 lg:py-10">
      <Breadcrumb items={[{ label: "پیگیری سفارش" }]} />
      <div className="mx-auto max-w-2xl">
        <div className="rounded-[2rem] border border-rose-100 bg-white p-7 shadow-sm sm:p-10">
          <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-rose-soft to-lilac-soft text-primary">
            <PackageSearch size={26} />
          </span>
          <h1 className="mt-5 text-xl font-black text-foreground">پیگیری سفارش</h1>
          <p className="mt-2 text-[0.8rem] leading-7 text-secondary-foreground">
            شماره سفارش و شماره تماس خود را وارد کنید تا وضعیت لحظه‌ای مرسوله را ببینید.
            (این یک نسخه‌ی نمایشی است؛ هر شماره‌ی معتبر وضعیت نمونه را نشان می‌دهد.)
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[0.78rem] font-bold text-foreground">شماره سفارش</label>
              <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="EL-102438"
                dir="ltr"
                className={`${inp} text-left`}
              />
              {errors.orderId && <p className="mt-1.5 text-[0.7rem] font-bold text-rose-500">{errors.orderId}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-[0.78rem] font-bold text-foreground">شماره تماس</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                dir="ltr"
                className={`${inp} text-left`}
              />
              {errors.phone && <p className="mt-1.5 text-[0.7rem] font-bold text-rose-500">{errors.phone}</p>}
            </div>
          </div>

          <Button
            onClick={submit}
            className="mt-6 h-12 w-full rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] text-[0.88rem] font-bold shadow-md shadow-rose-200"
          >
            پیگیری سفارش
          </Button>
        </div>

        {/* result timeline */}
        {result && (
          <div className="mt-6 rounded-[2rem] border border-rose-100 bg-gradient-to-b from-blush/60 to-white p-7 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[0.72rem] text-muted-foreground">سفارش</p>
                <p className="mt-1 text-[0.95rem] font-black text-foreground" dir="ltr">{result.id}</p>
              </div>
              <span className="rounded-full bg-purple-50 px-4 py-2 text-[0.74rem] font-bold text-lilac ring-1 ring-purple-100">
                در حال ارسال به مقصد
              </span>
            </div>

            <div className="relative mt-9">
              <div className="absolute right-[22px] top-2 h-[calc(100%-24px)] w-0.5 bg-rose-100" />
              <ul className="relative space-y-7">
                {STAGES.map((s, i) => {
                  const done = i <= result.current;
                  const current = i === result.current;
                  return (
                    <li key={s.label} className="flex items-center gap-4">
                      <span
                        className={cn(
                          "z-10 grid size-11 place-items-center rounded-2xl transition-all",
                          done
                            ? "bg-gradient-to-br from-primary to-[#c2476f] text-white shadow-md shadow-rose-200"
                            : "border border-rose-200 bg-white text-rose-200"
                        )}
                      >
                        {done && !current ? <CheckCircle2 size={20} /> : <s.icon size={20} />}
                      </span>
                      <div>
                        <p className={cn("text-[0.85rem] font-bold", done ? "text-foreground" : "text-muted-foreground")}>
                          {s.label}
                        </p>
                        {current && (
                          <p className="mt-0.5 text-[0.7rem] text-primary">
                            مرحله فعلی — مرسوله در حال ارسال است
                          </p>
                        )}
                        {done && !current && (
                          <p className="mt-0.5 text-[0.7rem] text-emerald-600">انجام شد</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inp =
  "h-12 w-full rounded-2xl border border-rose-100 bg-rose-50/40 px-4 text-[0.85rem] outline-none transition-all focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100";
