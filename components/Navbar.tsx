// components/Navbar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/components/CartProvider';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  // Update nav items with proper paths
  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },  // Changed from /about-us to /about
    { name: 'MENU', path: '/menu' },
    { name: 'SHOP', path: '/shop' },
    { name: 'CONTACT', path: '/contact' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-maroon text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - LEFT SIDE */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="FIEND Coffee Club"
              width={40}
              height={40}
              className="object-contain"
              priority
              onError={(e) => {
                // If logo doesn't load, hide it
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="flex items-center gap-1">
              <span className="text-xl md:text-2xl font-serif font-bold tracking-wide text-white">
                FIEND
              </span>
              <span className="text-[10px] md:text-xs bg-white/20 px-2 py-0.5 rounded-full text-white/90">
                COFFEE CLUB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-sm lg:text-base font-medium hover:text-gold-300 transition-colors whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 ml-4">
              <Link href="/cart" className="relative hover:text-gold-300 transition-colors">
                <ShoppingCart className="h-5 w-5 lg:h-6 lg:w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-400 text-maroon text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              <button className="bg-white text-maroon px-4 py-2 rounded-full text-sm font-semibold hover:bg-gold-300 transition whitespace-nowrap">
                ORDER NOW
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block py-2 text-sm font-medium hover:text-gold-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 flex items-center gap-4">
              <Link href="/cart" className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({totalItems})</span>
              </Link>
              <button className="bg-white text-maroon px-4 py-1.5 rounded-full text-sm font-semibold">
                ORDER NOW
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};