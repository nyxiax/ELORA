/**
 * ELORA — deterministic catalog generator (req 41/55).
 * Fills every subcategory of the mega-menu taxonomy that has no hand-written
 * product yet, so no category link ever leads to an empty listing.
 * Fully deterministic (seeded by slug) → stable prices/ratings across reloads.
 */
import { Product } from "@/lib/types";
import { CATEGORIES } from "@/lib/data/categories";
import { img } from "@/lib/data/images";

/* ─── Persian brand names ─── */
const BRAND_FA: Record<string, string> = {
  maybelline: "مِیبلین", mac: "مک", "rare-beauty": "ریر بیوتی",
  "fenty-beauty": "فنتی بیوتی", nars: "نارس", benefit: "بنفیت",
  dior: "دیور", note: "نوت", yorn: "یورن", "beauty-of-joseon": "بیوتی آو جوسون",
  "la-roche-posay": "لا روش پوزه", "the-ordinary": "آردینری", cosrx: "کاسموس آر ایکس",
  cerave: "سراوی", numbuzin: "نامبوزین", axisy: "اکسی‌وای", centella: "سنتلا",
  bioderma: "بیودرم", fino: "شیسیدو فینو", loreal: "لورآل",
  kerastase: "کراستاز", vitaplex: "ویتاپلکس", "victorias-secret": "ویکتوریا سیکرت",
  sericate: "سریکات", "diva-pro": "دیوا پرو", remington: "رمینگتون",
  philips: "فیلیپس", braun: "براون", rio: "ریو",
  "elora-care": "اِلورا کر", "elora-tools": "اِلورا تولز",
};

/* ─── per-group configuration ─── */
interface GroupCfg {
  brands: string[];
  price: [number, number];
  imgs: string[];
  volumes: string[];
  madeIn: string[];
  feats: string[];
  skin?: boolean;
  hair?: boolean;
}

const CFG: Record<string, GroupCfg> = {
  "آرایش صورت": {
    brands: ["note", "maybelline", "mac", "nars", "rare-beauty", "fenty-beauty"],
    price: [450000, 2800000], imgs: ["maybelline_foundation", "makeup_flatlay", "nars"],
    volumes: ["۳۰ میلی‌لیتر", "۳۵ میلی‌لیتر", "۱۵ میلی‌لیتر", "۱۲ گرم"],
    madeIn: ["فرانسه", "آمریکا", "ایتالیا", "ترکیه"],
    feats: ["پوشانندگی بالا و ماندگاری طولانی", "بافت سبک با فینیش طبیعی", "مناسب استفاده‌ی روزانه", "غنی از ویتامین E", "ایده‌آل برای آرایش حرفه‌ای", "بدون حس سنگینی روی پوست", "مناسب انواع پوست", "بسته‌بندی شیک و کاربردی"],
    skin: true,
  },
  "آرایش چشم": {
    brands: ["maybelline", "mac", "nars", "benefit", "yorn", "rare-beauty"],
    price: [350000, 2200000], imgs: ["maybelline_mascara", "eyeshadow"],
    volumes: ["۱۰ میلی‌لیتر", "۸ گرم", "۶ گرم", "۱۲ گرم"],
    madeIn: ["آمریکا", "فرانسه", "ایتالیا", "لهستان"],
    feats: ["ماندگاری بالا بدون پخش شدن", "فرمول ضدآب و مقاوم", "رنگدانه‌های غنی و پرپیگمنت", "برس دقیق و کاربردی", "مناسب استفاده‌ی روزانه و مجالس", "حجم‌دهنده و بلندکننده", "بدون آزار چشم‌های حساس"],
    skin: true,
  },
  "آرایش ابرو": {
    brands: ["benefit", "maybelline", "yorn", "note"],
    price: [250000, 950000], imgs: ["makeup_flatlay", "brushes"],
    volumes: ["۱ گرم", "۵ میلی‌لیتر", "۱ عدد"],
    madeIn: ["آمریکا", "فرانسه", "ایتالیا"],
    feats: ["فرمول نرم و قابل ترکیب", "رنگدانه غنی با ماندگاری بالا", "مناسب فرم‌دهی طبیعی ابرو", "حاوی مواد تقویت‌کننده‌ی موی ابرو", "پخش آسان و یکنواخت", "ثبت سریع بدون سفت شدن"],
  },
  "آرایش لب": {
    brands: ["mac", "maybelline", "fenty-beauty", "nars", "rare-beauty", "note"],
    price: [320000, 1900000], imgs: ["lipstick_set", "mac_lipstick", "blog_lips"],
    volumes: ["۳/۵ گرم", "۶ میلی‌لیتر", "۴ گرم", "۸ میلی‌لیتر"],
    madeIn: ["فرانسه", "ایتالیا", "آمریکا", "لهستان"],
    feats: ["ماندگاری بالا با پوشش کامل", "بافت مخملی و سبک", "حاوی روغن‌های مرطوب‌کننده", "رنگدانه‌های پررنگ و وایرال", "با خواص نرم‌کنندگی لب", "فینیش مات و لطیف", "فینیش براق و جذاب"],
  },
  "ناخن": {
    brands: ["note", "yorn", "maybelline"],
    price: [150000, 780000], imgs: ["nail_polish"],
    volumes: ["۱۰ میلی‌لیتر", "۱۲ میلی‌لیتر", "۱ عدد"],
    madeIn: ["لهستان", "ایتالیا", "ترکیه"],
    feats: ["ماندگاری بالا و بدون پوسته شدن", "خشک شدن سریع", "براقیت بالا", "حاوی مواد تقویت‌کننده‌ی ناخن", "قلم دقیق برای پوشش یکنواخت", "فرمول ملایم بدون بوی تند"],
  },
  "ابزار آرایشی": {
    brands: ["elora-tools", "yorn"],
    price: [120000, 950000], imgs: ["brushes", "makeup_flatlay"],
    volumes: ["۱ عدد", "ست ۵ عددی", "ست ۱۲ عددی"],
    madeIn: ["چین", "ژاپن", "کره جنوبی"],
    feats: ["کیفیت حرفه‌ای برای استفاده‌ی روزانه", "مواد نرم و مناسب پوست", "طراحی ارگونومیک", "قابل شستشو و بادوام", "بسته‌بندی مناسب سفر"],
  },
  "مراقبت پوست": {
    brands: ["la-roche-posay", "cerave", "cosrx", "the-ordinary", "numbuzin", "beauty-of-joseon", "axisy", "centella", "bioderma"],
    price: [380000, 3200000], imgs: ["skincare_flatlay", "hero_skincare", "moisturizer", "cleanser", "toner", "lrp_serum", "boj_sunscreen", "numbu", "cosrx", "ordinary", "axisy", "cerave"],
    volumes: ["۳۰ میلی‌لیتر", "۵۰ میلی‌لیتر", "۲۰۰ میلی‌لیتر", "۸۰ میلی‌لیتر"],
    madeIn: ["فرانسه", "کره جنوبی", "آمریکا", "آلمان", "اسپانیا"],
    feats: ["با pH متعادل و بدون سولفات", "آبرسانی عمیق و ماندگار", "مناسب استفاده‌ی روزانه صبح و شب", "غنی از آنتی‌اکسیدان و ویتامین", "فرمول ملایم برای پوست حساس", "جذب سریع بدون حس چربی", "با عصاره‌های گیاهی طبیعی", "کمک به ترمیم سد دفاعی پوست"],
    skin: true,
  },
  "مراقبت مو": {
    brands: ["fino", "loreal", "kerastase", "vitaplex"],
    price: [420000, 2900000], imgs: ["fino", "vitaplex", "loreal_shampoo"],
    volumes: ["۲۵۰ میلی‌لیتر", "۴۰۰ میلی‌لیتر", "۵۰۰ میلی‌لیتر", "۲۰۰ میلی‌لیتر"],
    madeIn: ["ژاپن", "فرانسه", "اسپانیا", "ایتالیا"],
    feats: ["تغذیه‌ی عمیق از ریشه تا نوک", "بدون سولفات و پارابن", "افزایش نرمی و درخشش", "کاهش وز و شکستگی مو", "با روغن‌های مغذی گیاهی", "محافظت در برابر حرارت", "تقویت موهای ضعیف و آسیب‌دیده"],
    hair: true,
  },
  "مراقبت بدن": {
    brands: ["bioderma", "cerave", "la-roche-posay", "vitaplex"],
    price: [220000, 1500000], imgs: ["body_lotion", "moisturizer"],
    volumes: ["۲۰۰ میلی‌لیتر", "۴۰۰ میلی‌لیتر", "۲۵۰ میلی‌لیتر"],
    madeIn: ["فرانسه", "آلمان", "اسپانیا"],
    feats: ["رطوبت‌رسانی عمیق و ۲۴ ساعته", "جذب سریع بدون حس چربی", "با رایحه‌ی ملایم و دلنشین", "مناسب پوست خشک و حساس", "غنی از کره شی و ویتامین E", "نرمی و لطافت روزافزون پوست"],
  },
  "مراقبت لب": {
    brands: ["bioderma", "cerave", "note", "vitaplex"],
    price: [120000, 690000], imgs: ["blog_lips", "lipstick_set"],
    volumes: ["۱۰ میلی‌لیتر", "۵ گرم", "۱۵ میلی‌لیتر"],
    madeIn: ["فرانسه", "آلمان", "ایتالیا"],
    feats: ["مرطوب‌کننده و ترمیم‌کننده‌ی لب", "با ویتامین E و روغن آرگان", "مناسب لب‌های خشک و ترک‌خورده", "ماندگاری بالا و بافت لطیف"],
  },
  "دهان و دندان": {
    brands: ["elora-care"],
    price: [85000, 420000], imgs: ["cleanser", "body_lotion"],
    volumes: ["۷۵ میلی‌لیتر", "۱۰۰ میلی‌لیتر", "۱ عدد", "بسته ۲ عددی"],
    madeIn: ["آلمان", "ترکیه", "چین"],
    feats: ["با فلوراید فعال برای محافظت از مینا", "خنکی و طراوت طولانی‌مدت", "فرمول ملایم بدون آسیب به مینا", "کمک به سلامت لثه", "مناسب استفاده‌ی روزانه"],
  },
  "بهداشت شخصی": {
    brands: ["elora-care", "bioderma"],
    price: [95000, 520000], imgs: ["body_lotion", "cleanser"],
    volumes: ["۱۰۰ میلی‌لیتر", "۲۵۰ میلی‌لیتر", "بسته ۱۰ عددی"],
    madeIn: ["آلمان", "ترکیه", "چین"],
    feats: ["فرمول ملایم و بدون الکل", "مناسب استفاده‌ی روزانه", "با pH متعادل", "بافت لطیف و دلنشین"],
  },
  "مراقبت دست و پا": {
    brands: ["cerave", "elora-care", "vitaplex"],
    price: [110000, 780000], imgs: ["body_lotion", "moisturizer"],
    volumes: ["۵۰ میلی‌لیتر", "۱۰۰ میلی‌لیتر", "۷۵ میلی‌لیتر"],
    madeIn: ["فرانسه", "آلمان", "اسپانیا"],
    feats: ["ترمیم‌کننده و نرم‌کننده‌ی عمیق", "با کره شی و اوره", "مناسب پوست خشک و ترک‌خورده", "جذب سریع بدون چربی"],
  },
  "عطر و ادکلن": {
    brands: ["dior", "victorias-secret"],
    price: [1600000, 6900000], imgs: ["dior_parfum", "perfume_pink"],
    volumes: ["۳۰ میلی‌لیتر", "۵۰ میلی‌لیتر", "۱۰۰ میلی‌لیتر"],
    madeIn: ["فرانسه", "آمریکا"],
    feats: ["ماندگاری بالای رایحه در طول روز", "نت‌های آغازی، میانی و پایانی متعادل", "طراحی‌شده توسط عطرسازان معتبر", "بسته‌بندی شیک و لوکس", "رایحه‌ای ملایم و ماندگار"],
  },
  "رایحه بدن": {
    brands: ["victorias-secret", "dior"],
    price: [550000, 3100000], imgs: ["vs_mist", "perfume_pink"],
    volumes: ["۲۵۰ میلی‌لیتر", "۱۵۰ میلی‌لیتر", "۱۰۰ میلی‌لیتر"],
    madeIn: ["آمریکا", "فرانسه"],
    feats: ["رایحه‌ی ملایم و ماندگار", "بافت سبک و خنک", "مناسب استفاده‌ی روزانه", "با عصاره‌های مرطوب‌کننده"],
  },
  "محصولات مکمل رایحه": {
    brands: ["victorias-secret", "dior"],
    price: [480000, 2600000], imgs: ["body_lotion", "perfume_pink"],
    volumes: ["۲۰۰ میلی‌لیتر", "ست ۳ عددی", "۳۰۰ میلی‌لیتر"],
    madeIn: ["آمریکا", "فرانسه"],
    feats: ["رایحه‌ی هماهنگ با عطر مورد علاقه", "مرطوب‌کننده و معطر همزمان", "انتخابی عالی برای ست هدیه", "بسته‌بندی لوکس"],
  },
  "حالت‌دهی مو": {
    brands: ["remington", "diva-pro", "philips", "braun"],
    price: [1200000, 6900000], imgs: ["hair_dryer", "straightener"],
    volumes: ["۱۹۰۰ وات", "۲۲۰۰ وات", "۲۴۰۰ وات", "قابل شارژ USB"],
    madeIn: ["چین", "هلند", "آلمان", "انگلستان"],
    feats: ["موتور قدرتمند و کم‌صدا", "تنظیمات چندگانه‌ی دما و سرعت", "پوشش سرامیک و یونیزه", "محافظت در برابر آسیب حرارتی", "طراحی ارگونومیک و سبک", "مناسب استفاده‌ی حرفه‌ای سالن"],
  },
  "اصلاح خانم‌ها": {
    brands: ["philips", "braun", "remington", "rio"],
    price: [900000, 4800000], imgs: ["epilator", "men_shaver"],
    volumes: ["قابل شارژ USB", "باطری لیتیومی", "۵ حالت تنظیم", "ضدآب IPX7"],
    madeIn: ["هلند", "آلمان", "چین"],
    feats: ["اصلاح دقیق و بدون درد", "قابل استفاده در زیر دوش", "مقاوم در برابر آب", "تیغه‌های حساس به پوست", "شارژ سریع و باتری ماندگار"],
  },
  "اصلاح آقایان": {
    brands: ["braun", "philips", "remington"],
    price: [1100000, 6500000], imgs: ["men_shaver"],
    volumes: ["قابل شارژ USB", "ضدآب", "۱۰ حالت تنظیم طول", "باطری لیتیومی"],
    madeIn: ["آلمان", "هلند", "چین"],
    feats: ["تیغه‌های تیز و ماندگار", "شستشوی آسان زیر آب", "باتری ماندگار با شارژ سریع", "حالت‌های مختلف اصلاح", "طراحی ارگونومیک"],
  },
  "مراقبت برقی پوست": {
    brands: ["yorn", "rio", "philips"],
    price: [700000, 3500000], imgs: ["skincare_flatlay", "straightener"],
    volumes: ["قابل شارژ USB", "۱ عدد + ۲ سر تعویضی", "ضدآب"],
    madeIn: ["چین", "هلند", "ژاپن"],
    feats: ["فناوری لرزشی برای جذب بهتر محصولات", "مناسب انواع پوست", "سرهای قابل تعویض", "قابل شستشو و ضدآب", "شارژ USB"],
  },
};

const MODELS = ["کلاسیک", "پلاس", "پرو", "سافت", "دلوکس", "مینی", "جدید"];
const SKIN_POOL = ["چرب", "خشک", "مختلط", "حساس"];
const HAIR_POOL = ["خشک", "چرب", "فر", "رنگ‌شده", "معمولی"];

/* ─── deterministic RNG ─── */
function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const round10k = (n: number) => Math.max(10000, Math.round(n / 10000) * 10000);
const pick = <T,>(arr: T[], r: number): T => arr[Math.floor(r * arr.length) % arr.length];

/** build one generated product */
function build(
  cat: { slug: string }, groupTitle: string,
  sub: { name: string; slug: string }, idx: number
): Product {
  const cfg = CFG[groupTitle];
  const seed = hashStr(`${sub.slug}-${idx}`);
  const rnd = mulberry(seed);

  const brandSlug = pick(cfg.brands, rnd());
  const brandFa = BRAND_FA[brandSlug] || brandSlug;
  const model = pick(MODELS, rnd());
  const feat = pick(cfg.feats, rnd());
  const feat2 = pick(cfg.feats, rnd());

  // varied, natural-looking names
  const name =
    idx % 3 === 0 ? `${sub.name} ${brandFa} — ${feat}`
    : idx % 3 === 1 ? `${sub.name} ${brandFa} ${model}`
    : `${sub.name} ${brandFa} ${feat2}`;

  const price = round10k(cfg.price[0] + rnd() * (cfg.price[1] - cfg.price[0]));
  const hasOld = rnd() < 0.38;
  const offPct = 0.12 + rnd() * 0.3;
  const oldPrice = hasOld ? round10k(price / (1 - offPct)) : undefined;

  const rating = Math.round((4.1 + rnd() * 0.8) * 10) / 10;
  const reviewCount = Math.round(24 + rnd() * 800);

  const key = pick(cfg.imgs, rnd());
  const i0 = Math.floor(rnd() * 4);
  const images = [img(key, i0), img(key, i0 + 1)].filter(Boolean);

  const isElectric = cat.slug === "electric";
  const volume = isElectric ? pick(cfg.volumes, rnd()) : pick(cfg.volumes, rnd());
  const madeIn = pick(cfg.madeIn, rnd());

  let skinTypes: string[] | undefined;
  let hairTypes: string[] | undefined;
  let suitable = "استفاده‌ی روزانه";
  if (cfg.skin) {
    const a = pick(SKIN_POOL, rnd());
    const b = pick(SKIN_POOL, rnd());
    skinTypes = rnd() < 0.45 ? [a, b].filter((v, i, s) => s.indexOf(v) === i) : [a];
    suitable = `پوست ${skinTypes.join(" و ")}`;
  } else if (cfg.hair) {
    const a = pick(HAIR_POOL, rnd());
    hairTypes = [a];
    suitable = `موی ${a}`;
  }

  const tags: Product["tags"] = [];
  const t = rnd();
  if (t < 0.18) tags.push("new");
  else if (t < 0.32) tags.push("trending");
  else if (t < 0.42) tags.push("week");

  const short = `${sub.name} ${brandFa} با ${feat2}؛ انتخابی مطمئن و باکیفیت برای استفاده‌ی روزانه.`;

  return {
    id: `${sub.slug}-g${idx}`,
    name,
    brandSlug,
    category: cat.slug,
    group: groupTitle,
    sub: sub.name,
    subSlug: sub.slug,
    price,
    oldPrice,
    rating,
    reviewCount,
    images: images.length ? images : [],
    short,
    description: [
      `${name} یکی از گزینه‌های محبوب در دسته‌ی «${sub.name}» است که برای ${suitable} طراحی شده و با فرمولاسیونی باکیفیت، تجربه‌ای لذت‌بخش در روتین روزانه شما می‌سازد.`,
      `این محصول با استانداردهای کنترل کیفیت عرضه می‌شود و در کنار محصولات مکمل همان دسته، نتیجه‌ی بهتری خواهد داشت. بسته‌بندی شیک و اصل بودن کالا در اِلورا تضمین می‌شود.`,
    ],
    howToUse: [
      "پیش از استفاده، پوست یا موی خود را تمیز و آماده کنید.",
      "مقدار مناسبی از محصول را مطابق راهنمای روی بسته‌بندی بردارید.",
      "به‌آرامی و با حرکات ملایم، محصول را روی ناحیه‌ی موردنظر قرار دهید.",
      "برای نتیجه‌ی بهتر، استفاده را به‌صورت منظم ادامه دهید.",
    ],
    specs: [
      { label: "نوع محصول", value: sub.name },
      { label: "برند", value: brandFa },
      { label: "مناسب برای", value: suitable },
      { label: isElectric ? "مشخصات فنی" : "حجم / سایز", value: volume },
      { label: "کشور سازنده", value: madeIn },
    ],
    skinTypes,
    hairTypes,
    keywords: [sub.name, brandFa, name, feat2, groupTitle],
    tags: tags.length ? tags : undefined,
    imageTint: key,
  };
}

/** generate products so that every subcategory ends up with at least 3 items */
export function generateProducts(countBySub: Record<string, number>): Product[] {
  const out: Product[] = [];
  for (const cat of CATEGORIES) {
    for (const group of cat.groups) {
      const cfg = CFG[group.title];
      if (!cfg) continue;
      for (const sub of group.subs) {
        const have = countBySub[sub.slug] || 0;
        for (let i = have; i < 3; i++) out.push(build(cat, group.title, sub, i));
      }
    }
  }
  return out;
}
