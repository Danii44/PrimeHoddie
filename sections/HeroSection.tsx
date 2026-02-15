'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToCollection = () => {
    const element = document.querySelector('#newdrop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="prime-section relative overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Background Image */}
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
        }`}
      >
        <img
          src="/images/backgrounds/hero-bg.jpg"
          alt="Premium Hoddie"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full prime-container pt-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h1
              className={`prime-headline text-white mb-6 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="inline-block">WEAR</span>{' '}
              <span className="inline-block">THE</span>{' '}
              <span className="inline-block text-[#7B2FF7]">PRIME.</span>
            </h1>
            
            <p
              className={`prime-subheadline max-w-md mb-8 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Premium Hoddies built for movement, designed for the city. 
              Experience the perfect blend of comfort and style.
            </p>
            
            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <button 
                onClick={scrollToCollection}
                className="prime-btn-primary group"
              >
                Shop the Drop
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={scrollToCollection}
                className="prime-btn-outline"
              >
                Explore Collection
              </button>
            </div>
          </div>

          {/* Right Content - 3D Floating Hoddie */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div
              className={`relative w-full max-w-md lg:max-w-lg animate-float transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-[#7B2FF7]/20 blur-[100px] rounded-full" />
              
              {/* Hoddie Image */}
              <img
                src="/images/products/Hoddie-black.png"
                alt="Prime Hoddie"
                className="relative z-10 w-full h-auto drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.6))',
                }}
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 prime-glass rounded-2xl flex items-center justify-center animate-float-delayed">
                <span className="text-2xl font-black text-[#7B2FF7]">NEW</span>
              </div>
              
              <div className="absolute -bottom-4 -left-4 px-4 py-3 prime-glass rounded-xl animate-float">
                <p className="text-xs text-[#A6ACB8]">Starting from</p>
                <p className="text-xl font-bold text-white">$69</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#A6ACB8]">
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}
