'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { CartDrawer } from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Filter, Star, ChevronDown } from 'lucide-react';
import { useStore, Product } from '@/lib/store';
import { toast } from 'sonner';
import Link from 'next/link';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Street Essential Hoddie',
    price: 89,
    image: '/placeholder.svg?height=400&width=300',
    category: 'Oversized',
    description: 'Our signature oversized Hoddie crafted from 400gsm premium cotton fleece.',
    inStock: true,
  },
  {
    id: '2',
    name: 'Minimal Hoddie',
    price: 69,
    image: '/placeholder.svg?height=400&width=300',
    category: 'Minimal',
    description: 'Clean lines, essential comfort. Streamlined silhouette with subtle branding.',
    inStock: true,
  },
  {
    id: '3',
    name: 'Graphic Statement Hoddie',
    price: 99,
    image: '/placeholder.svg?height=400&width=300',
    category: 'Graphic',
    description: 'Limited edition graphic Hoddie with premium screen-printed artwork.',
    inStock: true,
  },
  {
    id: '4',
    name: 'Urban Tech Hoddie',
    price: 109,
    image: '/placeholder.svg?height=400&width=300',
    category: 'Tech',
    description: 'Moisture-wicking tech fabric perfect for active lifestyles.',
    inStock: true,
  },
  {
    id: '5',
    name: 'Premium Comfort Hoddie',
    price: 79,
    image: '/placeholder.svg?height=400&width=300',
    category: 'Premium',
    description: 'Ultra-soft premium comfort blend with relaxed fit.',
    inStock: true,
  },
  {
    id: '6',
    name: 'Classic Heritage Hoddie',
    price: 89,
    image: '/placeholder.svg?height=400&width=300',
    category: 'Heritage',
    description: 'Timeless classic design with heritage craftsmanship.',
    inStock: true,
  },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');
  const { addToCart } = useStore();

  // Get unique categories
  const categories = Array.from(new Set(PRODUCTS.map((p) => p.category)));

  // Filter and Sort Logic
  const filteredProducts = PRODUCTS.filter((p) => 
    selectedCategory ? p.category === selectedCategory : true
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) {
      toast.error('Product is out of stock');
      return;
    }

    addToCart({
      product,
      quantity: 1,
      color: 'Black',
      size: 'M',
    });

    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#0B0C0F]">
      <Navigation />

      {/* Header */}
      <div className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center lg:text-left">
          <h1 className="prime-headline mb-4 uppercase">The Shop</h1>
          <p className="prime-subheadline max-w-2xl">
            Premium Hoddies engineered for the modern wardrobe.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-10">
              
              {/* Sort Dropdown */}
              <div>
                <h3 className="text-xs font-black text-prime-gray uppercase tracking-widest mb-4">Sort By</h3>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm appearance-none focus:outline-none focus:border-prime-violet transition-colors cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-prime-gray pointer-events-none" />
                </div>
              </div>

              {/* Categories */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-4 h-4 text-prime-violet" />
                  <h3 className="text-xs font-black text-prime-gray uppercase tracking-widest">Categories</h3>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${
                      selectedCategory === null ? 'bg-prime-violet text-white shadow-lg shadow-prime-violet/20' : 'text-prime-gray hover:text-white hover:bg-white/5'
                    }`}
                  >
                    All Collection
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${
                        selectedCategory === cat ? 'bg-prime-violet text-white shadow-lg shadow-prime-violet/20' : 'text-prime-gray hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {sortedProducts.map((product) => (
                <div key={product.id} className="product-card group bg-white/5 border border-white/10 p-4">
                  <Link href={`/shop/${product.id}`} className="block relative aspect-[3/4] overflow-hidden rounded-xl bg-prime-charcoal mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white font-black text-sm uppercase tracking-tighter border-2 border-white/20 px-4 py-1">Sold Out</span>
                      </div>
                    )}
                  </Link>

                  <div className="space-y-1 mb-6">
                    <div className="flex justify-between items-start gap-4">
                      <Link href={`/shop/${product.id}`}>
                        <h3 className="font-bold text-white group-hover:text-prime-violet transition-colors uppercase leading-tight">{product.name}</h3>
                      </Link>
                      <span className="text-lg font-black text-white">${product.price}</span>
                    </div>
                    <p className="text-xs text-prime-gray line-clamp-2">{product.description}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="flex-1 prime-btn-primary h-11"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <div className="flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full">
                       <Star className="w-3 h-3 fill-prime-violet text-prime-violet" />
                       <span className="text-[10px] font-bold text-white">4.8</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-40 border-2 border-dashed border-white/10 rounded-3xl">
                <ShoppingBag className="w-12 h-12 text-prime-gray mx-auto mb-4 opacity-20" />
                <p className="text-prime-gray font-medium">No pieces found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CartDrawer />
    </div>
  );
}