'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { db } from './firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  category: string;
  inStock: boolean;
  colors?: { name: string; value: string; image: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  color: string;
  size: string;
  customizations?: any;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

interface StoreState {
  products: Product[];
  isLoading: boolean;
  cart: CartItem[];
  user: User | null;
  isAuthenticated: boolean;
  isCartOpen: boolean;
  // Actions
  fetchProducts: () => Promise<void>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  setUser: (user: User | null) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  // Helpers
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: [],
      isLoading: false,
      cart: [],
      user: null,
      isAuthenticated: false,
      isCartOpen: false,

      fetchProducts: async () => {
        set({ isLoading: true });
        try {
          const q = query(collection(db, 'products'), orderBy('name', 'asc'));
          const snapshot = await getDocs(q);
          const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
          set({ products: items, isLoading: false });
        } catch (error) {
          console.error("Fetch error:", error);
          set({ isLoading: false });
        }
      },

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      addToCart: (newItem) => set((state) => {
        // Check if item already exists with same color and size
        const existingItemIndex = state.cart.findIndex(
          (item) => 
            item.product.id === newItem.product.id && 
            item.color === newItem.color && 
            item.size === newItem.size
        );

        if (existingItemIndex > -1) {
          const newCart = [...state.cart];
          newCart[existingItemIndex].quantity += newItem.quantity;
          return { cart: newCart };
        }
        return { cart: [...state.cart, newItem] };
      }),

      removeFromCart: (productId, color, size) => set((state) => ({
        cart: state.cart.filter(
          (item) => !(item.product.id === productId && item.color === color && item.size === size)
        ),
      })),

      updateQuantity: (productId, color, size, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
          item.product.id === productId && item.color === color && item.size === size
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        ),
      })),

      getCartTotal: () => {
        return get().cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      },

      getCartCount: () => {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'prime-hoodie-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart, user: state.user }),
    }
  )
);