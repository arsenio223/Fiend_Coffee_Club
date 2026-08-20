// app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import HighlightsSlider from '@/components/HighlightsSlider';

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
  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="relative text-white overflow-hidden min-h-[700px] md:min-h-[800px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/about-story-3.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 lg:py-40 z-10">
          <span className="text-sm tracking-[0.2em] uppercase bg-black/30 px-4 py-1 rounded-full inline-block backdrop-blur-sm">
            Good Coffee. Great Vibes.
          </span>
          <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] max-w-2xl mt-4 drop-shadow-lg">
            Coffee.<br />Community.<br />
            <span className="text-white">Comfort.</span>
          </h1>
          <p className="text-lg md:text-xl max-w-xl text-white/90 mt-4 drop-shadow-lg">
            A coffee shop built for good vibes, great conversations, and everyday moments that matter.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/menu">
              <button className="bg-white text-maroon px-8 py-3 rounded-full font-semibold hover:bg-white/90 hover:text-maroon border-2 border-white transition-all duration-300 hover:scale-105">
                EXPLORE MENU
              </button>
            </Link>
            <Link href="/menu">
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-maroon transition-all duration-300">
                ORDER NOW
              </button>
            </Link>
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

      {/* NEW: View Products Section - Same size as hero */}
      <section className="relative text-white overflow-hidden min-h-[700px] md:min-h-[800px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/fiend2.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 lg:py-40 z-10 text-center w-full">
          <span className="text-sm tracking-[0.3em] uppercase bg-black/30 px-5 py-1.5 rounded-full inline-block mb-4 backdrop-blur-sm">
            Shop Our Collection
          </span>
          <h2 className="text-4xl md:text-6xl font-serif leading-[1.1] max-w-3xl mx-auto drop-shadow-lg">
            Discover Our <br />
            <span className="text-white">Premium Products</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 mt-4 max-w-2xl mx-auto drop-shadow-lg">
            From premium matcha to artisanal coffee beans and quality ingredients.
          </p>
          
          {/* View Products Button - SMALLER with BOX BORDER */}
          <div className="mt-8">
            <Link href="/shop">
              <button className="group relative px-6 py-3 text-base md:text-lg font-semibold rounded-lg border-2 border-white text-white hover:bg-white hover:text-maroon transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center gap-2">
                View Products
              </button>
            </Link>
          </div>
          
          <div className="w-24 h-1 bg-white/30 mx-auto mt-6"></div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section className="relative text-white overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/fiend5.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 z-10 text-center">
          <span className="text-sm tracking-[0.3em] uppercase bg-black/30 px-5 py-1.5 rounded-full inline-block mb-4 backdrop-blur-sm">
            Discover Our Menu
          </span>
          <h2 className="text-4xl md:text-6xl font-serif leading-[1.1] max-w-3xl mx-auto drop-shadow-lg">
            Explore Our <br />
            <span className="text-white">Delicious Selection</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 mt-4 max-w-2xl mx-auto drop-shadow-lg">
            From premium matcha to artisan coffee and delightful pastries.
          </p>
          
          <div className="mt-8">
            <Link href="/menu">
              <button className="group relative px-6 py-3 text-base md:text-lg font-semibold rounded-lg border-2 border-white text-white hover:bg-white hover:text-maroon transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center gap-2">
                View Menu
              </button>
            </Link>
          </div>
          
          <div className="w-24 h-1 bg-white/30 mx-auto mt-6"></div>
        </div>
      </section>

      {/* Call to Action - Visit Us */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-maroon mb-4">Visit Us Today</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Experience the FIEND difference. Great coffee, amazing food, and a community that feels like home.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/about">
              <button className="bg-maroon text-white px-8 py-3 rounded-full font-semibold hover:bg-maroon-dark transition hover:scale-105">
                Find Our Locations
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-maroon text-maroon px-8 py-3 rounded-full font-semibold hover:bg-maroon hover:text-white transition hover:scale-105">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}