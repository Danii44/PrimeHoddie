'use client';

import { Check, Ruler } from 'lucide-react';

export function SignatureSection() {
  const features = [
    '400gsm Heavyweight Cotton',
    'Oversized Fit',
    'Dropped Shoulders',
    'Double-Stitched Hem',
    'Pre-Shrunk Fabric',
    'Brushed Interior',
  ];

  return (
    <section
      id="signature"
      className="prime-section relative overflow-hidden"
      style={{ zIndex: 30 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/backgrounds/signature-bg.jpg"
          alt="Signature Hoddie"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0F]/70 via-[#0B0C0F]/50 to-[#0B0C0F]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full prime-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
          <div className="animate-fade-in-left">
            <h2 className="prime-headline text-white mb-6">
              SIGNATURE
              <br />
              <span className="text-[#7B2FF7]">Hoddie</span>
            </h2>
            
            <p className="prime-subheadline max-w-md mb-8">
              Heavyweight cotton. Brushed interior. Built to last. 
              Our signature piece that defines the Prime standard.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#7B2FF7]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#7B2FF7]" />
                  </div>
                  <span className="text-sm text-[#A6ACB8]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Specs Card */}
          <div className="flex justify-end">
            <div className="w-full max-w-md prime-glass rounded-3xl p-6 lg:p-8 animate-fade-in-right">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#7B2FF7]/20 flex items-center justify-center">
                  <Ruler className="w-6 h-6 text-[#7B2FF7]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Size Guide</h3>
                  <p className="text-sm text-[#A6ACB8]">Find your perfect fit</p>
                </div>
              </div>

              {/* Size Table */}
              <div className="space-y-3">
                {[
                  { size: 'S', chest: '38"', length: '26"', sleeve: '24"' },
                  { size: 'M', chest: '40"', length: '27"', sleeve: '25"' },
                  { size: 'L', chest: '42"', length: '28"', sleeve: '26"' },
                  { size: 'XL', chest: '44"', length: '29"', sleeve: '27"' },
                  { size: 'XXL', chest: '46"', length: '30"', sleeve: '28"' },
                ].map((row) => (
                  <div
                    key={row.size}
                    className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-white/5 last:border-0"
                  >
                    <span className="font-bold text-white">{row.size}</span>
                    <span className="text-[#A6ACB8]">{row.chest}</span>
                    <span className="text-[#A6ACB8]">{row.length}</span>
                    <span className="text-[#A6ACB8]">{row.sleeve}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#A6ACB8] mt-4">
                * Measurements are in inches. Oversized fit recommended to size down for regular fit.
              </p>

              <button className="w-full prime-btn-primary mt-6">
                Choose Your Size
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
