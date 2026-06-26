import React from 'react';
import FoodCard from './FoodCard';

export default function MenuGrid({ items, onAdd }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
        <p className="text-sm text-slate-400">No items match your active dynamic filter choices.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map(item => (
        <FoodCard key={item.id} item={item} onAdd={onAdd} />
      ))}
    </div>
  );
}
