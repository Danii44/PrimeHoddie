'use client';

import dynamic from 'next/dynamic';
import { Navigation } from '@/components/Navigation';
import { CartDrawer } from '@/components/CartDrawer';

// This fixes the 'ReactCurrentBatchConfig' error by disabling Server-Side Rendering
const HoodieVisualizer = dynamic(
  () => import('@/components/HoodieVisualizer'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-screen w-full flex items-center justify-center bg-[#0B0C0F]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#7B2FF7] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#7B2FF7] font-black italic tracking-widest animate-pulse">
            INITIALIZING 3D ENGINE...
          </p>
        </div>
      </div>
    )
  }
);

export default function CustomizePage() {
  return (
    <div className="min-h-screen bg-[#0B0C0F]">
      <Navigation />
      <div className="pt-28 pb-20">
        <HoodieVisualizer />
      </div>
      <CartDrawer />
    </div>
  );
}