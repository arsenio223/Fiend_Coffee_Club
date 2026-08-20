// app/menu/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ChevronRight, Star } from 'lucide-react';

// Menu data structure
const menuData = {
  matcha: {
    id: 'matcha',
    title: 'Matcha Based',
    image: '/images/menu-matcha.jpg',
    description: 'Premium Japanese green tea creations crafted with care',
    items: [
      { name: 'Signature Takumi', price: 180, description: 'Premium ceremonial grade matcha with a smooth, umami-rich finish' },
      { name: 'Fiended Matcha', price: 165, description: 'Our signature blend with a perfect balance of sweetness and earthiness' },
      { name: 'Matcha Latte', price: 155, description: 'Classic matcha latte with steamed milk and a delicate foam' },
      { name: 'MatchaYen', price: 175, description: 'Matcha infused with a hint of vanilla bean and white chocolate' },
      { name: 'Matcha Pistachio', price: 195, description: 'Creamy matcha latte with rich pistachio butter and topped with crushed pistachios' },
      { name: 'Seasalt Matcha', price: 185, description: 'Our signature matcha with a velvety sea salt foam' },
      { name: 'Matcha Cinnamon', price: 175, description: 'Warm matcha latte with a sprinkle of Ceylon cinnamon' },
      { name: 'Matcha Banana Foam', price: 190, description: 'Matcha latte topped with a cloud-like banana foam' },
      { name: 'Coco Matcha Cloud', price: 195, description: 'Matcha latte with coconut cream and toasted coconut flakes' },
      { name: 'Strawberry Matcha', price: 185, description: 'Matcha layered with house-made strawberry puree' },
      { name: 'Matcha Cookie', price: 175, description: 'Matcha latte with crunchy cookie crumble and vanilla cream' },
      { name: 'Fiended Houjicha', price: 170, description: 'Our signature roasted green tea with a nutty, caramel-like flavor' },
      { name: 'Houjicha Latte', price: 155, description: 'Classic houjicha latte with a toasty aroma' },
      { name: 'Houjicha Banana Foam', price: 185, description: 'Houjicha latte with a cloud-like banana foam' },
      { name: 'Seasalt Houjicha', price: 180, description: 'Houjicha latte with our signature sea salt foam' },
      { name: 'Coco Houjicha Cloud', price: 190, description: 'Houjicha latte with coconut cream and toasted coconut' },
      { name: 'Genmaicha', price: 150, description: 'Traditional Japanese brown rice tea with a nutty, toasty profile' },
      { name: 'Genmaicha Black Sesame', price: 175, description: 'Genmaicha infused with roasted black sesame' },
      { name: 'Emerra', price: 160, description: 'Culinary grade matcha latte with a bold, vibrant taste' },
    ]
  },
  coffee: {
    id: 'coffee',
    title: 'Coffee Based',
    image: '/images/menu-coffee.jpg',
    description: 'Artisan coffee creations for every palate',
    items: [
      { name: 'Raw', price: 140, description: 'Pure, unadulterated black coffee for the purist' },
      { name: 'Fiend On the Rocks', price: 160, description: 'Iced coffee with a bold twist and a hint of vanilla' },
      { name: 'Latte Culta', price: 165, description: 'Velvety latte with a secret blend of spices' },
      { name: 'Pistachio Latte', price: 185, description: 'Smooth latte with rich pistachio syrup and a green sheen' },
      { name: 'Sweet Sin', price: 175, description: 'Indulgent caramel latte with a dark chocolate drizzle' },
      { name: 'Muscov', price: 170, description: 'Coffee sweetened with rich muscovado sugar for depth' },
      { name: 'Banana Latte', price: 180, description: 'Latte with house-made banana puree and a hint of cinnamon' },
      { name: 'Seasalt Caramel', price: 185, description: 'Caramel latte with a signature sea salt foam' },
      { name: 'Signature Seasalt', price: 190, description: 'Our acclaimed sea salt coffee creation' },
      { name: 'Dark Lies', price: 175, description: 'Dark chocolate infused coffee for the bold' },
      { name: 'White Lies', price: 175, description: 'White chocolate coffee blend with a touch of vanilla' },
    ]
  },
  nonCoffee: {
    id: 'nonCoffee',
    title: 'Non-Coffee',
    image: '/images/menu-noncoffee.jpg',
    description: 'Refreshing alternatives for everyone to enjoy',
    items: [
      { name: 'Dark Side', price: 150, description: 'Rich dark chocolate milk with a hint of sea salt', category: 'Milk Based' },
      { name: 'Milo Craze', price: 145, description: 'Milo chocolate drink with a creamy twist', category: 'Milk Based' },
      { name: 'Milky Rosy', price: 155, description: 'Rose-infused milk with delicate floral notes', category: 'Milk Based' },
      { name: 'Banana Dark Side', price: 160, description: 'Dark chocolate milk with banana puree', category: 'Milk Based' },
      { name: 'Rosy', price: 130, description: 'Rose-flavored soda with a vibrant hue', category: 'Soda Based' },
      { name: 'Rosy Yakult', price: 145, description: 'Rose soda with creamy yakult probiotics', category: 'Soda Based' },
      { name: 'Midnight Breeze', price: 140, description: 'Blue butterfly pea soda with a citrus twist', category: 'Soda Based' },
      { name: 'Calamondin Yakult', price: 145, description: 'Calamondin soda with yakult probiotics', category: 'Soda Based' },
      { name: 'Green Apple', price: 135, description: 'Crisp green apple soda with a refreshing finish', category: 'Soda Based' },
    ]
  },
  meals: {
    id: 'meals',
    title: 'Meals & Snacks',
    image: '/images/menu-meals.jpg',
    description: 'Hearty meals and satisfying snacks for any time of day',
    items: [
      { name: 'Angus Beef Salad', price: 220, description: 'Grilled angus beef with fresh greens and dressing'},
      { name: 'Salted Egg Shrimp', price: 195, description: 'Crispy shrimp with salted egg sauce'},
      { name: 'Chicken Diane', price: 210, description: 'Grilled chicken with creamy mushroom sauce'},
      { name: 'Mexican Quesadilla', price: 185, description: 'Cheesy quesadilla with seasoned chicken'},
      { name: 'Truffle Fries', price: 150, description: 'Golden fries with truffle oil and parmesan' },
      { name: 'Garlic Parmesan Wings', price: 190, description: 'Crispy wings with garlic parmesan glaze' },
      { name: 'Nachos Grande', price: 175, description: 'Loaded nachos with cheese, salsa, and sour cream' },
      { name: 'Fish & Chips', price: 185, description: 'Crispy battered fish with seasoned fries' },
      { name: 'Club Sandwich', price: 160, description: 'Triple-decker sandwich with chicken and bacon' },
      { name: 'Pasta Carbonara', price: 195, description: 'Creamy pasta with bacon and parmesan' },
      { name: 'Pesto Pasta', price: 185, description: 'Pasta with fresh basil pesto and pine nuts' },
      { name: 'Rice Bowl', price: 170, description: 'Choice of protein with garlic rice and egg' },
    ]
  },
  pastries: {
    id: 'pastries',
    title: 'Pastries',
    image: '/images/menu-pastries.jpg',
    description: 'Freshly baked pastries perfect for any occasion',
    items: [
      { name: 'Matcha Cookie', price: 120, description: 'Soft-baked cookie with premium matcha'},
      { name: 'Matcha Croissant', price: 150, description: 'Flaky croissant with matcha filling'},
      { name: 'Cheesecake', price: 165, description: 'Classic New York style cheesecake'},
      { name: 'Chocolate Chip Cookie', price: 110, description: 'Classic cookie with dark chocolate chips' },
      { name: 'Almond Croissant', price: 145, description: 'Buttery croissant with almond cream' },
      { name: 'Red Velvet Cake', price: 160, description: 'Rich red velvet with cream cheese frosting' },
      { name: 'Matcha Muffin', price: 130, description: 'Green tea muffin with streusel topping' },
      { name: 'Blueberry Muffin', price: 130, description: 'Classic muffin with fresh blueberries' },
      { name: 'Banana Bread', price: 125, description: 'Moist banana bread with walnuts' },
      { name: 'Cinnamon Roll', price: 140, description: 'Warm cinnamon roll with cream cheese glaze' },
      { name: 'Matcha Chiffon Cake', price: 155, description: 'Light and fluffy matcha chiffon cake' },
      { name: 'Tiramisu', price: 160, description: 'Italian coffee-flavored dessert' },
    ]
  }
};

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'matcha', label: 'Matcha Based' },
    { id: 'coffee', label: 'Coffee Based' },
    { id: 'nonCoffee', label: 'Non-Coffee' },
    { id: 'meals', label: 'Meals & Snacks' },
    { id: 'pastries', label: 'Pastries' },
  ];

  const currentCategory = selectedCategory ? menuData[selectedCategory as keyof typeof menuData] : null;

  // Group non-coffee items by subcategory
  const getGroupedItems = (items: any[]) => {
    const groups: { [key: string]: any[] } = {};
    items.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  };

  const groupedItems = currentCategory && selectedCategory === 'nonCoffee' 
    ? getGroupedItems(currentCategory.items) 
    : null;

  // Handle back button
  const handleBack = () => {
    setSelectedCategory(null);
  };

  // If a category is selected, show the menu items
  if (selectedCategory && currentCategory) {
    return (
      <div className="bg-cream min-h-screen">
        {/* Header with Back Button */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-6 py-5">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-maroon hover:text-maroon-dark transition-colors group text-lg font-medium"
              >
                <ArrowLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Menu</span>
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-serif font-bold text-maroon">{currentCategory.title}</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-gray-600 text-lg mb-10 max-w-3xl">{currentCategory.description}</p>

            {/* Menu Items Grid */}
            {selectedCategory !== 'nonCoffee' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {currentCategory.items.map((item: any, index: number) => (
                  <div 
                    key={index} 
                    className={`group bg-white rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden border ${
                      item.isFeatured ? 'border-maroon shadow-lg shadow-maroon/10' : 'border-gray-200 shadow-soft hover:border-maroon/30'
                    }`}
                  >
                    
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-serif font-bold text-maroon group-hover:text-maroon-dark transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-bold text-xl text-maroon bg-maroon/5 px-4 py-1.5 rounded-full">
                        ₱{item.price}
                      </span>
                    </div>
                    <p className="text-base text-gray-600 leading-relaxed">{item.description}</p>
                    <button className="mt-5 text-sm text-maroon font-semibold hover:text-maroon-dark transition-colors flex items-center gap-2 group-hover:gap-3">
                      Order Now <span className="text-maroon/50">→</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(groupedItems || {}).map(([category, items]) => (
                  <div key={category}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-1 h-10 bg-maroon rounded-full"></div>
                      <h3 className="text-2xl font-serif font-bold text-maroon">{category}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {items.map((item: any, idx: number) => (
                        <div key={idx} className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 shadow-soft hover:border-maroon/30">
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="text-2xl font-serif font-bold text-maroon group-hover:text-maroon-dark transition-colors">
                              {item.name}
                            </h4>
                            <span className="font-bold text-xl text-maroon bg-maroon/5 px-4 py-1.5 rounded-full">
                              ₱{item.price}
                            </span>
                          </div>
                          <p className="text-base text-gray-600 leading-relaxed">{item.description}</p>
                          <button className="mt-5 text-sm text-maroon font-semibold hover:text-maroon-dark transition-colors flex items-center gap-2 group-hover:gap-3">
                            Order Now <span className="text-maroon/50">→</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Default view: Show category cards - WIDER CARDS
  return (
    <div className="bg-cream min-h-screen">
      {/* Category Cards - WIDER */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-maroon">Our Menu</h2>
            <div className="w-20 h-1 bg-maroon mx-auto mt-3 mb-3"></div>
            <p className="text-gray-500 text-lg">Choose your preferred category below</p>
          </div>
          <div className="mt-4 md:mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
              {categories.map((cat) => {
                const data = menuData[cat.id as keyof typeof menuData];
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 text-left border-2 border-transparent hover:border-maroon/20 flex flex-col"
                  >
                    {/* Category Image - FULL WIDTH */}
                    <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-maroon/5 flex-shrink-0">
                      <Image
                        src={data.image}
                        alt={cat.label}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white drop-shadow-lg">
                          {cat.label}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Content - MAXIMIZED PADDING */}
                    <div className="p-6 sm:p-8 bg-white flex-1 flex flex-col justify-between">
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-2">
                        {data.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-maroon font-semibold text-sm sm:text-base group-hover:gap-3 transition-all">
                        <span>Explore Menu</span>
                        <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}