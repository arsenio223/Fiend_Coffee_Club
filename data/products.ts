// data/products.ts
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'takumi',
    name: 'TAKUMI',
    slug: 'takumi',
    grade: 'Ceremonial Grade',
    category: 'matcha',
    price: 1288,
    description: 'Smooth umami, vibrant green. Premium ceremonial grade matcha from Uji, Japan.',
    image: '/images/takumi.jpg',
    stock: 8,
    unit: '100g'
  },
  {
    id: 'nagomi',
    name: 'NAGOMI',
    slug: 'nagomi',
    grade: 'Premium Grade',
    category: 'matcha',
    price: 1088,
    description: 'Balanced & rich daily matcha. Perfect for morning lattes.',
    image: '/images/nagomi.jpg',
    stock: 5,
    unit: '100g'
  },
  {
    id: 'emerra',
    name: 'EMERRA',
    slug: 'emerra',
    grade: 'Culinary Grade',
    category: 'matcha',
    price: 988,
    description: 'Bold & earthy for lattes, smoothies, and baking.',
    image: '/images/emerra.jpg',
    stock: 12,
    unit: '100g'
  },
  {
    id: 'houjicha',
    name: 'HOUJICHA',
    slug: 'houjicha',
    grade: 'Roasted Green Tea',
    category: 'matcha',
    price: 788,
    description: 'Toasty, nutty, low caffeine. Roasted green tea powder.',
    image: '/images/houjicha.jpg',
    stock: 3,
    unit: '100g'
  },
  {
    id: 'genmaicha',
    name: 'GENMAICHA',
    slug: 'genmaicha',
    grade: 'Brown Rice Tea',
    category: 'matcha',
    price: 688,
    description: 'Toasted rice & green tea blend. Nutty and comforting.',
    image: '/images/genmaicha.jpg',
    stock: 0,
    unit: '100g'
  },
  {
    id: 'oatside',
    name: 'OATSIDE',
    slug: 'oatside',
    category: 'milk',
    price: 199,
    description: 'Creamy oat milk made from premium oats. Barista edition with added vitamins.',
    image: '/images/oatside.jpg',
    stock: 15,
    unit: '1L'
  },
  {
    id: 'agave-kirkland',
    name: 'AGAVE KIRKLAND',
    slug: 'agave-kirkland',
    category: 'sweetener',
    price: 499,
    description: 'Organic blue agave sweetener. Low glycemic index, all-purpose sweetener.',
    image: '/images/agave.jpg',
    stock: 7,
    unit: '750ml'
  }
];

export const getProductBySlug = (slug: string) => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (category: string) => {
  return products.filter(p => p.category === category);
};