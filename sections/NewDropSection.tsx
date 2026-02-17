'use client';

import { ArrowRight, ShoppingBag, Star } from 'lucide-react';
import { useStore } from '@/store/useStore'; // Removed 'products' import to use store state
import { toast } from 'sonner';
import { useEffect } from 'react';

interface NewDropSectionProps {
  onProductClick: (product: any) => void;
}

export function NewDropSection({ onProductClick }: NewDropSectionProps) {
  // 1. Get products and fetch function from the store
  const { products, fetchProducts, isLoading, addToCart, setIsCartOpen } = useStore();

  // 2. Fetch products if the list is empty
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  // 3. SAFETY CHECK: Get the first product, or null if it doesn't exist yet
  const product = products.length > 0 ? products[0] : null;

  const handleAddToCart = () => {
    if (!product) return;

    // Use optional chaining and fallbacks to prevent crashes
    const defaultColor = product.colors?.[0]?.name || 'Standard';
    const defaultSize = product.sizes?.[2] || product.sizes?.[0] || 'M';
    
    addToCart(product, defaultColor, defaultSize);
    setIsCartOpen(true);
    toast.success(`${product.name} added to cart!`);
  };

  // 4. LOADING STATE: Show a skeleton or nothing while waiting for Firebase
  if (isLoading || !product) {
    return (
      <section className="prime-section flex items-center justify-center bg-[#0B0C0F]">
        <div className="text-[#7B2FF7] animate-pulse font-bold">LOADING NEW DROP...</div>
      </section>
    );
  }

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
                  {product.rating} ({product.reviews?.toLocaleString()} reviews)
                </span>
              </div>

              <p className="text-[#A6ACB8] text-sm mb-6 line-clamp-2">
                {product.description}
              </p>

              {/* Colors */}
              <div className="mb-6">
                <p className="text-xs text-[#A6ACB8] uppercase tracking-wider mb-2">Colors</p>
                <div className="flex gap-2">
                  {product.colors?.map((color) => (
                    <div
                      key={color.name}
                      className="w-6 h-6 rounded-full border border-white/20"
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
                  <p className="text-3xl font-black text-white">{product.price} AED</p>
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
                    className="flex items-center gap-2 px-6 py-3 bg-[#7B2FF7] text-white rounded-full font-bold hover:bg-[#6a28d9] transition-all active:scale-95"
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