'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  category?: string;
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color: string;
  size: string;
  customizations?: {
    baseColor?: string;
    decalImage?: string;
    decalPosition?: { x: number; y: number };
    decalScale?: number;
  };
}

export interface WishlistItem {
  product: Product;
  addedAt: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

interface StoreState {
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  getCartCount: () => number;
  getCartTotal: () => number;
  clearCart: () => void;

  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // User
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      isCartOpen: false,
      setIsCartOpen: (open) => set({ isCartOpen: open }),
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) =>
              cartItem.product.id === item.product.id &&
              cartItem.color === item.color &&
              cartItem.size === item.size
          );

          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem === existingItem
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem
              ),
            };
          }

          return { cart: [...state.cart, item] };
        }),
      removeFromCart: (productId, color, size) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.color === color &&
                item.size === size
              )
          ),
        })),
      updateQuantity: (productId, color, size, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: state.cart.filter(
                (item) =>
                  !(
                    item.product.id === productId &&
                    item.color === color &&
                    item.size === size
                  )
              ),
            };
          }
          return {
            cart: state.cart.map((item) =>
              item.product.id === productId &&
              item.color === color &&
              item.size === size
                ? { ...item, quantity }
                : item
            ),
          };
        }),
      getCartCount: () => get().cart.reduce((total, item) => total + item.quantity, 0),
      getCartTotal: () =>
        get().cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
      clearCart: () => set({ cart: [] }),

      // Wishlist
      wishlist: [],
      addToWishlist: (product) =>
        set((state) => {
          if (state.wishlist.some((item) => item.product.id === product.id)) {
            return state;
          }
          return {
            wishlist: [
              ...state.wishlist,
              { product, addedAt: Date.now() },
            ],
          };
        }),
      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.product.id !== productId),
        })),
      isInWishlist: (productId) =>
        get().wishlist.some((item) => item.product.id === productId),

      // User
      user: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      isAuthenticated: false,
    }),
    {
      name: 'prime-hoddie-store',
    }
  )
);
