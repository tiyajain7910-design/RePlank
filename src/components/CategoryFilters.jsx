import React from 'react';
import { CATEGORIES } from '../data/products.js';

export const CategoryFilters = ({ activeCategory, onSelectCategory, productsCountByCat }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-3">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = productsCountByCat[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-[#1b4332] text-[#f7f3ea] border-[#1b4332] shadow-sm'
                  : 'bg-[#ede5d6]/80 text-[#432818] border-[#dacbb7] hover:bg-[#e4d9c7]'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                isActive ? 'bg-[#52b788] text-[#1b4332]' : 'bg-[#dfd4c0] text-[#432818]'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
