'use client';

import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/useStore';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useStore();
  
  const total = getCartTotal();
  // Adjusted for AED: Free shipping over 350 AED, else 25 AED shipping
  const shipping = total > 350 ? 0 : 25; 
  // Adjusted for UAE: 5% VAT
  const tax = Math.round(total * 0.05 * 100) / 100;
  const finalTotal = total + shipping + tax;

  return (
    <div className="min-h-screen bg-[#0B0C0F]">
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-12 uppercase tracking-tighter">
            Your <span className="text-[#7B2FF7]">Bag</span>
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-[#A6ACB8]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Your cart is empty</h3>
              <p className="text-[#A6ACB8] mb-8">Add some heat to your wardrobe to get started.</p>
              <Link href="/shop">
                <Button className="bg-[#7B2FF7] hover:bg-[#6a28d9] text-white px-8 py-6 rounded-xl font-bold uppercase italic">
                  Explore Shop
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.color}-${item.size}-${index}`}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:border-[#7B2FF7]/30"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full sm:w-24 h-32 object-cover rounded-xl"
                      />

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                              {item.product.name}
                            </h3>
                            <p className="text-xs font-medium text-[#7B2FF7] uppercase tracking-widest mt-1">
                              {item.color} // Size {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.color, item.size)}
                            className="p-2 text-[#A6ACB8] hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center gap-1 bg-black/40 rounded-lg p-1 border border-white/5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.color, item.size, item.quantity - 1)}
                              className="w-8 h-8 rounded-md flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-white font-bold w-10 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.color, item.size, item.quantity + 1)}
                              className="w-8 h-8 rounded-md flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-black text-white">
                              {(item.product.price * item.quantity).toLocaleString()} AED
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-32">
                  <h3 className="text-xl font-bold text-white mb-6 uppercase italic">Summary</h3>
                  <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                    <div className="flex justify-between text-[#A6ACB8]">
                      <span>Subtotal</span>
                      <span className="text-white">{total.toLocaleString()} AED</span>
                    </div>
                    <div className="flex justify-between text-[#A6ACB8]">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? <span className="text-green-400 font-bold uppercase">Free</span> : `${shipping} AED`}</span>
                    </div>
                    <div className="flex justify-between text-[#A6ACB8]">
                      <span>VAT (5%)</span>
                      <span className="text-white">{tax.toLocaleString()} AED</span>
                    </div>
                  </div>

                  <div className="flex justify-between mb-8">
                    <span className="text-white font-bold uppercase">Total</span>
                    <span className="text-3xl font-black text-[#7B2FF7]">
                      {finalTotal.toLocaleString()} AED
                    </span>
                  </div>

                  <Link href="/checkout" className="block mb-4">
                    <Button className="w-full bg-[#7B2FF7] hover:bg-[#6a28d9] text-white py-7 rounded-xl font-black uppercase tracking-widest italic">
                      Checkout
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}