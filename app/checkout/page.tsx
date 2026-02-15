'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');

  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  });

  const [billingData, setBillingData] = useState({
    sameAsShipping: true,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'overnight'>('standard');

  const total = getCartTotal();
  const shippingCost =
    shippingMethod === 'express' ? 15 : shippingMethod === 'overnight' ? 30 : 5;
  const tax = Math.round(total * 0.08 * 100) / 100;
  const finalTotal = total + shippingCost + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      // Simulate order placement
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Order placed successfully!');
      router.push('/order-confirmation');
    } catch (error) {
      toast.error('Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0C0F]">
        <Navigation />
        <div className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="prime-headline mb-4">Your cart is empty</h1>
            <p className="text-prime-gray mb-8">Add items before proceeding to checkout</p>
            <Link href="/shop">
              <Button className="prime-btn-primary">Back to Shop</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0C0F]">
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="prime-headline mb-12">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step Indicator */}
              <div className="flex gap-4 mb-12">
                {(['shipping', 'payment', 'review'] as const).map((s, i) => (
                  <div key={s} className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step === s || ['shipping', 'payment', 'review'].indexOf(step) > i
                          ? 'bg-prime-violet text-white'
                          : 'bg-white/10 text-prime-gray'
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span className={step === s ? 'text-white font-bold' : 'text-prime-gray'}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </span>
                    {i < 2 && <div className="flex-1 h-0.5 bg-white/10" />}
                  </div>
                ))}
              </div>

              {/* Shipping Information */}
              {step === 'shipping' && (
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Shipping Address</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={shippingData.firstName}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, firstName: e.target.value })
                        }
                        className="prime-input"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={shippingData.lastName}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, lastName: e.target.value })
                        }
                        className="prime-input"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={shippingData.email}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, email: e.target.value })
                        }
                        className="prime-input sm:col-span-2"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={shippingData.phone}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, phone: e.target.value })
                        }
                        className="prime-input sm:col-span-2"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        value={shippingData.address}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, address: e.target.value })
                        }
                        className="prime-input sm:col-span-2"
                        required
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={shippingData.city}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, city: e.target.value })
                        }
                        className="prime-input"
                        required
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={shippingData.state}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, state: e.target.value })
                        }
                        className="prime-input"
                        required
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={shippingData.zip}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, zip: e.target.value })
                        }
                        className="prime-input"
                        required
                      />
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Shipping Method</h3>
                    <div className="space-y-3">
                      {[
                        { id: 'standard', label: 'Standard (5-7 days)', cost: 5 },
                        { id: 'express', label: 'Express (2-3 days)', cost: 15 },
                        { id: 'overnight', label: 'Overnight', cost: 30 },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className="flex items-center gap-4 p-4 border border-white/10 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                        >
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={shippingMethod === method.id}
                            onChange={(e) =>
                              setShippingMethod(e.target.value as any)
                            }
                            className="w-4 h-4"
                          />
                          <div className="flex-1">
                            <p className="text-white font-medium">{method.label}</p>
                          </div>
                          <span className="text-prime-violet font-bold">
                            ${method.cost}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full prime-btn-primary py-6">
                    Continue to Payment
                  </Button>
                </form>
              )}

              {/* Payment Information */}
              {step === 'payment' && (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Payment Method</h3>
                    <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="payment" value="card" defaultChecked className="w-4 h-4" />
                        <span className="text-white">Credit/Debit Card</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Name on Card"
                      className="prime-input w-full"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Card Number"
                      maxLength={19}
                      className="prime-input w-full"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        className="prime-input"
                        required
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        maxLength={4}
                        className="prime-input"
                        required
                      />
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div>
                    <label className="flex items-center gap-3 mb-4 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={billingData.sameAsShipping}
                        onChange={(e) =>
                          setBillingData({
                            ...billingData,
                            sameAsShipping: e.target.checked,
                          })
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-white">Same as shipping address</span>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep('shipping')}
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 prime-btn-primary"
                    >
                      Review Order
                    </Button>
                  </div>
                </form>
              )}

              {/* Review Order */}
              {step === 'review' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Order Review</h3>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-prime-gray">Shipping to:</span>
                        <span className="text-white">
                          {shippingData.firstName} {shippingData.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-prime-gray">Address:</span>
                        <span className="text-white text-right">
                          {shippingData.address}, {shippingData.city}, {shippingData.state}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-prime-gray">Method:</span>
                        <span className="text-white">{shippingMethod.charAt(0).toUpperCase() + shippingMethod.slice(1)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep('payment')}
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isLoading}
                      className="flex-1 prime-btn-primary disabled:opacity-50"
                    >
                      {isLoading ? 'Processing...' : 'Place Order'}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-32">
                <h3 className="text-lg font-bold text-white mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                  <div className="flex justify-between text-prime-gray">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-prime-gray">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-prime-gray">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-2xl font-bold text-prime-violet">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>

                {/* Order Items */}
                <div className="space-y-2 max-h-64 overflow-auto">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.color}`} className="flex justify-between text-sm text-prime-gray">
                      <span>{item.product.name} x {item.quantity}</span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
