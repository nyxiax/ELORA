import { TopCategory } from "@/lib/types";

/** Full ELORA category tree — drives mega menu, mobile accordion and listings */
export const CATEGORIES: TopCategory[] = [
  {
    name: "آرایشی",
    slug: "makeup",
    icon: "makeup",
    tint: "from-rose-100 via-pink-50 to-white",
    groups: [
      {
        title: "آرایش صورت",
        subs: [
          { name: "کرم پودر", slug: "foundation" },
          { name: "کانسیلر", slug: "concealer" },
          { name: "پنکیک", slug: "powder" },
          { name: "بی‌بی کرم", slug: "bb-cream" },
          { name: "سی‌سی کرم", slug: "cc-cream" },
          { name: "پرایمر", slug: "primer" },
          { name: "رژگونه", slug: "blush" },
          { name: "هایلایتر", slug: "highlighter" },
          { name: "کانتور", slug: "contour" },
          { name: "برنزر", slug: "bronzer" },
          { name: "فیکساتور", slug: "setting-spray" },
        ],
      },
      {
        title: "آرایش چشم",
        subs: [
          { name: "ریمل", slug: "mascara" },
          { name: "خط چشم", slug: "eyeliner" },
          { name: "سایه چشم", slug: "eyeshadow" },
          { name: "مژه مصنوعی", slug: "false-lashes" },
          { name: "چسب مژه", slug: "lash-glue" },
          { name: "مداد چشم", slug: "eye-pencil" },
        ],
      },
      {
        title: "آرایش ابرو",
        subs: [
          { name: "مداد ابرو", slug: "eyebrow-pencil" },
          { name: "ژل ابرو", slug: "brow-gel" },
          { name: "سایه ابرو", slug: "brow-shadow" },
          { name: "صابون ابرو", slug: "brow-soap" },
          { name: "ریمل ابرو", slug: "brow-mascara" },
        ],
      },
      {
        title: "آرایش لب",
        subs: [
          { name: "رژلب", slug: "lipstick" },
          { name: "رژلب مایع", slug: "liquid-lipstick" },
          { name: "تینت لب", slug: "lip-tint" },
          { name: "لیپ گلاس", slug: "lip-gloss" },
          { name: "خط لب", slug: "lip-liner" },
          { name: "بالم لب", slug: "lip-balm" },
          { name: "لیپ اویل", slug: "lip-oil" },
        ],
      },
      {
        title: "ناخن",
        subs: [
          { name: "لاک", slug: "nail-polish" },
          { name: "لاک ژل", slug: "gel-polish" },
          { name: "بیس‌کوت", slug: "base-coat" },
          { name: "تاپ‌کوت", slug: "top-coat" },
          { name: "تقویت‌کننده ناخن", slug: "nail-strengthener" },
          { name: "ابزار مانیکور و پدیکور", slug: "manicure-tools" },
        ],
      },
      {
        title: "ابزار آرایشی",
        subs: [
          { name: "براش آرایشی", slug: "makeup-brush" },
          { name: "پد آرایشی", slug: "makeup-pads" },
          { name: "اسفنج میکاپ", slug: "beauty-sponge" },
          { name: "آینه آرایشی", slug: "mirror" },
          { name: "فرمژه", slug: "eyelash-curler" },
          { name: "تراش آرایشی", slug: "makeup-razor" },
          { name: "کیف لوازم آرایش", slug: "makeup-bag" },
        ],
      },
    ],
  },
  {
    name: "بهداشتی و مراقبت",
    slug: "care",
    icon: "care",
    tint: "from-lilac-soft via-purple-50 to-white",
    groups: [
      {
        title: "مراقبت پوست",
        subs: [
          { name: "پاک‌کننده صورت", slug: "cleanser" },
          { name: "میسلار واتر", slug: "micellar-water" },
          { name: "ژل شستشوی صورت", slug: "face-wash" },
          { name: "فوم شستشو", slug: "face-foam" },
          { name: "تونر", slug: "toner" },
          { name: "سرم", slug: "serum" },
          { name: "مرطوب‌کننده", slug: "moisturizer" },
          { name: "آبرسان", slug: "hydrator" },
          { name: "ضدآفتاب", slug: "sunscreen" },
          { name: "کرم دور چشم", slug: "eye-cream" },
          { name: "ماسک صورت", slug: "face-mask" },
          { name: "لایه‌بردار", slug: "exfoliator" },
          { name: "اسکراب صورت", slug: "face-scrub" },
          { name: "محصولات ضدجوش", slug: "acne-care" },
          { name: "محصولات ضدلک", slug: "anti-spot" },
          { name: "محصولات ضدچروک", slug: "anti-wrinkle" },
          { name: "محصولات ترمیم‌کننده", slug: "skin-repair" },
          { name: "محصولات روشن‌کننده", slug: "brightening" },
          { name: "محصولات مخصوص پوست چرب", slug: "oily-skin" },
          { name: "محصولات مخصوص پوست خشک", slug: "dry-skin" },
          { name: "محصولات مخصوص پوست مختلط", slug: "combination-skin" },
          { name: "محصولات مخصوص پوست حساس", slug: "sensitive-skin" },
        ],
      },
      {
        title: "مراقبت مو",
        subs: [
          { name: "شامپو", slug: "shampoo" },
          { name: "نرم‌کننده", slug: "conditioner" },
          { name: "ماسک مو", slug: "hair-mask" },
          { name: "سرم مو", slug: "hair-serum" },
          { name: "روغن مو", slug: "hair-oil" },
          { name: "اسپری مو", slug: "hair-spray" },
          { name: "محافظ حرارتی", slug: "heat-protectant" },
          { name: "محصولات ضدریزش", slug: "anti-hair-loss" },
          { name: "محصولات ضدشوره", slug: "anti-dandruff" },
          { name: "محصولات موهای خشک", slug: "dry-hair" },
          { name: "محصولات موهای چرب", slug: "oily-hair" },
          { name: "محصولات موهای فر", slug: "curly-hair" },
          { name: "محصولات موهای رنگ‌شده", slug: "colored-hair" },
          { name: "محصولات ترمیم‌کننده مو", slug: "hair-repair" },
        ],
      },
      {
        title: "مراقبت بدن",
        subs: [
          { name: "لوسیون بدن", slug: "body-lotion" },
          { name: "کرم بدن", slug: "body-cream" },
          { name: "اسکراب بدن", slug: "body-scrub" },
          { name: "روغن بدن", slug: "body-oil" },
          { name: "کره بدن", slug: "body-butter" },
          { name: "شوینده بدن", slug: "body-wash" },
          { name: "ژل حمام", slug: "shower-gel" },
          { name: "کرم دست", slug: "hand-cream" },
          { name: "کرم پا", slug: "foot-cream" },
          { name: "محصولات ترک بدن", slug: "stretch-mark" },
        ],
      },
      {
        title: "مراقبت لب",
        subs: [
          { name: "بالم لب", slug: "lip-balm-care" },
          { name: "اسکراب لب", slug: "lip-scrub" },
          { name: "ماسک لب", slug: "lip-mask" },
          { name: "درمان خشکی لب", slug: "dry-lips" },
        ],
      },
      {
        title: "دهان و دندان",
        subs: [
          { name: "خمیردندان", slug: "toothpaste" },
          { name: "مسواک", slug: "toothbrush" },
          { name: "دهانشویه", slug: "mouthwash" },
          { name: "نخ دندان", slug: "dental-floss" },
          { name: "سفیدکننده دندان", slug: "teeth-whitening" },
          { name: "محصولات مراقبت لثه", slug: "gum-care" },
        ],
      },
      {
        title: "بهداشت شخصی",
        subs: [
          { name: "محصولات بهداشت بانوان", slug: "feminine-care" },
          { name: "ژل بهداشتی", slug: "intimate-wash" },
          { name: "دستمال مرطوب", slug: "wet-wipes" },
          { name: "ضدعفونی‌کننده", slug: "sanitizer" },
          { name: "محصولات بهداشت روزانه", slug: "daily-hygiene" },
        ],
      },
      {
        title: "مراقبت دست و پا",
        subs: [
          { name: "کرم دست", slug: "hand-cream-dp" },
          { name: "کرم پا", slug: "foot-cream-dp" },
          { name: "ماسک دست", slug: "hand-mask" },
          { name: "ماسک پا", slug: "foot-mask" },
          { name: "محصولات ترک پا", slug: "cracked-heels" },
        ],
      },
    ],
  },
  {
    name: "عطر و رایحه",
    slug: "fragrance",
    icon: "fragrance",
    tint: "from-amber-50 via-orange-50 to-white",
    groups: [
      {
        title: "عطر و ادکلن",
        subs: [
          { name: "ادوپرفیوم", slug: "eau-de-parfum" },
          { name: "ادوتویلت", slug: "eau-de-toilette" },
          { name: "ادکلن", slug: "cologne" },
          { name: "عطر زنانه", slug: "women-perfume" },
          { name: "عطر مردانه", slug: "men-perfume" },
          { name: "عطر یونیسکس", slug: "unisex-perfume" },
        ],
      },
      {
        title: "رایحه بدن",
        subs: [
          { name: "بادی میست", slug: "body-mist" },
          { name: "بادی اسپلش", slug: "body-splash" },
          { name: "اسپری بدن", slug: "body-spray" },
          { name: "دئودورانت", slug: "deodorant" },
        ],
      },
      {
        title: "محصولات مکمل رایحه",
        subs: [
          { name: "لوسیون بدن عطری", slug: "fragranced-lotion" },
          { name: "کرم دست عطری", slug: "fragranced-hand-cream" },
          { name: "ست‌های عطری", slug: "fragrance-sets" },
          { name: "ست هدیه", slug: "gift-sets" },
          { name: "محصولات معطر بدن", slug: "scented-body" },
        ],
      },
    ],
  },
  {
    name: "لوازم برقی",
    slug: "electric",
    icon: "electric",
    tint: "from-sky-50 via-cyan-50 to-white",
    groups: [
      {
        title: "حالت‌دهی مو",
        subs: [
          { name: "سشوار", slug: "hair-dryer" },
          { name: "سشوار برس‌دار", slug: "hot-air-brush" },
          { name: "اتو مو", slug: "hair-straightener" },
          { name: "فرکننده مو", slug: "hair-curler" },
          { name: "حالت‌دهنده مو", slug: "hair-styler" },
          { name: "بیگودی برقی", slug: "electric-rollers" },
          { name: "برس حرارتی", slug: "thermal-brush" },
        ],
      },
      {
        title: "اصلاح خانم‌ها",
        subs: [
          { name: "ماشین اصلاح بانوان", slug: "ladies-shaver" },
          { name: "اپیلاتور", slug: "epilator" },
          { name: "تریمر بانوان", slug: "ladies-trimmer" },
          { name: "دستگاه اصلاح بدن", slug: "body-groomer" },
        ],
      },
      {
        title: "اصلاح آقایان",
        subs: [
          { name: "ماشین اصلاح آقایان", slug: "men-shaver" },
          { name: "ریش‌تراش", slug: "beard-shaver" },
          { name: "تریمر آقایان", slug: "men-trimmer" },
          { name: "خط‌زن", slug: "edger" },
        ],
      },
      {
        title: "مراقبت برقی پوست",
        subs: [
          { name: "دستگاه پاکسازی صورت", slug: "facial-device" },
          { name: "برس پاکسازی صورت", slug: "cleansing-brush" },
          { name: "ماساژور صورت", slug: "face-massager" },
          { name: "دستگاه مراقبت پوست", slug: "skincare-device" },
        ],
      },
    ],
  },
];

export const SKIN_TYPES = [
  { name: "پوست چرب", slug: "oily-skin", tint: "from-rose-50 to-pink-100" },
  { name: "پوست خشک", slug: "dry-skin", tint: "from-orange-50 to-amber-100" },
  { name: "پوست مختلط", slug: "combination-skin", tint: "from-purple-50 to-lilac-soft" },
  { name: "پوست حساس", slug: "sensitive-skin", tint: "from-teal-50 to-emerald-50" },
];

/** Resolve a subcategory slug across the tree */
export function findSub(slug: string) {
  for (const cat of CATEGORIES) {
    for (const group of cat.groups) {
      const sub = group.subs.find((s) => s.slug === slug);
      if (sub) return { cat, group, sub };
    }
  }
  return null;
}

export function findTopCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}
