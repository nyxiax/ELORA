import { Review } from "@/lib/types";

/** Seed reviews shown on product pages (local/user reviews merge in from localStorage) */
export const SEED_REVIEWS: Review[] = [
  // Fino
  { id: "r1", productId: "fino-hair-mask", user: "مریم احمدی", rating: 5, text: "واقعاً معجزه می‌کنه! بعد از دو بار استفاده موهام نرم‌تر از همیشه شد. بوی خوشمزه‌ای هم داره.", date: "2025-08-14" },
  { id: "r2", productId: "fino-hair-mask", user: "سارا محمدی", rating: 5, text: "سفارشم خیلی سریع رسید و بسته‌بندی محصول هم عالی بود. حتماً دوباره می‌خرم.", date: "2025-09-02" },
  { id: "r3", productId: "fino-hair-mask", user: "نگین کریمی", rating: 4, text: "برای موهای رنگ‌شده فوق‌العاده‌ست، فقط کاش حجمش بیشتر بود.", date: "2025-07-21" },
  // BOJ sunscreen
  { id: "r4", productId: "boj-relief-sunscreen", user: "الهام رضایی", rating: 5, text: "بهترین ضدآفتابی که تا حالا استفاده کردم. سفیدی نداره و زیر آرایش عالیه.", date: "2025-08-30" },
  { id: "r5", productId: "boj-relief-sunscreen", user: "فاطمه حسینی", rating: 5, text: "پوستم خیلی حساسه و تا حالا هیچ ضدآفتابی جواب نداده، ولی این هیچ مشکلی برام ایجاد نکرد.", date: "2025-09-10" },
  // Maybelline mascara
  { id: "r6", productId: "mayb-sky-high-mascara", user: "شیما موسوی", rating: 5, text: "مژه‌ها رو خیلی بلند می‌کنه و کلوخه هم نمی‌شه. ارزش خرید داره.", date: "2025-08-05" },
  { id: "r7", productId: "mayb-sky-high-mascara", user: "زهرا نوری", rating: 4, text: "خوبه ولی پاک کردنش یه کم سخته، در کل راضی هستم.", date: "2025-07-28" },
  // Rare Beauty
  { id: "r8", productId: "rare-soft-blush", user: "پریسا اکبری", rating: 5, text: "یک قطره برای هر دو گونه کافیه! رنگش طبیعیه و خیلی وقت دوام میاره.", date: "2025-09-01" },
  // CeraVe
  { id: "r9", productId: "cerave-moisturizing-cream", user: "درسا صادقی", rating: 5, text: "برای پوست خشک زمستونم عالیه، صورت و بدن با هم استفاده می‌کنم.", date: "2025-08-19" },
  { id: "r10", productId: "cerave-moisturizing-cream", user: "مینا جعفری", rating: 4, text: "کرم خوبیه ولی بوی خاصی نداره؛ در عوض خیلی ملایمه.", date: "2025-07-15" },
  // LRP serum
  { id: "r11", productId: "lrp-hyalu-b5-serum", user: "آیدا شریفی", rating: 5, text: "بعد از دو هفته خطوط ریز دور چشمم کمتر شده. پوستم همیشه آبرسانی داره.", date: "2025-08-25" },
  // VS mist
  { id: "r12", productId: "vs-pure-seduction-mist", user: "نیلوفر قاسمی", rating: 5, text: "بوش فوق‌العاده‌ست و تمام روز باهام می‌مونه. قیمت با تخفیف هم واقعاً منصفانه بود.", date: "2025-09-08" },
  { id: "r13", productId: "vs-pure-seduction-mist", user: "رها امینی", rating: 4, text: "خنک و خوشبوئه، برای تابستون بی‌نظیره.", date: "2025-08-11" },
  // AXIS-Y
  { id: "r14", productId: "axisy-dark-spot-serum", user: "ترانه ملکی", rating: 4, text: "جای جوش‌هام کم‌رنگ‌تر شده، باید صبور باشی ولی جواب می‌ده.", date: "2025-08-02" },
  // Ordinary
  { id: "r15", productId: "ordinary-niacinamide", user: "هستی کاظمی", rating: 5, text: "چربی پوستم خیلی کمتر شده. برای پوست چرب دم دخترها می‌گم.", date: "2025-07-30" },
  // COSRX
  { id: "r16", productId: "cosrx-snail-essence", user: "یاسمن فرهادی", rating: 5, text: "باورم نمی‌شد این‌قدر خوب باشه! پوستم شفاف‌تر و نرم‌تر شده.", date: "2025-08-22" },
  // Dyson hair dryer
  { id: "r17", productId: "diva-pro-hair-dryer", user: "سپیده رستمی", rating: 5, text: "سبک‌تر از چیزیه که فکر می‌کردم و موهام خیلی سریع‌تر خشک می‌شن.", date: "2025-09-03" },
  // Braun epilator
  { id: "r18", productId: "braun-silk-epil-9", user: "سمیرا خانی", rating: 4, text: "دستگاه خوبیه، در حمام استفاده‌ش دردش کمتره. نتیجه‌ش هم خیلی ماندگاره.", date: "2025-08-15" },
  // Philips shaver
  { id: "r19", productId: "philips-s5885-shaver", user: "بهنام رحیمی", rating: 5, text: "برای پوست حساس من بهترین گزینه بود، هیچ قرمزی ایجاد نمی‌کنه.", date: "2025-08-28" },
  // Dior
  { id: "r20", productId: "dior-jadore-parfum", user: "آیلار صدیقی", rating: 5, text: "بوی جادویی داره و ماندگاریش بالاست. بسته‌بندی هم خیلی شیک بود.", date: "2025-09-05" },
  // NOTE foundation
  { id: "r21", productId: "note-matte-foundation", user: "غزل عباسی", rating: 4, text: "پوشانندگی خوبی داره و برای پوست چرب من عالیه.", date: "2025-07-25" },
  // MAC
  { id: "r22", productId: "mac-retro-lipstick", user: "لیلا موسویان", rating: 5, text: "رنگ Ruby Woo روی هر پوستی می‌شینه. ماندگاریش واقعاً حرف نداره.", date: "2025-08-17" },
  // Sericate
  { id: "r23", productId: "sericate-hydrating-gel", user: "ماهک تهرانی", rating: 5, text: "ژل خنک و سبکه، برای صبح‌ها قبل ضدآفتاب عالیه.", date: "2025-08-09" },
  // L'Oreal shampoo
  { id: "r24", productId: "loreal-total-repair-shampoo", user: "روژین کریمیان", rating: 4, text: "بعد از چند بار استفاده موهام کمتر وز می‌کنن.", date: "2025-08-20" },
  // Centella
  { id: "r25", productId: "centella-calming-serum", user: "کیمیا سلطانی", rating: 5, text: "قرمزی پوستم را فوراً کم کرد. برای پوست حساس واقعاً پیشنهاد می‌کنم.", date: "2025-09-12" },
  // Vitaplex
  { id: "r26", productId: "vitaplex-repair-mask", user: "ندا بهرامی", rating: 5, text: "موهام بعد از دکلره خیلی آسیب دیده بود، این ماسک نجاتم داد.", date: "2025-08-26" },
  // Yorn mascara
  { id: "r27", productId: "yorn-volume-mascara", user: "دلارام یزدانی", rating: 4, text: "با این قیمت واقعاً عالیه، ضدآب هم هست.", date: "2025-07-18" },
  // BOJ & Numbuzin toner
  { id: "r28", productId: "numbu-no3-serum", user: "غزاله امیرخانی", rating: 4, text: "بافتش کمی غلیظه ولی درخشندگی پوستم رو بیشتر کرده.", date: "2025-08-31" },
  // Philips trimmer
  { id: "r29", productId: "philips-oneblade-trimmer", user: "امیرحسین مقدم", rating: 5, text: "دقیق و سبک. شانه‌های تنظیم طول خیلی به کارم اومد.", date: "2025-08-24" },
  // Bioderma
  { id: "r30", productId: "bioderma-micellar-water", user: "الهه صابری", rating: 5, text: "آرایش آب‌پایه رو کامل پاک می‌کنه و هیچ سوزشی نداره.", date: "2025-08-07" },
];

/** Generic fallback reviews for products without seeds */
const GENERIC_USERS = ["مریم احمدی", "سارا محمدی", "نگین کریمی", "الهام رضایی", "فاطمه حسینی", "شیما موسوی"];
const GENERIC_TEXTS = [
  "کیفیت محصول واقعاً بالاست و مطابق توضیحات سایت بود. ارسال هم سریع بود.",
  "خیلی راضی بودم از خرید. بسته‌بندی شیک و محکم داشت و اصل بودنش معلوم بود.",
  "برای استفاده‌ی روزانه عالیه و ارزش خریدش رو داره. پیشنهاد می‌کنم.",
  "محصول خوبی بود ولی انتظار داشتم نتیجه‌ی سریع‌تری ببینم. در کل راضی هستم.",
];

export function seedReviewsFor(productId: string): Review[] {
  const seeds = SEED_REVIEWS.filter((r) => r.productId === productId);
  if (seeds.length) return seeds;
  // deterministic pseudo-random assignment for the rest
  let h = 0;
  for (const c of productId) h = (h * 31 + c.charCodeAt(0)) % 9973;
  const count = 2 + (h % 2);
  const out: Review[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      id: `gen-${productId}-${i}`,
      productId,
      user: GENERIC_USERS[(h + i) % GENERIC_USERS.length],
      rating: 4 + ((h + i) % 2),
      text: GENERIC_TEXTS[(h + i * 2) % GENERIC_TEXTS.length],
      date: new Date(Date.now() - ((h % 40) + i * 9) * 86400000).toISOString().slice(0, 10),
    });
  }
  return out;
}
