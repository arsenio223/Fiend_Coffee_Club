// data/menu.ts
import { MenuItem } from '@/types';

export const menuItems: MenuItem[] = [
  // Coffee
  {
    id: 'espresso',
    name: 'Espresso',
    category: 'coffee',
    description: 'Classic rich espresso shot',
    price: 120,
    ingredients: ['coffee-beans'],
    image: '/images/espresso.jpg'
  },
  {
    id: 'matcha-oat-latte',
    name: 'Iced Matcha Oat Latte',
    category: 'matcha',
    description: 'Smooth matcha with creamy oat milk',
    price: 190,
    ingredients: ['takumi', 'oatside'],
    image: '/images/matcha-oat-latte.jpg'
  },
  {
    id: 'dirty-matcha',
    name: 'Dirty Matcha',
    category: 'matcha',
    description: 'Matcha latte with a shot of espresso',
    price: 210,
    ingredients: ['nagomi', 'coffee-beans'],
    image: '/images/dirty-matcha.jpg'
  },
  // Add more menu items...
];