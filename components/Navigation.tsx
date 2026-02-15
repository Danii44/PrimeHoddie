'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';
// FIX: Ensure this path matches your other components (e.g., @/store/useStore)
import { useStore } from '@/store/useStore'; 
import { useAuth } from '@/components/auth/AuthProvider';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Destructure the necessary state and actions
  const { setIsCartOpen, getCartCount, isAuthenticated, user } = useStore();
  const { isAuthenticated: authLoading } = useAuth();
  
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', href: '#collection' },
    { label: 'Collections', href: '#categories' },
    { label: 'Looks', href: '#urban' },
    { label: 'Support', href: '#footer' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Accounting for header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0B0C0F]/90 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="prime-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a 
          href="#" 
          className="text-xl lg:text-3xl font-normal tracking-tighter text-white"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          PRIME<span className="text-[#7B2FF7] font-normal">HODDIE</span>
        </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-bold text-[#A6ACB8] hover:text-white transition-colors uppercase tracking-widest"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="p-2 text-[#A6ACB8] hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {/* CART BUTTON - Connected to Store */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#A6ACB8] hover:text-white transition-all active:scale-90"
            >
              <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6" />
              {cartCount > 0 && (
                <>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#7B2FF7] rounded-full animate-ping opacity-75" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#7B2FF7] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#0B0C0F]">
                    {cartCount}
                  </span>
                </>
              )}
            </button>
            
            <button 
              onClick={() => window.location.href = '/auth/login'}
              className="hidden sm:flex p-2 text-[#A6ACB8] hover:text-white transition-colors"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 text-[#A6ACB8] hover:text-white transition-colors">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full sm:w-80 bg-[#0B0C0F] border-l border-white/10 p-0"
              >
                <div className="flex flex-col h-full p-8">
                  <div className="mb-12">
                    <span className="text-2xl font-black text-white">
                      PRIME<span className="text-[#7B2FF7]">HODDIE</span>
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <button
                        key={link.label}
                        onClick={() => scrollToSection(link.href)}
                        className="text-left text-2xl font-bold text-white hover:text-[#7B2FF7] transition-colors"
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-auto pt-8 border-t border-white/10">
                    {isAuthenticated && user ? (
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#7B2FF7] flex items-center justify-center text-white text-xl font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-bold">{user.name}</p>
                          <p className="text-sm text-[#A6ACB8]">{user.email}</p>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          window.location.href = '/auth/login';
                        }}
                        className="prime-btn-primary w-full py-4 text-lg"
                      >
                        Sign In
                      </button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}