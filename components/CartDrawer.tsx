'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '@/store/useStore'; 
import { toast } from 'sonner';

export function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    getCartTotal, 
    clearCart 
  } = useStore();

  const total = getCartTotal();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setIsCartOpen(false);
    window.location.href = '/checkout';
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg bg-[#0B0C0F] border-l border-white/10 flex flex-col p-0">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <SheetHeader>
            <SheetTitle className="text-white flex items-center gap-3 text-xl uppercase italic font-black">
              <ShoppingBag className="w-5 h-5 text-[#7B2FF7]" />
              Your Bag
              {cart.length > 0 && (
                <span className="ml-auto text-[10px] font-bold text-[#A6ACB8] bg-white/5 border border-white/10 px-2 py-1 rounded-full uppercase tracking-widest">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
              )}
            </SheetTitle>
          </SheetHeader>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-[#3d3f44]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase italic">Your bag is empty</h3>
              <p className="text-[#A6ACB8] mb-8">Looks like you haven't added anything yet.</p>
              <Button 
                onClick={() => setIsCartOpen(false)}
                className="prime-btn-primary px-8 py-6 rounded-xl font-black uppercase italic"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.color}-${item.size}-${index}`}
                  className="flex gap-4 group animate-in fade-in slide-in-from-right-4 duration-300"
                >
                  <div className="relative w-24 h-28 flex-shrink-0 overflow-hidden rounded-xl bg-white/5 border border-white/5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="text-white font-bold leading-tight uppercase tracking-tight text-sm">
                          {item.product.name}
                        </h4>
                        <p className="text-[10px] text-[#7B2FF7] font-black uppercase mt-1 tracking-widest">
                          {item.color} <span className="mx-1 text-white/20">•</span> {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.color, item.size)}
                        className="p-1 text-[#A6ACB8] hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.color, item.size, item.quantity - 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white text-xs font-bold w-7 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.color, item.size, item.quantity + 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-white font-black italic">
                        {(item.product.price * item.quantity).toLocaleString()} AED
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {cart.length > 0 && (
          <div className="p-6 bg-white/[0.02] border-t border-white/10 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest">
                <span className="text-[#A6ACB8]">Subtotal</span>
                <span className="text-white font-bold">{total.toLocaleString()} AED</span>
              </div>
              <div className="flex items-center justify-between text-xs uppercase tracking-widest">
                <span className="text-[#A6ACB8]">Shipping</span>
                <span className="text-[#00FF94] font-black text-[9px]">Free over 350 AED</span>
              </div>
              <div className="flex items-center justify-between text-2xl font-black pt-2 italic">
                <span className="text-white uppercase text-xl">Total</span>
                <span className="text-[#7B2FF7]">{total.toLocaleString()} AED</span>
              </div>
            </div>
            
            <div className="grid gap-3 pt-2">
              <Button 
                onClick={handleCheckout}
                className="w-full py-7 text-lg uppercase tracking-widest font-black italic bg-[#7B2FF7] hover:bg-[#6a28d9] text-white rounded-xl"
              >
                Checkout Now
              </Button>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-1/4 border-white/5 bg-white/5 text-[#A6ACB8] hover:bg-red-500/20 hover:text-red-400 border-none rounded-xl"
                  title="Clear Cart"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsCartOpen(false)}
                  className="flex-1 border-white/10 bg-transparent text-white hover:bg-white/5 rounded-xl uppercase font-bold text-xs"
                >
                  Back to Shop
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}