import React from 'react';
import { Plus } from 'lucide-react';

export default function FoodCard({ item, onAdd }) {
  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      <div className="overflow-hidden relative aspect-[4/3] bg-slate-100 dark:bg-slate-800">
        <img 
          src={item.img} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-4">
          <h4 className="font-semibold text-sm sm:text-base group-hover:text-orange-500 transition-colors line-clamp-1">
            {item.name}
          </h4>
          <span className="font-bold text-orange-500 whitespace-nowrap text-sm sm:text-base">
            ${item.price.toFixed(2)}
          </span>
        </div>
        
        <button
          onClick={() => onAdd(item)}
          className="mt-auto w-full py-2 bg-slate-50 border border-slate-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-orange-500 dark:hover:text-white dark:hover:border-orange-500 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
        >
          <Plus size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
