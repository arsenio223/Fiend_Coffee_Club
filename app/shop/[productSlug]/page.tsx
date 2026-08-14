// app/shop/[productSlug]/page.tsx
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductBySlug } from '@/data/products';
import { useCart } from '@/components/CartProvider';
import { useState } from 'react';

export default function ProductPage({ params }: { params: { productSlug: string } }) {
  const product = getProductBySlug(params.productSlug);
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const getEmoji = () => {
    if (product.category === 'matcha') return '🍵';
    if (product.category === 'milk') return '🥛';
    if (product.category === 'sweetener') return '🍯';
    return '☕';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-soft p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image - Larger and showing full image */}
          <div className="bg-gradient-to-br from-maroon/5 to-maroon/10 rounded-xl flex items-center justify-center overflow-hidden relative min-h-[400px]">
            {!imageError ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-6"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <span className="text-8xl">{getEmoji()}</span>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-serif text-maroon">{product.name}</h1>
            {product.grade && (
              <p className="text-sm text-gray-500 mt-1">{product.grade}</p>
            )}
            <p className="text-3xl font-bold text-maroon mt-4">₱{product.price.toLocaleString()}</p>
            <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>

            <div className="mt-6 space-y-2 text-sm">
              <p><span className="font-semibold text-maroon">Category:</span> {product.category}</p>
              <p><span className="font-semibold text-maroon">Stock:</span> {product.stock} {product.unit}</p>
              <p><span className="font-semibold text-maroon">Unit:</span> {product.unit}</p>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`mt-8 px-8 py-3 rounded-full font-semibold transition-all ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-maroon text-white hover:bg-maroon-dark hover:scale-105'
              }`}
            >
              {product.stock === 0 ? 'Out of Stock' : 'ADD TO CART'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}