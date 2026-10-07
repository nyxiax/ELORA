"use client";

import { useState } from "react";
import {
  Phone, Mail, MapPin, Instagram, Send, MessageCircle, SendHorizonal, Clock3,
} from "lucide-react";
import { Breadcrumb } from "@/components/elora/breadcrumb";
import { Button } from "@/components/ui/button";
import { SUPPORT_PHONE, SUPPORT_PHONE_FA, CONTACT_EMAIL } from "@/lib/data/misc";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState("");

  const submit = () => {
    if (form.name.trim().length < 3) return setError("نام خود را وارد کنید.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("ایمیل معتبر وارد کنید.");
    if (form.message.trim().length < 10) return setError("پیام شما باید حداقل ۱۰ کاراکتر باشد.");
    setError("");
    toast.success("پیام شما با موفقیت ارسال شد. به‌زودی پاسخ می‌دهیم!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container-elora py-6 lg:py-10">
      <Breadcrumb items={[{ label: "تماس با ما" }]} />
      <div className="mx-auto max-w-5xl">
        <header className="rounded-[2rem] bg-gradient-to-l from-blush via-white to-lilac-soft/60 p-7 ring-1 ring-rose-100 sm:p-10">
          <h1 className="text-xl font-black text-foreground sm:text-2xl">تماس با ما</h1>
          <p className="mt-3 max-w-2xl text-[0.84rem] leading-8 text-secondary-foreground">
            سوال، پیشنهاد یا انتقادی دارید؟ تیم پشتیبانی اِلورا هر روز هفته پاسخگوی شما
            است. از طریق فرم زیر یا راه‌های ارتباطی، با ما در تماس باشید.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          {/* form */}
          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-[0.95rem] font-black text-foreground">فرم تماس</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[0.78rem] font-bold text-foreground">نام</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="نام و نام خانوادگی"
                  className={inp}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[0.78rem] font-bold text-foreground">ایمیل</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="example@mail.com"
                  dir="ltr"
                  className={`${inp} text-left`}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[0.78rem] font-bold text-foreground">موضوع</label>
                <input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="موضوع پیام"
                  className={inp}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[0.78rem] font-bold text-foreground">پیام</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  placeholder="پیام خود را بنویسید…"
                  className={`${inp} h-auto py-3`}
                />
              </div>
            </div>
            {error && <p className="mt-3 text-[0.75rem] font-bold text-rose-500">{error}</p>}
            <Button
              onClick={submit}
              className="mt-5 h-12 w-full rounded-2xl bg-gradient-to-l from-primary to-[#c2476f] text-[0.88rem] font-bold shadow-md shadow-rose-200 sm:w-48"
            >
              <SendHorizonal size={16} className="ml-1" />
              ارسال پیام
            </Button>
          </div>

          {/* info */}
          <aside className="space-y-4">
            <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-[0.9rem] font-black text-foreground">راه‌های ارتباطی</h3>
              <ul className="space-y-3.5 text-[0.8rem] text-secondary-foreground">
                <li className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-rose-50 text-primary">
                    <Phone size={15} />
                  </span>
                  <a href={`tel:${SUPPORT_PHONE}`} dir="ltr" className="font-bold hover:text-primary">
                    {SUPPORT_PHONE_FA}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-rose-50 text-primary">
                    <Mail size={15} />
                  </span>
                  <a href={`mailto:${CONTACT_EMAIL}`} dir="ltr" className="font-bold hover:text-primary">
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-rose-50 text-primary">
                    <MapPin size={15} />
                  </span>
                  <span className="leading-7">
                    تهران، خیابان ولیعصر، بالاتر از پارک ساعی،
                    برج زیبایی اِلورا، طبقه ۵
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-rose-50 text-primary">
                    <Clock3 size={15} />
                  </span>
                  <span>شنبه تا پنجشنبه، ۹ تا ۱۸</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-[0.9rem] font-black text-foreground">ما را دنبال کنید</h3>
              <div className="grid grid-cols-3 gap-2.5">
                <SocialCard href="https://instagram.com" icon={<Instagram size={18} />} label="اینستاگرام" />
                <SocialCard href="https://telegram.org" icon={<Send size={18} />} label="تلگرام" />
                <SocialCard href="https://wa.me/989120000000" icon={<MessageCircle size={18} />} label="واتساپ" />
              </div>
            </div>

            {/* mock map */}
            <div className="relative grid h-44 place-items-center overflow-hidden rounded-3xl border border-dashed border-rose-200 bg-gradient-to-bl from-rose-50 to-lilac-soft">
              <MapPin className="size-8 text-primary" />
              <p className="mt-2 text-[0.7rem] text-muted-foreground">نقشه موقعیت دفتر (نمایشی)</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

const inp =
  "h-12 w-full rounded-2xl border border-rose-100 bg-rose-50/40 px-4 text-[0.85rem] outline-none transition-all placeholder:text-muted-foreground/60 focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100";

function SocialCard({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col items-center gap-2 rounded-2xl border border-rose-100 bg-rose-50/50 py-4 text-[0.68rem] font-bold text-secondary-foreground transition-all hover:-translate-y-0.5 hover:bg-rose-50 hover:text-primary"
    >
      <span className="text-primary">{icon}</span>
      {label}
    </a>
  );
}
