import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { StockStatus } from "./types";

/**
 * Minimal local shape for clsx inputs to avoid ambient module augmentation
 * errors when the package typings are unavailable or not exposed here.
 */
type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | { [key: string]: any };

/** Merge Tailwind classes safely, resolving conflicts (later classes win). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Philippine peso currency, e.g. 1288 -> "₱1,288.00" */
export function formatPHP(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);
}

/** Derive a stock status label from a raw stock count. */
export function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) return "Out of Stock";
  if (stock <= 5) return "Low Stock";
  return "In Stock";
}

/** Tailwind classes for each stock status badge. */
export function stockStatusClasses(status: StockStatus): string {
  switch (status) {
    case "In Stock":
      return "bg-green-100 text-green-800 border border-green-300";
    case "Low Stock":
      return "bg-orange-100 text-orange-800 border border-orange-300";
    case "Out of Stock":
      return "bg-red-100 text-red-800 border border-red-300";
  }
}

/** Turn a product name into a URL-friendly slug. */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}