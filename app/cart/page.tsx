'use client';

import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useStore();
  const total = getCartTotal();
  const shipping = total > 100 ? 0 : 15;
  const tax = Math.round(total * 0.08 * 100) / 100;
  const finalTotal = total + shipping + tax;

  return (
    <div className="min-h-screen bg-[#0B0C0F]">
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-12">Shopping Cart</h1>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-[#A6ACB8]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Your cart is empty</h3>
              <p className="text-[#A6ACB8] mb-8">Add some items to get started</p>
              <Link href="/shop">
                <Button className="prime-btn-primary">
                  Continue Shopping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.color}-${item.size}`}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-32 object-cover rounded-lg"
                      />

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-[#A6ACB8] mb-4">
                          Color: {item.color} | Size: {item.size}
                        </p>

                        {/* Customizations (if any) */}
                        {item.customizations && (
                          <div className="mb-4 p-3 bg-[#7B2FF7]/10 rounded-lg border border-[#7B2FF7]/20">
                            <p className="text-xs text-[#A6ACB8] mb-2">Custom Hoddie</p>
                            <p className="text-sm text-[#7B2FF7] font-medium">
                              Additional customization fee applied
                            </p>
                          </div>
                        )}

                        {/* Quantity and Price */}
                        <div className="flex items-end justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.color,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-white font-bold w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.color,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#7B2FF7]">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-xs text-[#A6ACB8]">
                              ${item.product.price} each
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() =>
                          removeFromCart(item.product.id, item.color, item.size)
                        }
                        className="p-2 text-[#A6ACB8] hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-32">
                  <h3 className="text-lg font-bold text-white mb-6">Order Summary</h3>

                  <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                    <div className="flex justify-between text-[#A6ACB8]">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#A6ACB8]">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-400">Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#A6ACB8]">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between mb-6">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-2xl font-bold text-[#7B2FF7]">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>

                  <Link href="/checkout" className="block mb-4">
                    <Button className="w-full prime-btn-primary py-6">
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>

                  <Link href="/shop">
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      Continue Shopping
                    </Button>
                  </Link>

                  {shipping === 0 && (
                    <p className="text-xs text-green-400 mt-4 text-center">
                      You qualified for free shipping!
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
