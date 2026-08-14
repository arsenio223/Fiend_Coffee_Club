// components/ui/Badge.tsx
import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  const variants = {
    'in-stock': 'bg-green-100 text-green-800',
    'low-stock': 'bg-orange-100 text-orange-800',
    'out-of-stock': 'bg-red-100 text-red-800'
  };

  const labels = {
    'in-stock': 'In Stock',
    'low-stock': 'Low Stock',
    'out-of-stock': 'Out of Stock'
  };

  return (
    <span className={clsx('px-3 py-1 rounded-full text-sm font-medium', variants[status])}>
      {children || labels[status]}
    </span>
  );
};