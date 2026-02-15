'use client';

import { ArrowRight, Eye } from 'lucide-react';

export function FinalCTASection() {
  const scrollToCollection = () => {
    const element = document.querySelector('#collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="finalcta"
      className="prime-section relative overflow-hidden"
      style={{ zIndex: 110 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/backgrounds/finalcta-bg.jpg"
          alt="Final CTA"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F] via-[#0B0C0F]/60 to-[#0B0C0F]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full prime-container">
        <div className="flex flex-col justify-end min-h-screen py-20 pb-32">
          {/* Headline */}
          <div className="mb-8 animate-fade-in-up">
            <h2 className="prime-headline text-white mb-4">
              STAY
              <br />
              <span className="text-[#7B2FF7]">AHEAD.</span>
            </h2>
            
            <p className="prime-subheadline max-w-md">
              New drops every month. Limited runs. No restocks. 
              Don't miss out on the next release.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <button 
              onClick={scrollToCollection}
              className="prime-btn-primary group"
            >
              Shop the Latest Drop
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={scrollToCollection}
              className="prime-btn-outline"
            >
              <Eye className="w-4 h-4" />
              View Lookbook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
