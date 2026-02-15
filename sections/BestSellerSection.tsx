'use client';

import { ArrowRight, Star, TrendingUp } from 'lucide-react';
import { products } from '@/store/useStore';

// --- FIX: Updated interface to accept the product argument ---
interface BestSellerSectionProps {
  onProductClick: (product: any) => void;
}

export function BestSellerSection({ onProductClick }: BestSellerSectionProps) {
  // Selecting the specific product to pass to the handler
  const product = products[0];

  return (
    <section
      id="bestseller"
      className="prime-section relative overflow-hidden"
      style={{ zIndex: 60 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/backgrounds/bestseller-bg.jpg"
          alt="Best Seller"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F] via-[#0B0C0F]/50 to-[#0B0C0F]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full prime-container">
        <div className="flex flex-col justify-end min-h-screen py-20 pb-32">
          {/* Headline */}
          <div className="mb-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7B2FF7]/20 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-[#7B2FF7]" />
              <span className="text-sm font-bold text-[#7B2FF7]">Best Seller</span>
            </div>
            
            <h2 className="prime-headline text-white mb-4">
              THE Hoddie THAT
              <br />
              <span className="text-[#7B2FF7]">STARTED IT ALL</span>
            </h2>
            
            <p className="prime-subheadline max-w-md">
              Restocked weekly. Loved by thousands. 
              Experience why everyone is talking about Prime.
            </p>
          </div>

          {/* CTA Row */}
          <div className="flex flex-wrap items-center gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <button 
              // --- FIX: Pass the product object back to the handler ---
              onClick={() => onProductClick(product)}
              className="prime-btn-primary group"
            >
              Shop Best Sellers
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="flex items-center gap-2 text-[#A6ACB8] hover:text-white transition-colors">
              <Star className="w-5 h-5" />
              <span>See {product.reviews.toLocaleString()} reviews</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-lg animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            {[
              { value: '50K+', label: 'Sold' },
              { value: '4.9', label: 'Rating' },
              { value: '98%', label: 'Recommend' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl lg:text-4xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-sm text-[#A6ACB8]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}