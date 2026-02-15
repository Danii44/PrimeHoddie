'use client';

import { ShoppingBag, Sparkles } from 'lucide-react';
import { useStore, products } from '@/store/useStore';
import { toast } from 'sonner';

export function StudioDetailSection() {
  const { addToCart } = useStore();
  const product = products[0];

  const handleAddToCart = () => {
    const color = product.colors[0].name;
    const size = product.sizes[2];
    addToCart(product, color, size);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <section
      id="studio"
      className="prime-section relative overflow-hidden"
      style={{ zIndex: 70 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/backgrounds/studio-bg.jpg"
          alt="Studio Detail"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0F]/90 via-[#0B0C0F]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full prime-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
          <div>
            <div className="animate-fade-in-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7B2FF7]/20 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#7B2FF7]" />
                <span className="text-sm font-bold text-[#7B2FF7]">Premium Quality</span>
              </div>
              
              <h2 className="prime-headline text-white mb-6">
                PREMIUM
                <br />
                <span className="text-[#7B2FF7]">COTTON</span>
              </h2>
              
              <p className="prime-subheadline max-w-md mb-8">
                Soft inside. Clean drape. Made to wear on repeat. 
                Our premium cotton fleece feels as good as it looks.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 animate-fade-in-left" style={{ animationDelay: '200ms' }}>
              <div>
                <p className="text-sm text-[#A6ACB8] mb-1">Starting from</p>
                <p className="text-4xl font-black text-white">${product.price}</p>
              </div>
              <button
                onClick={handleAddToCart}
                className="prime-btn-primary"
              >
                <ShoppingBag className="w-4 h-4" />
                Buy Now
              </button>
            </div>
          </div>

          {/* Right Content - Empty for background visibility */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
