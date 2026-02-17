'use client';

import { ArrowRight, Star, TrendingUp } from 'lucide-react';
import { useStore } from '@/store/useStore'; // Use the hook to get live state
import { useEffect } from 'react';

interface BestSellerSectionProps {
  onProductClick: (product: any) => void;
}

export function BestSellerSection({ onProductClick }: BestSellerSectionProps) {
  // 1. Get products and fetch function from the store
  const { products, fetchProducts } = useStore();

  // 2. Fetch products if the store is empty
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  // 3. SAFETY CHECK: Find the bestseller or fallback to the first product
  const product = products.find(p => p.isBestseller) || products[0];

  // 4. GUARD: If still loading/undefined, return null or a skeleton to prevent crash
  if (!product) {
    return <div className="min-h-[200px] bg-[#0B0C0F]" />; 
  }

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
              THE HOODIE THAT
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
              onClick={() => onProductClick(product)}
              className="px-8 py-4 bg-[#7B2FF7] text-white rounded-full font-bold flex items-center gap-2 group hover:bg-[#6a28d9] transition-all"
            >
              Shop Best Sellers
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="flex items-center gap-2 text-[#A6ACB8] hover:text-white transition-colors">
              <Star className="w-5 h-5" />
              <span>See {product.reviews?.toLocaleString() || '0'} reviews</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-lg animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            {[
              { value: '50K+', label: 'Sold' },
              { value: product.rating?.toString() || '4.9', label: 'Rating' },
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