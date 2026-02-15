'use client';

import { Shirt, Truck, RotateCcw, Award } from 'lucide-react';

export function EssentialsStackSection() {
  const features = [
    {
      icon: Shirt,
      title: 'Premium Fabric',
      description: '400gsm cotton fleece, pre-shrunk for lasting quality and comfort.',
    },
    {
      icon: Truck,
      title: 'Worldwide Shipping',
      description: 'Tracked delivery to your door, 5–10 days worldwide.',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '30-day returns, no questions asked. Your satisfaction guaranteed.',
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description: 'Every Hoddie is inspected to meet our premium standards.',
    },
  ];

  return (
    <section
      id="essentials"
      className="prime-section relative overflow-hidden"
      style={{ zIndex: 100 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/backgrounds/essentials-bg.jpg"
          alt="Essentials Stack"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#0B0C0F]/90 via-[#0B0C0F]/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full prime-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Content - Empty for background visibility */}
          <div className="hidden lg:block" />

          {/* Right Content */}
          <div>
            <div className="mb-10 animate-fade-in-right">
              <h2 className="prime-headline text-white mb-4">
                ESSENTIALS
                <br />
                <span className="text-[#7B2FF7]">STACK</span>
              </h2>
              
              <p className="prime-subheadline max-w-md">
                Three fits. One standard: premium. 
                Everything you need, nothing you don't.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="prime-glass rounded-2xl p-5 flex items-start gap-4 hover:bg-white/10 transition-colors cursor-pointer group animate-fade-in-right"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#7B2FF7]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#7B2FF7]/30 transition-colors">
                    <feature.icon className="w-6 h-6 text-[#7B2FF7]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#7B2FF7] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#A6ACB8]">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
