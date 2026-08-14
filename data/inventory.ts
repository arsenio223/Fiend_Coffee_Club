import type { InventoryItem } from "@/lib/types";
import { products } from "./products";

/**
 * Inventory is derived from products.ts initially, but kept as its own
 * array so a future backend (Supabase/Prisma/etc.) can own this table
 * independently while products.ts stays the catalog "menu" of truth.
 */
export const inventory: InventoryItem[] = products.map((p) => ({
  productSlug: p.slug,
  stock: p.stock,
  unit: p.unit,
}));