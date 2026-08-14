// app/inventory/page.tsx
'use client';

import React, { useState } from 'react';
import { products } from '@/data/products';
import { Badge } from '@/components/ui/Badge';

export default function InventoryPage() {
  const [inventory, setInventory] = useState(
    products.map(p => ({
      ...p,
      status: p.stock === 0 ? 'out-of-stock' : p.stock <= 5 ? 'low-stock' : 'in-stock'
    }))
  );

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const updateStock = (id: string, newStock: number) => {
    setInventory(prev =>
      prev.map(item => {
        if (item.id === id) {
          const status = newStock === 0 ? 'out-of-stock' : newStock <= 5 ? 'low-stock' : 'in-stock';
          return { ...item, stock: newStock, status };
        }
        return item;
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif text-maroon mb-8">Inventory Management</h1>

      {/* Controls */}
      <div className="bg-white p-6 rounded-xl shadow-soft mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <table className="w-full">
          <thead className="bg-maroon text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Product</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Unit</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Adjust</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredInventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                <td className="px-6 py-4 font-semibold">{item.stock}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.unit}</td>
                <td className="px-6 py-4">
                  <Badge status={item.status as any} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateStock(item.id, Math.max(0, item.stock - 1))}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    >
                      -
                    </button>
                    <button
                      onClick={() => updateStock(item.id, item.stock + 1)}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}