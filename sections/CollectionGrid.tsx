'use client';

import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/store/useStore';

interface CollectionGridProps {
  onProductClick: (productId: string) => void;
}

export function CollectionGrid({ onProductClick }: CollectionGridProps) {
  return (
    <section
      id="collection"
      className="relative py-24 lg:py-32 bg-[#0B0C0F]"
      style={{ zIndex: 40 }}
    >
      <div className="prime-container">
        {/* Title */}
        <div className="mb-12 lg:mb-16 animate-fade-in-up">
          <h2 className="prime-headline text-white mb-4">
            COLLECTION
          </h2>
          <p className="prime-subheadline max-w-xl">
            Oversized, minimal, graphic—built for everyday rotation. 
            Find your perfect style.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`category-card group relative overflow-hidden rounded-2xl cursor-pointer animate-fade-in-up ${
                index === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onProductClick('1')}
            >
              {/* Background Image */}
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F] via-[#0B0C0F]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-[#A6ACB8] mb-1">{category.count} Products</p>
                    <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-[#7B2FF7] transition-colors">
                      {category.name}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#7B2FF7]/50 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
