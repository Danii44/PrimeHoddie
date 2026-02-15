'use client';

import { useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { Navigation } from '@/components/Navigation';
import { CartDrawer } from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { ShoppingBag, RotateCcw, Download } from 'lucide-react';
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
  { name: 'Red', value: '#ff0000' },
];

function HoddieMesh({ baseColor, decalColor, decalScale }: any) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={mesh}>
      {/* Main Hoddie body */}
      <mesh castShadow receiveShadow>
        <capsuleGeometry args={[1, 2, 16, 16]} />
        <meshStandardMaterial color={baseColor} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Hoddie pocket area */}
      <mesh position={[0, -0.5, 1.05]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.8, 0.1]} />
        <meshStandardMaterial color={baseColor} roughness={0.8} metalness={0} />
      </mesh>

      {/* Decal/logo area on chest */}
      <mesh position={[0, 0.5, 1.1]}>
        <planeGeometry args={[0.6 * decalScale, 0.6 * decalScale]} />
        <meshStandardMaterial
          color={decalColor}
          emissive={decalColor}
          emissiveIntensity={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Sleeves */}
      <mesh position={[-1.3, 0.5, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.3, 1.5, 8, 8]} />
        <meshStandardMaterial color={baseColor} roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[1.3, 0.5, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.3, 1.5, 8, 8]} />
        <meshStandardMaterial color={baseColor} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Hood */}
      <mesh position={[0, 1.5, 0.5]} castShadow receiveShadow>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color={baseColor} roughness={0.7} metalness={0.1} />
      </mesh>
    </group>
  );
}

function Scene() {
  const { camera } = useThree();
  
  return (
    <>
      <OrbitControls enableZoom enablePan />
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, 10, 5]} intensity={0.5} />
    </>
  );
}

export default function CustomizePage() {
  const [HoddieColor, setHoddieColor] = useState(Hoddie_COLORS[0].value);
  const [decalColor, setDecalColor] = useState(DECAL_COLORS[0].value);
  const [decalScale, setDecalScale] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const { addToCart } = useStore();

  const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleCustomize = () => {
    addToCart({
      product: {
        id: `custom-${Date.now()}`,
        name: 'Custom Designed Hoddie',
        price: 129,
        image: '/placeholder.svg?height=400&width=300',
        category: 'Custom',
        description: 'Your custom-designed Hoddie',
        inStock: true,
      },
      quantity: 1,
      color: HoddieColor,
      size: selectedSize,
      customizations: {
        baseColor: HoddieColor,
        decalColor,
        decalScale,
      },
    });

    toast.success('Custom Hoddie added to cart!');
  };

  const handleReset = () => {
    setHoddieColor(Hoddie_COLORS[0].value);
    setDecalColor(DECAL_COLORS[0].value);
    setDecalScale(1);
  };

  return (
    <div className="min-h-screen bg-[#0B0C0F]">
      <Navigation />

      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-2">Design Your Hoddie</h1>
            <p className="text-[#A6ACB8] text-lg">Customize every detail of your perfect Hoddie</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 3D Canvas */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden h-[500px] lg:h-[600px]">
                <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
                  <Scene />
                  <HoddieMesh
                    baseColor={HoddieColor}
                    decalColor={decalColor}
                    decalScale={decalScale}
                  />
                </Canvas>
              </div>

              <div className="mt-4 text-center text-[#A6ACB8] text-sm">
                Drag to rotate • Scroll to zoom
              </div>
            </div>

            {/* Customization Panel */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Customization</h2>

              {/* Base Color */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Hoddie Color</h3>
                <div className="flex gap-2 flex-wrap">
                  {Hoddie_COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setHoddieColor(color.value)}
                      className={`w-10 h-10 rounded-lg border-2 transition-all ${
                        HoddieColor === color.value
                          ? 'border-white scale-110'
                          : 'border-white/20 hover:border-white/50'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Decal Color */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Logo Color</h3>
                <div className="flex gap-2 flex-wrap">
                  {DECAL_COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setDecalColor(color.value)}
                      className={`w-10 h-10 rounded-lg border-2 transition-all ${
                        decalColor === color.value
                          ? 'border-white scale-110'
                          : 'border-white/20 hover:border-white/50'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Logo Size */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Logo Size</h3>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={decalScale}
                  onChange={(e) => setDecalScale(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-[#A6ACB8] text-sm mt-2">{(decalScale * 100).toFixed(0)}%</div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-[#7B2FF7] text-white'
                          : 'bg-white/10 border border-white/20 text-white hover:border-white/40'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="text-[#A6ACB8] text-sm mb-1">Custom Design Price</div>
                <div className="text-3xl font-bold text-[#7B2FF7]">$129</div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={handleCustomize}
                  className="w-full prime-btn-primary py-6"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>

                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 py-6"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Design
                </Button>

                <Link href="/shop" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 py-6"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CartDrawer />
    </div>
  );
}
