import { Brand } from "@/lib/types";

export const BRANDS: Brand[] = [
  { name: "NARS", slug: "nars", country: "آمریکا", tagline: "آرایش حرفه‌ای با روحیة جسورانه" },
  { name: "Numbuzin", slug: "numbuzin", country: "کره جنوبی", tagline: "پاسخ عددی به نیاز پوست" },
  { name: "MAC", slug: "mac", country: "کانادا", tagline: "رنگ‌های حرفه‌ای برای همه" },
  { name: "Benefit", slug: "benefit", country: "آمریکا", tagline: "آرایش شاد و باحال" },
  { name: "Dior", slug: "dior", country: "فرانسه", tagline: "لوکس و جاودانه" },
  { name: "COSRX", slug: "cosrx", country: "کره جنوبی", tagline: "مراقبت مؤثر و ساده" },
  { name: "CeraVe", slug: "cerave", country: "آمریکا", tagline: "سرامیدها برای پوست سالم" },
  { name: "Maybelline", slug: "maybelline", country: "آمریکا", tagline: "آرایشی برای همه‌ی روزها" },
  { name: "L'Oréal", slug: "loreal", country: "فرانسه", tagline: "چون ارزشش را دارید" },
  { name: "Rare Beauty", slug: "rare-beauty", country: "آمریکا", tagline: "زیبایی کم‌نقص، خودِ شما" },
  { name: "Fenty Beauty", slug: "fenty-beauty", country: "آمریکا", tagline: "زیبایی برای همه" },
  { name: "The Ordinary", slug: "the-ordinary", country: "کانادا", tagline: "شیمی شفاف، قیمت منصفانه" },
  { name: "La Roche-Posay", slug: "la-roche-posay", country: "فرانسه", tagline: "پوست حساس، آرامش مطمئن" },
  { name: "Beauty of Joseon", slug: "beauty-of-joseon", country: "کره جنوبی", tagline: "الهام از کلاسیک‌های کره‌ای" },
  // more brands powering products
  { name: "Shiseido Fino", slug: "fino", country: "ژاپن", tagline: "تغذیه‌ی عمیق مو" },
  { name: "Elora Care", slug: "elora-care", tagline: "مراقبت روزانه با کیفیت مطمئن" },
  { name: "Elora Tools", slug: "elora-tools", tagline: "ابزارهای حرفه‌ای زیبایی" },
  { name: "AXIS-Y", slug: "axis-y", country: "کره جنوبی", tagline: "مراقبت متناسب با آب‌وهوا" },
  { name: "Victoria's Secret", slug: "victorias-secret", country: "آمریکا", tagline: "رایحه‌های جذاب بدن" },
  { name: "NOTE Cosmetics", slug: "note", country: "ترکیه", tagline: "زیبایی روزمره" },
  { name: "Sericate", slug: "sericate", country: "کره جنوبی", tagline: "آبرسانی با ابریشم" },
  { name: "Yorn", slug: "yorn", country: "ایران", tagline: "کیفیت قابل اعتماد" },
  { name: "Vitaplex", slug: "vitaplex", country: "ایتالیا", tagline: "ترمیم تخصصی مو" },
  { name: "Centella", slug: "centella", country: "کره جنوبی", tagline: "آرامش گیاهی پوست" },
  { name: "Diva Pro", slug: "diva-pro", country: "ایتالیا", tagline: "ابزار حرفه‌ای زیبایی" },
  { name: "Remington", slug: "remington", country: "آمریکا", tagline: "فناوری مو برای خانه" },
  { name: "Braun", slug: "braun", country: "آلمان", tagline: "دقت آلمانی" },
  { name: "Philips", slug: "philips", country: "هلند", tagline: "فناوری برای زندگی بهتر" },
  { name: "Kérastase", slug: "kerastase", country: "فرانسه", tagline: "لوکس‌ترین مراقبت مو" },
  { name: "Bioderma", slug: "bioderma", country: "فرانسه", tagline: "پوست شما، اولویت ما" },
  { name: "RiO", slug: "rio", country: "ایران", tagline: "رایحه‌های مدرن" },
];

export const FEATURED_BRAND_SLUGS = [
  "nars", "numbuzin", "mac", "benefit", "dior", "cosrx", "cerave",
  "maybelline", "loreal", "rare-beauty", "fenty-beauty", "the-ordinary",
  "la-roche-posay", "beauty-of-joseon",
];

export function findBrand(slug: string) {
  return BRANDS.find((b) => b.slug === slug) || null;
}
