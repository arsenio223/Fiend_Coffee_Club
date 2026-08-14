// components/ProductCard.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/components/CartProvider';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showAddToCart = true 
}) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const getStockStatus = (stock: number): 'in-stock' | 'low-stock' | 'out-of-stock' => {
    if (stock === 0) return 'out-of-stock';
    if (stock <= 5) return 'low-stock';
    return 'in-stock';
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const getStockStatusColor = (status: string) => {
    switch(status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-orange-100 text-orange-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatusLabel = (status: string) => {
    switch(status) {
      case 'in-stock': return 'In Stock';
      case 'low-stock': return 'Low Stock';
      case 'out-of-stock': return 'Out of Stock';
      default: return 'Unknown';
    }
  };

  // Determine which emoji to show as fallback
  const getEmoji = () => {
    if (product.category === 'matcha') return '🍵';
    if (product.category === 'milk') return '🥛';
    if (product.category === 'sweetener') return '🍯';
    return '☕';
  };

  return (
    <Link href={`/shop/${product.slug}`} className="block">
      <div className="bg-white rounded-xl shadow-soft card-hover overflow-hidden transition-all duration-300 h-full flex flex-col">
        {/* Image - Larger and showing full image */}
        <div className="relative w-full bg-gradient-to-br from-maroon/5 to-maroon/10 flex items-center justify-center overflow-hidden">
          {/* 1:1 Square ratio - shows full image */}
          <div className="relative w-full pt-[100%]">
            {!imageError ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4" // object-contain shows the whole image
                onError={() => {
                  console.error(`Failed to load image: ${product.image}`);
                  setImageError(true);
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority={product.category === 'milk' || product.category === 'sweetener'}
              />
            ) : (
              // Fallback emoji if image fails to load
              <div className="absolute inset-0 flex items-center justify-center text-8xl">
                {getEmoji()}
              </div>
            )}
          </div>
          
          {/* Stock Status Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStockStatusColor(getStockStatus(product.stock))}`}>
              {getStockStatusLabel(getStockStatus(product.stock))}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-serif text-lg font-bold text-maroon">{product.name}</h3>
              {product.grade && (
                <span className="text-xs text-gray-500 font-medium">{product.grade}</span>
              )}
            </div>
            <span className="font-semibold text-maroon">₱{product.price.toLocaleString()}</span>
          </div>

          <p className="text-sm text-gray-600 flex-1 mb-4 line-clamp-2">{product.description}</p>

          {showAddToCart && (
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-2.5 px-4 rounded-full font-semibold transition-all ${
                product.stock === 0 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-maroon text-white hover:bg-maroon-dark hover:scale-105'
              }`}
            >
              {product.stock === 0 ? 'Out of Stock' : 'ADD TO CART'}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};