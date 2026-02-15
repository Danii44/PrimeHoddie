'use client';

import { useState } from 'react';
import { ArrowRight, Instagram, Twitter, Youtube, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    toast.success('Subscribed to newsletter!');
    setEmail('');
  };

  const shopLinks = [
    { label: 'Hoddies', href: '#' },
    { label: 'New Arrivals', href: '#' },
    { label: 'Best Sellers', href: '#' },
    { label: 'Accessories', href: '#' },
  ];

  const supportLinks = [
    { label: 'Shipping', href: '#' },
    { label: 'Returns', href: '#' },
    { label: 'Size Guide', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  const companyLinks = [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ];

  return (
    <footer id="footer" className="relative bg-[#0B0C0F] border-t border-white/5" style={{ zIndex: 120 }}>
      <div className="prime-container py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a href="#" className="text-2xl font-black text-white mb-4 inline-block">
              PRIME<span className="text-[#7B2FF7]">HODDIE</span>
            </a>
            <p className="text-[#A6ACB8] mb-6 max-w-sm">
              Premium Hoddies designed for the city. Built to last, made to move. 
              Experience the Prime difference.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Youtube, href: '#' },
                { icon: Facebook, href: '#' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#A6ACB8] hover:bg-[#7B2FF7]/20 hover:text-[#7B2FF7] transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-bold mb-4">Shop</h4>
              <ul className="space-y-3">
                {shopLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-[#A6ACB8] hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-[#A6ACB8] hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-[#A6ACB8] hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-4">Get Drop Alerts</h4>
            <p className="text-[#A6ACB8] text-sm mb-4">
              Subscribe for exclusive offers and early access to new releases.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A6ACB8]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-[#A6ACB8] text-sm focus:outline-none focus:border-[#7B2FF7] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full prime-btn-primary text-sm"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#A6ACB8]">
                <MapPin className="w-4 h-4" />
                <span>Los Angeles, CA</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#A6ACB8]">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#A6ACB8]">
            © 2026 PrimeHoddie. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-[#A6ACB8] hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-[#A6ACB8] hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-[#A6ACB8] hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
