// types/index.ts

export interface Product {
  id: string;
  name: string;
  slug: string;
  grade?: string;
  category: 'matcha' | 'coffee' | 'milk' | 'sweetener' | 'essential';
  price: number;
  description: string;
  image: string;
  stock: number;
  unit: string;
  ingredients?: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'matcha' | 'food' | 'dessert';
  description: string;
  price: number;
  ingredients: string[];
  image: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface InventoryItem {
  productId: string;
  productName: string;
  category: string;
  stock: number;
  unit: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}