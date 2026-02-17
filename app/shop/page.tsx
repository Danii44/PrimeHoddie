'use client';

import { useEffect, useState, useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';

export default function ShopPage() {
  const { products, fetchProducts, isLoading, addToCart } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // FIX: Safely extract categories to avoid TS errors
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)))
      .filter((cat): cat is string => typeof cat === 'string');
  }, [products]);

  const filteredProducts = products.filter((p) => 
    selectedCategory ? p.category === selectedCategory : true
  );

  return (
    <div className="min-h-screen bg-[#0B0C0F] text-white">
      <Navigation />



      <main className="max-w-7xl mx-auto pt-32 px-4 pb-20">
        <h1 className="text-7xl font-black uppercase tracking-tighter mb-12">
          The <span className="text-[#7B2FF7]">Collection</span>
        </h1>

        <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-8 py-3 rounded-2xl font-bold transition-all ${
              selectedCategory === null ? 'bg-[#7B2FF7]' : 'bg-white/5'
            }`}
          >
            All Items
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-2xl font-bold transition-all uppercase ${
                selectedCategory === cat ? 'bg-[#7B2FF7]' : 'bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#7B2FF7]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white/5 border border-white/10 p-5 rounded-[2.5rem] group hover:bg-white/[0.08] transition-all">
                <div className="aspect-[3/4] overflow-hidden rounded-[1.8rem] mb-6">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex justify-between items-start mb-6 px-1">
                  <div>
                    <h3 className="font-bold text-xl uppercase tracking-tight">{product.name}</h3>
                    <p className="text-white/40 text-xs font-bold uppercase">{product.category}</p>
                  </div>
                  <span className="font-black text-2xl text-[#7B2FF7]">{product.price} AED</span>
                </div>
                <Button 
                  onClick={() => addToCart({
                    product,
                    quantity: 1,
                    color: product.colors?.[0]?.name || 'Standard',
                    size: 'M'
                  })}
                  className="w-full bg-white text-black hover:bg-[#7B2FF7] hover:text-white font-black py-7 rounded-2xl transition-all uppercase"
                >
                  Add to Bag
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}