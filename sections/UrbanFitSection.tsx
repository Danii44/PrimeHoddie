'use client';

import { ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';
import { useEffect } from 'react';

export function UrbanFitSection() {
  // Destructure state and actions from the store
  const { 
    products, 
    fetchProducts, 
    isLoading, 
    addToCart, 
    selectedSize, 
    setSelectedSize, 
    setIsCartOpen 
  } = useStore();
  
  // 1. Fetch products on mount if they don't exist
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  // 2. Safety Check: Get the product only if the array is populated
  const product = products.length > 0 ? products[0] : null;

  const handleAddToCart = () => {
    if (!product) return;

    // Use selected size or fallback to the 3rd size in the list (usually 'L' or 'XL')
    const size = selectedSize || product.sizes?.[2] || product.sizes?.[0];
    const color = product.colors?.[0]?.name || 'Standard';

    addToCart(product, color, size);
    setIsCartOpen(true);
    toast.success(`${product.name} added to cart!`);
  };

  // 3. Return null or a skeleton if product is missing to prevent crash
  if (!product) {
    return (
      <section className="h-[400px] flex items-center justify-center bg-[#0B0C0F]">
        <div className="animate-pulse text-[#7B2FF7]">Loading Urban Fit...</div>
      </section>
    );
  }

  return (
    <section
      id="urban"
      className="prime-section relative overflow-hidden"
      style={{ zIndex: 50 }}
    >
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/backgrounds/urban-bg.jpg"
          alt="Urban Fit Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0F]/80 via-transparent to-[#0B0C0F]/60" />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full prime-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          
          {/* Left Side: Branding/Copy */}
          <div className="animate-fade-in-left">
            <h2 className="prime-headline text-white mb-6">
              URBAN
              <br />
              <span className="text-[#7B2FF7]">FIT</span>
            </h2>
            
            <p className="prime-subheadline max-w-md">
              Roomy where it matters. Clean silhouette. 
              Designed for the streets, crafted for comfort.
            </p>
          </div>

          {/* Right Side: Quick Action Card */}
          <div className="flex justify-end">
            <div className="w-full max-w-sm prime-glass rounded-3xl p-6 animate-fade-in-right">
              
              {/* Product Quick View */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-xl bg-white/5"
                />
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">{product.name}</h3>
                  <p className="text-[#A6ACB8] text-sm">{product.colors?.[0]?.name}</p>
                  <p className="text-xl font-black text-[#7B2FF7] mt-1">{product.price} AED</p>
                </div>
              </div>

              {/* Size Selection Grid */}
              <div className="mb-6">
                <p className="text-xs text-[#A6ACB8] uppercase tracking-wider mb-3 font-bold">
                  Select Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        selectedSize === size 
                          ? 'bg-[#7B2FF7] border-[#7B2FF7] text-white' 
                          : 'border-white/10 text-[#A6ACB8] hover:border-white/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <button
                onClick={handleAddToCart}
                className="w-full px-6 py-4 bg-[#7B2FF7] text-white rounded-xl font-bold flex items-center justify-center gap-2 group hover:bg-[#6a28d9] transition-all"
              >
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                Add to Bag
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}