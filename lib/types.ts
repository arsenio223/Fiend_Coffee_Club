export type ProductCategory =
  | "Matcha"
  | "Coffee"
  | "Milk"
  | "Sweeteners"
  | "Cafe Essentials";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  grade?: string; // e.g. "Ceremonial Grade"
  description: string;
  price: number; // in PHP
  stock: number;
  unit: string; // e.g. "box", "bottle", "bag"
  image?: string; // optional path, falls back to a generated placeholder
  accent?: string; // hex used for the placeholder swatch
}

export type MenuCategory = "Coffee" | "Matcha" | "Food & Desserts";

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  ingredients?: string[]; // product slugs this drink/food consumes
}

export interface InventoryItem {
  productSlug: string;
  stock: number;
  unit: string;
}

export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  accent?: string;
}