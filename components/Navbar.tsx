// components/Navbar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/components/CartProvider';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const navItems = ['HOME', 'ABOUT US', 'MENU', 'SHOP', 'CONTACT'];

  return (
    <nav className="sticky top-0 z-50 bg-maroon text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold tracking-wide">FIEND</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">COFFEE CLUB</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item}
                href={item === 'HOME' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium hover:text-gold-300 transition-colors"
              >
                {item}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 ml-4">
              {/* Cart Icon */}
              <Link href="/cart" className="relative hover:text-gold-300 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-400 text-maroon text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              <button className="bg-white text-maroon px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gold-300 transition">
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
                key={item}
                href={item === 'HOME' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                className="block py-2 text-sm font-medium hover:text-gold-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
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