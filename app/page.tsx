"use client";

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
  // Define the handler to accept a 'product' argument
  const handleProductClick = (product: any) => {
    console.log("Selected product details:", product);
    // Future: openProductModal(product);
  };

  return (
    <div className="relative min-h-screen bg-[#0B0C0F]">
      <div className="noise-overlay" />
      
      <Navigation />
      
      <main className="relative">
        <HeroSection />
        
        {/* These components MUST have their interfaces updated to accept (product: any) */}
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