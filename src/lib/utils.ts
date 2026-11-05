export type Market = { market: string; division: string; min: number; max: number };

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: string; pct: number };
  markets: Market[];
};

export type Category = { id: string; slug: string; nameBn: string; icon: string };

const BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBn = (v: number | string) => String(v).replace(/\d/g, (d) => BN[Number(d)]);

export const fmt = (n: number) => toBn(Number.isInteger(n) ? n : n.toFixed(2));

const UNITS: Record<string, string> = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  litre: "প্রতি লিটার",
  ltr: "প্রতি লিটার",
  l: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  dz: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pc: "প্রতি পিস",
  pcs: "প্রতি পিস",
};

export const unitBn = (u: string) => UNITS[u?.toLowerCase()] ?? `প্রতি ${u}`;

export const unitShort = (u: string) => unitBn(u).replace("প্রতি ", "");

export const banglaDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });