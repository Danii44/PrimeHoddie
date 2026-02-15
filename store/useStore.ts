import { useState, useCallback, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  colors: { name: string; value: string; image: string }[];
  sizes: string[];
  rating: number;
  reviews: number;
  description: string;
  features?: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color: string;
  size: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

// Sample Products Data
export const products: Product[] = [
  {
    id: '1',
    name: 'Street Essential Hoddie',
    price: 89,
    image: '/images/products/Hoddie-black.png',
    images: ['/images/products/Hoddie-black.png', '/images/products/Hoddie-gray.png', '/images/products/Hoddie-beige.png'],
    category: 'Oversized',
    colors: [
      { name: 'Midnight Black', value: '#1a1a1a', image: '/images/products/Hoddie-black.png' },
      { name: 'Charcoal Gray', value: '#4a4a4a', image: '/images/products/Hoddie-gray.png' },
      { name: 'Sand Beige', value: '#d4c4b0', image: '/images/products/Hoddie-beige.png' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviews: 2847,
    description: 'Our signature oversized Hoddie crafted from 400gsm premium cotton fleece. Features dropped shoulders, double-stitched hem, and a relaxed fit that moves with you.',
    features: ['400gsm Cotton Fleece', 'Oversized Fit', 'Dropped Shoulders', 'Double-Stitched Hem', 'Pre-Shrunk'],
    inStock: true,
    isNew: true,
    isBestseller: true,
  },
  {
    id: '2',
    name: 'Minimal Hoddie',
    price: 69,
    image: '/images/products/Hoddie-gray.png',
    images: ['/images/products/Hoddie-gray.png', '/images/products/Hoddie-black.png', '/images/products/Hoddie-navy.png'],
    category: 'Minimal',
    colors: [
      { name: 'Charcoal Gray', value: '#4a4a4a', image: '/images/products/Hoddie-gray.png' },
      { name: 'Midnight Black', value: '#1a1a1a', image: '/images/products/Hoddie-black.png' },
      { name: 'Navy Blue', value: '#1e3a5f', image: '/images/products/Hoddie-navy.png' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 1523,
    description: 'Clean lines, essential comfort. Our minimal Hoddie features a streamlined silhouette with subtle branding and premium soft-touch fabric.',
    features: ['320gsm Cotton Blend', 'Regular Fit', 'Ribbed Cuffs', 'Hidden Pockets'],
    inStock: true,
  },
  {
    id: '3',
    name: 'Graphic Statement Hoddie',
    price: 99,
    originalPrice: 119,
    image: '/images/products/Hoddie-navy.png',
    images: ['/images/products/Hoddie-navy.png', '/images/products/Hoddie-black.png', '/images/products/Hoddie-burgundy.png'],
    category: 'Graphic',
    colors: [
      { name: 'Navy Blue', value: '#1e3a5f', image: '/images/products/Hoddie-navy.png' },
      { name: 'Midnight Black', value: '#1a1a1a', image: '/images/products/Hoddie-black.png' },
      { name: 'Burgundy', value: '#722f37', image: '/images/products/Hoddie-burgundy.png' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 892,
    description: 'Make a statement with our limited edition graphic Hoddie. Features premium screen-printed artwork on heavyweight cotton.',
    features: ['450gsm Heavyweight Cotton', 'Oversized Fit', 'Premium Screen Print', 'Limited Edition'],
    inStock: true,
    isNew: true,
  },
  {
    id: '4',
    name: 'Winter Tech Hoddie',
    price: 119,
    image: '/images/products/Hoddie-olive.png',
    images: ['/images/products/Hoddie-olive.png', '/images/products/Hoddie-gray.png', '/images/products/Hoddie-black.png'],
    category: 'Winter',
    colors: [
      { name: 'Olive Green', value: '#556b2f', image: '/images/products/Hoddie-olive.png' },
      { name: 'Charcoal Gray', value: '#4a4a4a', image: '/images/products/Hoddie-gray.png' },
      { name: 'Midnight Black', value: '#1a1a1a', image: '/images/products/Hoddie-black.png' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviews: 634,
    description: 'Engineered for cold weather. Features thermal lining, wind-resistant outer shell, and water-repellent coating.',
    features: ['Thermal Lining', 'Wind Resistant', 'Water Repellent', '500gsm Fabric', 'Oversized Fit'],
    inStock: true,
  },
  {
    id: '5',
    name: 'Limited Edition Prime',
    price: 149,
    image: '/images/products/Hoddie-burgundy.png',
    images: ['/images/products/Hoddie-burgundy.png', '/images/products/Hoddie-black.png'],
    category: 'Limited',
    colors: [
      { name: 'Burgundy', value: '#722f37', image: '/images/products/Hoddie-burgundy.png' },
      { name: 'Midnight Black', value: '#1a1a1a', image: '/images/products/Hoddie-black.png' },
    ],
    sizes: ['M', 'L', 'XL'],
    rating: 5.0,
    reviews: 328,
    description: 'Our most exclusive release. Limited to 500 pieces worldwide, featuring premium materials and unique detailing.',
    features: ['500gsm Premium Fleece', 'Numbered Edition', 'Gold Hardware', 'Oversized Fit', 'Certificate of Authenticity'],
    inStock: true,
    isNew: true,
  },
  {
    id: '6',
    name: 'Classic Beige Hoddie',
    price: 79,
    image: '/images/products/Hoddie-beige.png',
    images: ['/images/products/Hoddie-beige.png', '/images/products/Hoddie-gray.png'],
    category: 'Classic',
    colors: [
      { name: 'Sand Beige', value: '#d4c4b0', image: '/images/products/Hoddie-beige.png' },
      { name: 'Charcoal Gray', value: '#4a4a4a', image: '/images/products/Hoddie-gray.png' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.6,
    reviews: 2104,
    description: 'Timeless style meets modern comfort. Our classic Hoddie in versatile neutral tones.',
    features: ['350gsm Cotton Fleece', 'Regular Fit', 'Classic Design', 'Pre-Shrunk'],
    inStock: true,
  },
];

export const categories = [
  { id: 'oversized', name: 'Oversized Hoddies', image: '/images/products/Hoddie-black.png', count: 12 },
  { id: 'minimal', name: 'Minimal Hoddies', image: '/images/products/Hoddie-gray.png', count: 8 },
  { id: 'graphic', name: 'Graphic Hoddies', image: '/images/products/Hoddie-navy.png', count: 6 },
  { id: 'winter', name: 'Winter Collection', image: '/images/products/Hoddie-olive.png', count: 5 },
  { id: 'limited', name: 'Limited Edition', image: '/images/products/Hoddie-burgundy.png', count: 3 },
];

export const testimonials = [
  {
    id: '1',
    name: 'Marcus Chen',
    avatar: 'MC',
    rating: 5,
    text: 'The quality is insane. I\'ve washed my Street Essential Hoddie at least 20 times and it still looks brand new. Worth every penny.',
    date: '2 weeks ago',
  },
  {
    id: '2',
    name: 'Sarah Williams',
    avatar: 'SW',
    rating: 5,
    text: 'Finally found a Hoddie that fits perfectly oversized without looking sloppy. The fabric is so soft and heavy in the best way.',
    date: '1 month ago',
  },
  {
    id: '3',
    name: 'James Rodriguez',
    avatar: 'JR',
    rating: 5,
    text: 'Customer service is top notch. Had an issue with sizing and they exchanged it same day. The Hoddie itself is premium quality.',
    date: '3 weeks ago',
  },
  {
    id: '4',
    name: 'Emma Thompson',
    avatar: 'ET',
    rating: 5,
    text: 'Bought 3 Hoddies for my boyfriend and he loves them all. The Limited Edition Prime is absolutely stunning in person.',
    date: '2 months ago',
  },
];

// Global state using React hooks
let globalCart: CartItem[] = [];
let globalWishlist: string[] = [];
let globalUser: User | null = null;
let globalIsCartOpen = false;
let globalSelectedColor = '';
let globalSelectedSize = '';

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach(fn => fn());
}

export function useStore() {
  const [, forceUpdate] = useState({});
  
  useEffect(() => {
    const listener = () => forceUpdate({});
    listeners.add(listener);
    return (): void => {
      listeners.delete(listener);
    };
  }, []);

  const addToCart = useCallback((product: Product, color: string, size: string) => {
    const existingItem = globalCart.find(
      item => item.product.id === product.id && item.color === color && item.size === size
    );
    
    if (existingItem) {
      globalCart = globalCart.map(item =>
        item.product.id === product.id && item.color === color && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      globalCart = [...globalCart, { product, quantity: 1, color, size }];
    }
    notify();
  }, []);

  const removeFromCart = useCallback((productId: string, color: string, size: string) => {
    globalCart = globalCart.filter(
      item => !(item.product.id === productId && item.color === color && item.size === size)
    );
    notify();
  }, []);

  const updateQuantity = useCallback((productId: string, color: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      globalCart = globalCart.filter(
        item => !(item.product.id === productId && item.color === color && item.size === size)
      );
    } else {
      globalCart = globalCart.map(item =>
        item.product.id === productId && item.color === color && item.size === size
          ? { ...item, quantity }
          : item
      );
    }
    notify();
  }, []);

  const clearCart = useCallback(() => {
    globalCart = [];
    notify();
  }, []);

  const getCartTotal = useCallback(() => {
    return globalCart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, []);

  const getCartCount = useCallback(() => {
    return globalCart.reduce((count, item) => count + item.quantity, 0);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    if (globalWishlist.includes(productId)) {
      globalWishlist = globalWishlist.filter(id => id !== productId);
    } else {
      globalWishlist = [...globalWishlist, productId];
    }
    notify();
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return globalWishlist.includes(productId);
  }, []);

  const setUser = useCallback((user: User | null) => {
    globalUser = user;
    notify();
  }, []);

  const setIsCartOpen = useCallback((open: boolean) => {
    globalIsCartOpen = open;
    notify();
  }, []);

  const setSelectedColor = useCallback((color: string) => {
    globalSelectedColor = color;
    notify();
  }, []);

  const setSelectedSize = useCallback((size: string) => {
    globalSelectedSize = size;
    notify();
  }, []);

  return {
    cart: globalCart,
    wishlist: globalWishlist,
    user: globalUser,
    isAuthenticated: !!globalUser,
    isCartOpen: globalIsCartOpen,
    selectedColor: globalSelectedColor,
    selectedSize: globalSelectedSize,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    toggleWishlist,
    isInWishlist,
    setUser,
    setIsCartOpen,
    setSelectedColor,
    setSelectedSize,
  };
}
