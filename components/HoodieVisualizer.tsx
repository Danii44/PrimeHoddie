'use client';

import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { ShoppingBag, RotateCcw, Box } from 'lucide-react';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';
import Link from 'next/link';
import * as THREE from 'three';

const Hoddie_COLORS = [
  { name: 'Black', value: '#1a1a1a' },
  { name: 'Gray', value: '#4a4a4a' },
  { name: 'White', value: '#ffffff' },
  { name: 'Navy', value: '#1e3a5f' },
  { name: 'Burgundy', value: '#722f37' },
];

const DECAL_COLORS = [
  { name: 'White', value: '#ffffff' },
  { name: 'Gold', value: '#ffd700' },
  { name: 'Silver', value: '#c0c0c0' },
  { name: 'Neon Purple', value: '#7B2FF7' },
];

function HoddieMesh({ baseColor, decalColor, decalScale }: any) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow>
        <capsuleGeometry args={[1, 2, 20, 20]} />
        <meshStandardMaterial color={baseColor} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.6, 1.05]}>
        <planeGeometry args={[0.5 * decalScale, 0.5 * decalScale]} />
        <meshStandardMaterial color={decalColor} emissive={decalColor} emissiveIntensity={0.5} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-1.2, 0.4, 0]} rotation={[0, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.35, 1.6, 10, 10]} />
        <meshStandardMaterial color={baseColor} />
      </mesh>
      <mesh position={[1.2, 0.4, 0]} rotation={[0, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.35, 1.6, 10, 10]} />
        <meshStandardMaterial color={baseColor} />
      </mesh>
      <mesh position={[0, 1.4, 0.4]} castShadow>
        <sphereGeometry args={[0.75, 20, 20]} />
        <meshStandardMaterial color={baseColor} />
      </mesh>
    </group>
  );
}

export default function HoodieVisualizer() {
  const [hoddieColor, setHoddieColor] = useState(Hoddie_COLORS[0].value);
  const [decalColor, setDecalColor] = useState(DECAL_COLORS[0].value);
  const [decalScale, setDecalScale] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  
  const { addToCart, setIsCartOpen } = useStore();

  const handleCustomize = () => {
    addToCart({
      product: {
        id: `custom-${Date.now()}`,
        name: 'Custom Prime Hoodie',
        price: 129,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600',
        category: 'Custom',
        description: `Custom ${hoddieColor} hoodie.`,
        inStock: true,
      },
      quantity: 1,
      color: hoddieColor,
      size: selectedSize,
      customizations: { baseColor: hoddieColor, decalColor, decalScale },
    });
    toast.success('Added to cart!');
    setIsCartOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between mb-10 gap-4">
        <div>
          <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter uppercase mb-2 text-white">
            Studio <span className="text-[#7B2FF7]">01</span>
          </h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white/5 rounded-3xl overflow-hidden h-[500px] lg:h-[700px] relative">
          <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
            <Environment preset="city" />
            <OrbitControls enablePan={false} />
            <HoddieMesh baseColor={hoddieColor} decalColor={decalColor} decalScale={decalScale} />
            <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} />
          </Canvas>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">Fabric Color</h3>
            <div className="flex gap-3 mb-8">
              {Hoddie_COLORS.map((c) => (
                <button key={c.name} onClick={() => setHoddieColor(c.value)} 
                  className={`w-10 h-10 rounded-xl border-2 ${hoddieColor === c.value ? 'border-[#7B2FF7]' : 'border-transparent'}`}
                  style={{ backgroundColor: c.value }} />
              ))}
            </div>

            <Button onClick={handleCustomize} className="w-full bg-[#7B2FF7] hover:bg-[#6a28d4] text-white py-8 rounded-2xl font-black uppercase italic">
              <ShoppingBag className="w-5 h-5 mr-2" /> Lock in Design
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}