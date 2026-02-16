'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  useGLTF, 
  Decal, 
  useTexture,
  ContactShadows 
} from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Upload, RefreshCcw } from 'lucide-react';
import * as THREE from 'three';

function HoodieModel({ baseColor, logoImage, logoScale, logoY, logoSide }: any) {
  // Load the model and the texture
  const { nodes } = useGLTF('/hoodie.glb') as any;
  const logoTexture = useTexture(logoImage);

  // 1. Identify the body mesh
  const mainMesh = useMemo(() => {
    return Object.values(nodes).find((node: any) => node.type === 'Mesh') as THREE.Mesh;
  }, [nodes]);

  // 2. Coordinate Logic (Your specific GLB bounds)
  const modelOffset = -135; 
  const decalZ = logoSide === 'front' ? 22.5 : -22.5; // Slightly offset to prevent flickering
  const rotationY = logoSide === 'front' ? 0 : Math.PI;

  if (!mainMesh) return null;

  return (
    <group position={[0, modelOffset, 0]}>
      {/* LAYER 1: THE SOLID HOODIE 
         We render the mesh manually to ensure NO transparency settings leak in.
      */}
      <mesh geometry={mainMesh.geometry} castShadow receiveShadow>
        <meshStandardMaterial 
          color={baseColor} 
          roughness={0.8} 
          metalness={0.1}
          side={THREE.DoubleSide} // Renders both inside and outside
          transparent={false}
          depthWrite={true}
          opacity={1}
        />
      </mesh>

      {/* LAYER 2: THE LOGO PROJECTION
         We use a clone of the geometry that is invisible but allows the decal to "stick"
      */}
      <mesh geometry={mainMesh.geometry}>
        <meshStandardMaterial transparent opacity={0} depthWrite={false} />
        <Decal 
          position={[0, logoY, decalZ]} 
          rotation={[0, rotationY, 0]}
          scale={[logoScale, logoScale, 50]} 
          map={logoTexture}
        >
          <meshStandardMaterial
            map={logoTexture}
            transparent
            polygonOffset
            polygonOffsetFactor={-10} // Forces the logo to render "above" the fabric
            depthTest={true}
          />
        </Decal>
      </mesh>
    </group>
  );
}

export default function HoodieVisualizer() {
  const [mounted, setMounted] = useState(false);
  const [hoddieColor, setHoddieColor] = useState('#121212');
  const [logoScale, setLogoScale] = useState(40); 
  const [logoY, setLogoY] = useState(145); 
  const [logoSide, setLogoSide] = useState<'front' | 'back'>('front');
  const [logoImage, setLogoImage] = useState('/logo.png');

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-8 py-10">
      <div className="lg:col-span-8 bg-[#050505] rounded-[3rem] h-[750px] relative border border-white/5 overflow-hidden shadow-2xl">
        <Suspense fallback={<div className="flex items-center justify-center h-full text-[#7B2FF7] font-bold">SOLIDIFYING MESH...</div>}>
          <Canvas shadows camera={{ position: [0, 0, 160], fov: 45 }}>
            <Environment preset="city" />
            <ambientLight intensity={1.0} /> {/* Increased light to check for holes */}
            <pointLight position={[100, 100, 100]} intensity={1.5} />
            
            <HoodieModel 
              baseColor={hoddieColor} 
              logoImage={logoImage} 
              logoScale={logoScale} 
              logoY={logoY}
              logoSide={logoSide}
            />
            
            <OrbitControls 
              enablePan={false} 
              minDistance={100} 
              maxDistance={250} 
              target={[0, 0, 0]} 
            />
            
            <ContactShadows position={[0, -45, 0]} opacity={0.6} scale={200} blur={3} />
          </Canvas>
        </Suspense>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex bg-black/80 backdrop-blur-xl p-2 rounded-2xl border border-white/10">
          <button onClick={() => setLogoSide('front')} className={`px-10 py-3 rounded-xl text-xs font-black uppercase transition-all ${logoSide === 'front' ? 'bg-[#7B2FF7] text-white' : 'text-white/40'}`}>Front View</button>
          <button onClick={() => setLogoSide('back')} className={`px-10 py-3 rounded-xl text-xs font-black uppercase transition-all ${logoSide === 'back' ? 'bg-[#7B2FF7] text-white' : 'text-white/40'}`}>Back View</button>
        </div>
      </div>

      <div className="lg:col-span-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 flex flex-col gap-10">
        <h2 className="text-white font-black uppercase italic text-2xl flex items-center justify-between">Studio Pro <RefreshCcw className="w-5 h-5 text-[#7B2FF7]" /></h2>
        <div className="space-y-12">
          <div>
            <label className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-4 block">Base Color</label>
            <input type="color" value={hoddieColor} onChange={(e) => setHoddieColor(e.target.value)} className="w-full h-16 bg-transparent border-none cursor-pointer rounded-2xl overflow-hidden shadow-2xl" />
          </div>
          <div className="space-y-8">
            <div>
              <label className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2 block">Logo Scale</label>
              <input type="range" min="10" max="80" step="1" value={logoScale} onChange={(e) => setLogoScale(parseFloat(e.target.value))} className="w-full accent-[#7B2FF7]" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2 block">Logo Height</label>
              <input type="range" min="120" max="165" step="1" value={logoY} onChange={(e) => setLogoY(parseFloat(e.target.value))} className="w-full accent-[#7B2FF7]" />
            </div>
          </div>
          <div className="pt-4">
            <input type="file" id="up" className="hidden" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setLogoImage(URL.createObjectURL(file));
            }} />
            <label htmlFor="up" className="w-full py-10 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center gap-4 cursor-pointer hover:bg-white/5 transition-all group">
              <Upload className="w-8 h-8 text-[#7B2FF7]" />
              <span className="text-[10px] text-white/40 font-black uppercase italic tracking-widest">Update Graphic</span>
            </label>
          </div>
        </div>
        <Button className="w-full bg-[#7B2FF7] hover:bg-[#6a28d4] py-10 rounded-[2rem] font-black italic text-xl shadow-[0_20px_50px_rgba(123,47,247,0.3)] mt-auto">
          <ShoppingBag className="w-6 h-6 mr-3" /> Save Selection
        </Button>
      </div>
    </div>
  );
}

useGLTF.preload('/hoodie.glb');