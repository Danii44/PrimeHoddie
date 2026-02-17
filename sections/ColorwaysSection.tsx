"use client";

import { useState, useEffect } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

export function ColorwaysSection() {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  
  // 1. Get state and actions from the unified store
  const { products, fetchProducts, isLoading, addToCart, setIsCartOpen } = useStore();
  
  // 2. Fetch products if the store is empty
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  // 3. SAFETY CHECK: Get the first product safely
  const product = products.length > 0 ? products[0] : null;

  // 4. Handle undefined colors safely
  const selectedColor = product?.colors?.[selectedColorIndex];

  const handleAddToCart = () => {
    if (!product || !selectedColor) return;

    // Use default size M or fallback to first available
    const size = product.sizes?.[2] || product.sizes?.[0] || 'M';
    
    addToCart(product, selectedColor.name, size);
    setIsCartOpen(true);
    toast.success(`${product.name} in ${selectedColor.name} added to cart!`);
  };

  // 5. GUARD: Prevent crash while data is fetching
  if (isLoading || !product || !selectedColor) {
    return <section className="py-24 bg-[#0B0C0F] min-h-[400px]" />;
  }

  return (
    <section
      id="colorways"
      className="relative py-24 lg:py-32 bg-[#0B0C0F]"
      style={{ zIndex: 80 }}
    >
      <div className="prime-container">
        {/* Title Section */}
        <div className="text-center mb-12 lg:mb-16 animate-fade-in-up">
          <h2 className="prime-headline text-white mb-4">
            CHOOSE YOUR <span className="text-[#7B2FF7]">COLOR</span>
          </h2>
          <p className="prime-subheadline max-w-xl mx-auto">
            Express yourself. Multiple colors, same premium quality.
          </p>
        </div>

        {/* Product Display */}
        <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          
          {/* Product Image Display */}
          <div className="relative aspect-square max-w-md mx-auto mb-8">
            {/* Glow Effect Background */}
            <div className="absolute inset-0 bg-[#7B2FF7]/10 blur-[100px] rounded-full" />
            
            <img
              src={selectedColor.image}
              alt={`${product.name} in ${selectedColor.name}`}
              className="relative z-10 w-full h-full object-contain transition-all duration-500 ease-in-out"
            />
          </div>

          {/* Color Selection Dots */}
          <div className="flex justify-center gap-4 mb-8">
            {product.colors.map((color, index) => (
              <button
                key={color.name}
                onClick={() => setSelectedColorIndex(index)}
                className={`relative w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  selectedColorIndex === index
                    ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {selectedColorIndex === index && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Product Pricing and CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">
              {selectedColor.name}
            </h3>
            <p className="text-3xl font-black text-[#7B2FF7] mb-6">
              {product.price} AED
            </p>
            
            <button
              onClick={handleAddToCart}
              className="prime-btn-primary group flex items-center gap-2 mx-auto"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}