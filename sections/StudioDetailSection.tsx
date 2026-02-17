'use client';

import { ShoppingBag, Sparkles } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';
import { useEffect } from 'react';

export function StudioDetailSection() {
  // 1. Pull everything from the store hook
  const { products, fetchProducts, addToCart, setIsCartOpen } = useStore();

  // 2. Fetch if data isn't there yet
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  // 3. SAFETY CHECK: Get the first product safely
  const product = products.length > 0 ? products[0] : null;

  const handleAddToCart = () => {
    if (!product) return;

    // Use optional chaining for safe access
    const color = product.colors?.[0]?.name || 'Standard';
    const size = product.sizes?.[2] || product.sizes?.[0] || 'M';
    
    addToCart(product, color, size);
    
    // Open the cart so the user sees the item was added
    setIsCartOpen(true);
    
    toast.success(`${product.name} added to cart!`);
  };

  // 4. GUARD: If the data hasn't arrived yet, show a clean placeholder instead of crashing
  if (!product) {
    return <section className="h-[300px] bg-[#0B0C0F]" />;
  }

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
                <p className="text-4xl font-black text-white">{product.price} AED</p>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 px-8 py-4 bg-[#7B2FF7] text-white rounded-full font-bold hover:bg-[#6a28d9] transition-all"
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