// app/page.tsx
'use client';

import React from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import HighlightsSlider from '@/components/HighlightsSlider';

// Define your highlight images using fiend1.jpg - fiend5.jpg
const highlightImages = [
  {
    id: '1',
    src: '/images/fiend1.jpg',
    alt: 'FIEND Coffee Club - Premium Coffee Experience',
    title: 'Premium Coffee Experience',
    description: 'Sourced from the finest beans around the world.'
  },
  {
    id: '2',
    src: '/images/fiend2.jpg',
    alt: 'FIEND Coffee Club - Artisanal Matcha',
    title: 'Artisanal Matcha Selection',
    description: 'Carefully crafted from premium green tea leaves.'
  },
  {
    id: '3',
    src: '/images/fiend3.jpg',
    alt: 'FIEND Coffee Club - Community & Comfort',
    title: 'Community & Comfort',
    description: 'A place where friendships are brewed and stories are shared.'
  },
  {
    id: '4',
    src: '/images/fiend4.jpg',
    alt: 'FIEND Coffee Club - Barista Craft',
    title: 'Barista Craft',
    description: 'Every cup is crafted with passion and precision.'
  },
  {
    id: '5',
    src: '/images/fiend5.jpg',
    alt: 'FIEND Coffee Club - Good Vibes Only',
    title: 'Good Vibes Only',
    description: 'Good coffee. Great vibes. Everyday moments that matter.'
  }
];

export default function HomePage() {
  const matchaProducts = products.filter(p => p.category === 'matcha');
  const otherProducts = products.filter(p => p.category !== 'matcha');

  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="relative bg-maroon text-white overflow-hidden min-h-[600px] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-maroon/90 to-maroon/70"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 lg:py-36 z-10">
          <span className="text-sm tracking-[0.2em] uppercase bg-white/10 px-4 py-1 rounded-full inline-block">
            Good Coffee. Great Vibes.
          </span>
          <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] max-w-2xl mt-4">
            Coffee.<br />Community.<br />
            <span className="text-gold-400">Comfort.</span>
          </h1>
          <p className="text-lg md:text-xl max-w-xl text-white/80 mt-4">
            A coffee shop built for good vibes, great conversations, and everyday moments that matter.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <button className="bg-white text-maroon px-8 py-3 rounded-full font-semibold hover:bg-gold-400 transition-colors hover:scale-105">
              EXPLORE MENU
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-maroon transition-all">
              ORDER NOW
            </button>
          </div>
        </div>
      </section>

      {/* Feature Bar */}
      <section className="bg-white border-b border-maroon/10 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <span className="block font-semibold text-maroon">☕ QUALITY COFFEE</span>
            <span className="text-sm text-gray-600">Finest coffee beans</span>
          </div>
          <div>
            <span className="block font-semibold text-maroon">🌿 NATURAL INGREDIENTS</span>
            <span className="text-sm text-gray-600">Carefully selected</span>
          </div>
          <div>
            <span className="block font-semibold text-maroon">❤️ MADE WITH LOVE</span>
            <span className="text-sm text-gray-600">Crafted with passion</span>
          </div>
          <div>
            <span className="block font-semibold text-maroon">🤝 COMMUNITY FIRST</span>
            <span className="text-sm text-gray-600">Good coffee brings people together</span>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS SLIDER */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-serif text-maroon">HIGHLIGHTS</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2">
              Discover our featured products and community stories.
            </p>
          </div>
          <HighlightsSlider 
            images={highlightImages} 
            autoPlay={true} 
            autoPlayInterval={5000} 
          />
        </div>
      </section>

      {/* Matcha Selection */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-maroon">OUR MATCHA SELECTION</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2">
              Carefully crafted from premium green tea leaves. Smooth, vibrant, and full of natural goodness.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {matchaProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* More Goodness */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-serif text-maroon text-center mb-12">MORE GOODNESS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {otherProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-maroon text-white py-16">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-5xl font-serif">Love at first sip.</h2>
          <p className="text-white/80 text-lg mt-2">Every cup has a story. What's yours?</p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-maroon focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
            <button className="bg-gold-400 text-maroon px-6 py-3 rounded-full font-semibold hover:bg-gold-300 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}