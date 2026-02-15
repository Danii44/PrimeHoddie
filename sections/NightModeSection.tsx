'use client';

import { useState } from 'react';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export function NightModeSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    toast.success('Welcome to the Prime list!');
    setEmail('');
  };

  return (
    <section
      id="night"
      className="prime-section relative overflow-hidden"
      style={{ zIndex: 90 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/backgrounds/night-bg.jpg"
          alt="Night Mode"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0F]/90 via-[#0B0C0F]/70 to-[#0B0C0F]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full prime-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
          <div>
            <div className="animate-fade-in-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7B2FF7]/20 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#7B2FF7]" />
                <span className="text-sm font-bold text-[#7B2FF7]">Night Mode</span>
              </div>
              
              <h2 className="prime-headline text-white mb-6">
                STAY IN THE
                <br />
                <span className="text-[#7B2FF7]">LOOP</span>
              </h2>
              
              <p className="prime-subheadline max-w-md">
                Drop alerts, early access, and style notes—once a week. 
                Be the first to know about new releases.
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="mt-8 max-w-md animate-fade-in-left" style={{ animationDelay: '200ms' }}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A6ACB8]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="prime-input pl-12"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full prime-btn-primary group"
                >
                  Join the List
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
              
              <p className="text-xs text-[#A6ACB8] mt-4">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>

          {/* Right Content - Empty for background visibility */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
