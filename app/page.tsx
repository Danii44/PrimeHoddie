"use client";

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { HeroSection } from '@/sections/HeroSection';
import { NewDropSection } from '@/sections/NewDropSection';
import { SignatureSection } from '@/sections/SignatureSection';
import { CollectionGrid } from '@/sections/CollectionGrid';
import { UrbanFitSection } from '@/sections/UrbanFitSection';
import { BestSellerSection } from '@/sections/BestSellerSection';
import { StudioDetailSection } from '@/sections/StudioDetailSection';
import { ColorwaysSection } from '@/sections/ColorwaysSection';
import { NightModeSection } from '@/sections/NightModeSection';
import { EssentialsStackSection } from '@/sections/EssentialsStackSection';
import { FinalCTASection } from '@/sections/FinalCTASection';
import { Footer } from '@/sections/Footer';
import { Navigation } from '@/components/Navigation';
import { CartDrawer } from '@/components/CartDrawer';



export default function Home() {
  // 1. Grab fetch logic and status from store
  const { fetchProducts, products, isLoading } = useStore();

  // 2. Initial Global Fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleProductClick = (product: any) => {
    console.log("Selected product details:", product);
  };

  // 3. Global Loading Guard 
  // This prevents the page from crashing while 'products[0]' is being fetched
  if (isLoading && products.length === 0) {
    return (
      <div className="fixed inset-0 bg-[#0B0C0F] flex items-center justify-center z-[100]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#7B2FF7] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#7B2FF7] font-bold tracking-widest uppercase animate-pulse">
            Syncing Prime Collection...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0B0C0F]">
      <div className="noise-overlay" />
      
      <Navigation />
      
      <main className="relative">
        <HeroSection />
        
        {/* All sections now have guaranteed access to the 'products' array */}
        <NewDropSection onProductClick={handleProductClick} />
        
        <SignatureSection />
        
        <CollectionGrid onProductClick={handleProductClick} />
        
        <UrbanFitSection />
        
        <BestSellerSection onProductClick={handleProductClick} />
        
        <StudioDetailSection />
        <ColorwaysSection />
        <NightModeSection />
        <EssentialsStackSection />
        <FinalCTASection />
        <Footer />
      </main>
      
      <CartDrawer />
    </div>
  );
}