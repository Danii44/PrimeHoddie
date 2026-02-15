'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { CartDrawer } from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Star, ShoppingBag } from 'lucide-react';
import { useStore, Product } from '@/lib/store';
import { toast } from 'sonner';
import Link from 'next/link';

// Mock product - replace with Firestore data later
const MOCK_PRODUCT: Product = {
  id: '1',
  name: 'Street Essential Hoddie',
  price: 89,
  image: '/placeholder.svg?height=600&width=500',
  category: 'Oversized',
  description: 'Our signature oversized Hoddie crafted from 400gsm premium cotton fleece. Features dropped shoulders, double-stitched hem, and a relaxed fit that moves with you.',
  inStock: true,
};

const COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'Gray', value: '#808080' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Navy', value: '#001F3F' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(COLORS[0].name);
  const [selectedSize, setSelectedSize] = useState(SIZES[2]);
  const { addToCart, addToWishlist, isInWishlist } = useStore();
  const isWishlisted = isInWishlist(MOCK_PRODUCT.id);

  const handleAddToCart = () => {
    addToCart({
      product: MOCK_PRODUCT,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
    toast.success('Added to cart!');
  };

  const handleWishlist = () => {
    addToWishlist(MOCK_PRODUCT);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="min-h-screen bg-[#0B0C0F]">
      <Navigation />

      {/* Product Detail */}
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <div>
              <div className="bg-gradient-to-b from-white/10 to-transparent rounded-2xl p-8 mb-6">
                <img
                  src={MOCK_PRODUCT.image}
                  alt={MOCK_PRODUCT.name}
                  className="w-full h-auto"
                />
              </div>

              {/* Color Selector */}
              <div>
                <h3 className="text-white font-bold mb-4">Available Colors</h3>
                <div className="flex gap-4">
                  {COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? 'border-white scale-110'
                          : 'border-white/20 hover:border-white/50'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col justify-center">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-4xl lg:text-5xl font-black text-white mb-2">
                  {MOCK_PRODUCT.name}
                </h1>
                <p className="text-[#A6ACB8]">{MOCK_PRODUCT.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#7B2FF7] text-[#7B2FF7]"
                    />
                  ))}
                </div>
                <span className="text-[#A6ACB8]">(128 reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <p className="text-4xl font-bold text-[#7B2FF7]">
                  ${MOCK_PRODUCT.price}
                </p>
                {MOCK_PRODUCT.inStock ? (
                  <p className="text-green-400 text-sm mt-2">In Stock</p>
                ) : (
                  <p className="text-red-400 text-sm mt-2">Out of Stock</p>
                )}
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-white font-bold mb-4">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-[#7B2FF7] text-white'
                          : 'bg-white/5 border border-white/10 text-white hover:border-white/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-white font-bold mb-4">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
                  >
                    −
                  </button>
                  <span className="text-white font-bold text-lg w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                <Button
                  onClick={handleAddToCart}
                  disabled={!MOCK_PRODUCT.inStock}
                  className="flex-1 prime-btn-primary py-6 disabled:opacity-50"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleWishlist}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-6 py-6"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-6 py-6"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="border-t border-white/10 pt-8 space-y-4">
                <div>
                  <h4 className="text-white font-bold mb-2">Premium Quality</h4>
                  <p className="text-prime-gray">Made from 100% organic cotton with reinforced seams</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Free Shipping</h4>
                  <p className="text-prime-gray">On orders over $100, delivered within 5-7 business days</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">30-Day Returns</h4>
                  <p className="text-prime-gray">Hassle-free returns if you're not completely satisfied</p>
                </div>
              </div>

              {/* Related Links */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <Link href="/shop" className="text-[#7B2FF7] hover:underline">
                  ← Back to Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CartDrawer />
    </div>
  );
}
