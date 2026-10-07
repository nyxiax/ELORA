/** ELORA shared types */

export interface CategoryGroup {
  title: string;
  subs: CategorySub[];
}

export interface CategorySub {
  /** Persian label, e.g. "ریمل" */
  name: string;
  /** url slug, e.g. "mascara" */
  slug: string;
}

export interface TopCategory {
  /** Persian label, e.g. "آرایشی" */
  name: string;
  slug: string;
  /** icon key rendered by IconFor component */
  icon: "makeup" | "care" | "fragrance" | "electric";
  /** gradient for listing pages */
  tint: string;
  groups: CategoryGroup[];
}

export interface Brand {
  name: string;
  slug: string;
  country?: string;
  tagline?: string;
  /** optional wordmark styling class */
  style?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  productId: string;
  user: string;
  rating: number;
  text: string;
  date: string; // ISO
  local?: boolean; // created at runtime, persisted in localStorage
}

export interface Product {
  id: string;
  name: string;
  brandSlug: string;
  /** top category slug */
  category: string;
  /** group title in Persian, e.g. "آرایش لب" */
  group: string;
  /** subcategory Persian name */
  sub: string;
  /** subcategory slug */
  subSlug: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  short: string;
  description: string[];
  howToUse: string[];
  specs: ProductSpec[];
  skinTypes?: string[]; // چرب / خشک / مختلط / حساس
  hairTypes?: string[];
  keywords: string[];
  tags?: ("bestseller" | "pick" | "new" | "trending" | "week")[];
  imageTint?: string; // fallback gradient key
  ingredients?: string[]; // ترکیبات کلیدی — only where relevant
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readingTime: number;
  date: string;
  image: string;
  content: { heading: string; paragraphs: string[]; list?: string[] }[];
  tags: string[];
}

export interface MockOrder {
  id: string;
  date: string; // ISO
  items: { productId: string; qty: number }[];
  total: number;
  status: "ثبت شده" | "در حال آماده‌سازی" | "ارسال شده" | "تحویل داده شده";
}

export interface Ticket {
  id: string;
  subject: string;
  category: string;
  description: string;
  date: string;
  status: "در حال بررسی" | "پاسخ داده شده" | "بسته شده";
  local?: boolean;
}

export interface Address {
  id: string;
  receiver: string;
  phone: string;
  province: string;
  city: string;
  full: string;
  postal: string;
}

export interface MockUser {
  id: string;
  name: string;
  phone: string;
  password: string;
  birthday?: string;
  nationalCode?: string;
}
