import type { Metadata } from "next";
import { Truck, Clock3, PackageCheck, ShieldCheck, CreditCard, RotateCcw, ClipboardList, MapPin, Home } from "lucide-react";
import { Breadcrumb } from "@/components/elora/breadcrumb";

export const metadata: Metadata = { title: "رویه ارسال" };

const STEPS = [
  { icon: ClipboardList, title: "ثبت سفارش", desc: "سبد خرید را تکمیل و پرداخت کنید؛ سفارش شما بلافاصله ثبت می‌شود." },
  { icon: PackageCheck, title: "آماده‌سازی و بسته‌بندی", desc: "کارشناسان ما کالا را کنترل و با بسته‌بندی بهداشتی و ضدضربه آماده می‌کنند." },
  { icon: Truck, title: "تحویل به شرکت حمل", desc: "سفارش به پیک یا پست سپرده می‌شود و کد رهگیری برایتان پیامک می‌شود." },
  { icon: MapPin, title: "در مسیر", desc: "مرسوله به سمت آدرس شما حرکت می‌کند و وضعیت آن قابل پیگیری است." },
  { icon: Home, title: "تحویل درب منزل", desc: "سفارش را دریافت کنید و از خریدتان لذت ببرید!" },
];

export default function ShippingPage() {
  return (
    <div className="container-elora py-6 lg:py-10">
      <Breadcrumb items={[{ label: "رویه ارسال" }]} />
      <div className="mx-auto max-w-4xl">
        <header className="rounded-[2rem] bg-gradient-to-l from-blush via-white to-lilac-soft/60 p-7 ring-1 ring-rose-100 sm:p-10">
          <h1 className="text-xl font-black text-foreground sm:text-2xl">رویه ارسال سفارش‌ها</h1>
          <p className="mt-3 max-w-2xl text-[0.84rem] leading-8 text-secondary-foreground">
            در اِلورا، ارسال سفارش‌ها با دقت و سرعت انجام می‌شود تا محصولات زیبایی شما
            سالم و به‌موقع به دستتان برسند. در ادامه با روش‌های ارسال، زمان تحویل،
            شرایط مرجوعی و شیوه پرداخت آشنا می‌شوید.
          </p>
        </header>

        {/* process steps */}
        <section className="mt-10">
          <h2 className="mb-6 flex items-center gap-2.5 text-lg font-black text-foreground">
            <Truck className="size-5 text-primary" />
            فرایند ارسال؛ گام‌به‌گام
          </h2>
          <ol className="relative space-y-5 border-r-2 border-dashed border-rose-200 pr-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="absolute -right-[38px] grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-lilac text-white shadow-md">
                  <s.icon size={17} />
                </span>
                <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
                  <h3 className="text-[0.9rem] font-black text-foreground">
                    {i + 1}. {s.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8rem] leading-7 text-secondary-foreground">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* methods & time */}
        <section className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-[0.95rem] font-black text-foreground">
              <Clock3 className="size-4.5 text-primary" />
              زمان تحویل
            </h3>
            <ul className="mt-4 space-y-3 text-[0.8rem] leading-7 text-secondary-foreground">
              <li className="flex justify-between border-b border-dashed border-rose-100 pb-2.5">
                <span>تهران و کرج</span>
                <span className="font-bold text-foreground">۱ تا ۲ روز کاری</span>
              </li>
              <li className="flex justify-between border-b border-dashed border-rose-100 pb-2.5">
                <span>مراکز استان‌ها</span>
                <span className="font-bold text-foreground">۲ تا ۳ روز کاری</span>
              </li>
              <li className="flex justify-between">
                <span>سایر شهرها</span>
                <span className="font-bold text-foreground">۳ تا ۴ روز کاری</span>
              </li>
            </ul>
            <p className="mt-4 rounded-xl bg-amber-50 p-3 text-[0.7rem] leading-6 text-amber-700">
              سفارش‌هایی که تا ساعت ۱۳:۰۰ ثبت شوند، همان روز پردازش و ارسال می‌شوند.
            </p>
          </div>

          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-[0.95rem] font-black text-foreground">
              <Truck className="size-4.5 text-primary" />
              روش‌های ارسال
            </h3>
            <ul className="mt-4 space-y-3 text-[0.8rem] leading-7 text-secondary-foreground">
              <li className="flex justify-between border-b border-dashed border-rose-100 pb-2.5">
                <span>پیک موتوری (تهران)</span>
                <span className="font-bold text-foreground">۴۹,۰۰۰ تومان</span>
              </li>
              <li className="flex justify-between border-b border-dashed border-rose-100 pb-2.5">
                <span>پست پیشتاز</span>
                <span className="font-bold text-foreground">۶۹,۰۰۰ تومان</span>
              </li>
              <li className="flex justify-between border-b border-dashed border-rose-100 pb-2.5">
                <span>تیپاکس (پس‌کرایه)</span>
                <span className="font-bold text-foreground">طبقه تعرفه</span>
              </li>
              <li className="flex justify-between text-emerald-600">
                <span>خرید بالای ۵,۰۰۰,۰۰۰ تومان</span>
                <span className="font-bold">ارسال رایگان</span>
              </li>
            </ul>
          </div>
        </section>

        {/* conditions */}
        <section id="returns" className="mt-12 scroll-mt-24">
          <h2 className="mb-6 flex items-center gap-2.5 text-lg font-black text-foreground">
            <ShieldCheck className="size-5 text-primary" />
            شرایط و قوانین ارسال و مرجوعی
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ConditionCard
              icon={<RotateCcw className="size-5" />}
              title="۷ روز ضمانت بازگشت"
              desc="تا ۷ روز پس از تحویل، در صورت باز نشدن پلمب بهداشتی، می‌توانید کالا را مرجوع کنید. هزینه ارسال مرجوعی در صورت ایراد کالا بر عهده‌ی اِلورا است."
            />
            <ConditionCard
              icon={<ShieldCheck className="size-5" />}
              title="ضمانت اصالت کالا"
              desc="همه‌ی محصولات اِلورا اورجینال هستند و از تأمین‌کنندگان معتبر تأمین می‌شوند. در صورت اثبات غیراصل بودن، مبلغ کامل بازگردانده می‌شود."
            />
            <ConditionCard
              icon={<PackageCheck className="size-5" />}
              title="بسته‌بندی بهداشتی"
              desc="محصولات مایع و آرایشی با دورپیچ و بسته‌بندی ضدنشتی ارسال می‌شوند تا سلامت کالا در تمام مسیر حفظ شود."
            />
            <ConditionCard
              icon={<CreditCard className="size-5" />}
              id="payment"
              title="شیوه پرداخت"
              desc="پرداخت آنلاین از طریق درگاه امن بانکی انجام می‌شود. در سفارش‌های تیپاکس، امکان پرداخت درب منزل (پس‌کرایه) نیز فراهم است."
            />
          </div>
        </section>

        <section id="how" className="mt-12 scroll-mt-24 rounded-3xl bg-gradient-to-l from-lilac-soft/70 to-white p-6 ring-1 ring-rose-100 sm:p-8">
          <h2 className="text-[0.95rem] font-black text-foreground">چطور سفارش ثبت کنم؟</h2>
          <ol className="mt-4 grid grid-cols-1 gap-3 text-[0.8rem] leading-7 text-secondary-foreground sm:grid-cols-2">
            <li className="rounded-2xl bg-white/80 p-4">۱. محصول موردنظر را انتخاب و به سبد خرید اضافه کنید.</li>
            <li className="rounded-2xl bg-white/80 p-4">۲. در صورت داشتن کد تخفیف، آن را در سبد اعمال کنید.</li>
            <li className="rounded-2xl bg-white/80 p-4">۳. وارد حساب شوید و آدرس تحویل را انتخاب کنید.</li>
            <li className="rounded-2xl bg-white/80 p-4">۴. پرداخت آنلاین و ثبت نهایی سفارش؛ باقی کار با ما!</li>
          </ol>
        </section>
      </div>
    </div>
  );
}

function ConditionCard({
  icon, title, desc, id,
}: {
  icon: React.ReactNode; title: string; desc: string; id?: string;
}) {
  return (
    <div id={id} className="scroll-mt-24 rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
      <span className="grid size-11 place-items-center rounded-2xl bg-rose-50 text-primary">{icon}</span>
      <h3 className="mt-4 text-[0.88rem] font-black text-foreground">{title}</h3>
      <p className="mt-2 text-[0.78rem] leading-7 text-secondary-foreground">{desc}</p>
    </div>
  );
}
