'use client';

import { ArrowRight, ShoppingBag, Star } from 'lucide-react';
import { useStore, products } from '@/store/useStore';
import { toast } from 'sonner';

interface NewDropSectionProps {
  onProductClick: (product: any) => void;
}

export function NewDropSection({ onProductClick }: NewDropSectionProps) {
  // Added setIsCartOpen to the store destructuring
  const { addToCart, setSelectedColor, setIsCartOpen } = useStore();
  const product = products[0];

  const handleAddToCart = () => {
    const defaultColor = product.colors[0].name;
    const defaultSize = product.sizes[2];
    
    // 1. Add to state
    addToCart(product, defaultColor, defaultSize);
    
    // 2. FIX: Open the cart drawer automatically
    setIsCartOpen(true);
    
    // 3. Notify user
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <section
      id="newdrop"
      className="prime-section relative overflow-hidden"
      style={{ zIndex: 20 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/backgrounds/newdrop-bg.jpg"
          alt="New Drop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0F]/80 via-[#0B0C0F]/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full prime-container">
        <div className="flex justify-end items-center min-h-screen py-20">
          {/* Product Card */}
          <div
            className="w-full max-w-md prime-glass rounded-3xl p-6 lg:p-8 animate-fade-in-right"
            style={{ perspective: '1000px' }}
          >
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#7B2FF7]/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#7B2FF7] rounded-full animate-pulse" />
                <span className="text-xs font-bold text-[#7B2FF7] uppercase tracking-wider">New Drop</span>
              </div>

              {/* Product Image */}
              <div className="relative aspect-square mb-6 rounded-2xl overflow-hidden bg-white/5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <h3 className="text-2xl lg:text-3xl font-black text-white uppercase mb-2">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-[#A6ACB8]'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-[#A6ACB8]">
                  {product.rating} ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              <p className="text-[#A6ACB8] text-sm mb-6 line-clamp-2">
                {product.description}
              </p>

              {/* Colors */}
              <div className="mb-6">
                <p className="text-xs text-[#A6ACB8] uppercase tracking-wider mb-2">Colors</p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className="color-dot border-2 border-transparent hover:border-white transition-all"
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6ACB8]">Price</p>
                  <p className="text-3xl font-black text-white">${product.price}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onProductClick(product)}
                    className="px-4 py-3 border border-white/20 rounded-full text-white hover:bg-white/10 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="prime-btn-primary"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}