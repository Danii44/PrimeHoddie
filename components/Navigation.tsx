'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useAuth } from '@/components/auth/AuthProvider';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  
  // Destructure state from your store
  const { setIsCartOpen, getCartCount } = useStore();
  
  /** * FIX: Handle the case where useAuth() might be undefined during initial load.
   * This resolves the "Property 'user' does not exist" error.
   */
  const auth = useAuth();
  const user = auth?.user || null;
  const isAuthenticated = !!user;
  
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Customize', href: '/customize' },
    { label: 'Cart', href: '/cart' },
    ...(isAuthenticated ? [{ label: 'Dashboard', href: '/admin/dashboard' }] : []),
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0B0C0F]/90 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl lg:text-3xl font-bold tracking-tighter text-white">
            PRIME<span className="text-[#7B2FF7]">HOODIE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors uppercase tracking-widest ${
                  pathname === link.href ? 'text-[#7B2FF7]' : 'text-[#A6ACB8] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="p-2 text-[#A6ACB8] hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {/* CART TRIGGER */}
            <button
              onClick={() => {
                console.log("Opening Cart..."); 
                setIsCartOpen(true);
              }}
              className="relative p-2 text-[#A6ACB8] hover:text-white transition-all active:scale-95"
            >
              <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#7B2FF7] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            <Link 
              href={isAuthenticated ? "/admin/dashboard" : "/auth/login"}
              className="p-2 text-[#A6ACB8] hover:text-white transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 text-[#A6ACB8] hover:text-white">
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#0B0C0F] border-white/10 text-white">
                  <div className="flex flex-col gap-8 mt-12">
                    {navLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-2xl font-bold hover:text-[#7B2FF7]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}