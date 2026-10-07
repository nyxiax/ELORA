/** Persian digit & formatting helpers */

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toFa(input: string | number): string {
  return String(input).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

export function toEnDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

/** 1850000 → "۱,۸۵۰,۰۰۰" */
export function faNumber(n: number): string {
  return toFa(n.toLocaleString("en-US"));
}

/** 1850000 → "۱,۸۵۰,۰۰۰ تومان" */
export function faPrice(n: number): string {
  return `${faNumber(n)} تومان`;
}

export function discountPercent(price: number, oldPrice?: number): number {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function faDate(iso: string): string {
  // iso is a Gregorian date string; convert to Persian (Jalali) digits date via Intl
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function faDateLong(iso: string): string {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function normalizePhone(p: string): string {
  return toEnDigits(p).replace(/[\s-]/g, "");
}

export function isValidIranPhone(p: string): boolean {
  return /^09\d{9}$/.test(normalizePhone(p));
}

export function isValidNationalCode(c: string): boolean {
  const code = toEnDigits(c).trim();
  // Demo template: format validation only (any 10-digit code is accepted
  // so marketplace reviewers can register with arbitrary demo data).
  return /^\d{10}$/.test(code);
}
