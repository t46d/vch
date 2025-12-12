// src/components/ThreeScene.jsx
"use client";

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Plane } from '@react-three/drei';

// ãßæä ÔÈßÉ ãÊæåÌÉ ÈÓíØÉ
function NeonGrid() {
  const ref = useRef();
  
  // ÊÃËíÑ ÊÍÑíß ÇáÔÈßÉ ÞáíáÇð
  useFrame((state, delta) => {
    ref.current.position.z += 0.5 * delta;
    if (ref.current.position.z > 1) {
      ref.current.position.z = -10; // ÅÚÇÏÉ ÊÚííä áÎáÞ ÊÃËíÑ ÇáÊßÑÇÑ
    }
  });

  return (
    <Plane 
      ref={ref}
      args={[100, 100, 50, 50]}
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -1, 0]}
    >
      <meshStandardMaterial 
        wireframe={true} 
        color="#00F0FF" // áæä Çáäíæä ÇáÓãÇæí
        emissive="#B500FF" // ÊæåÌ ÈäÝÓÌí
        emissiveIntensity={0.5}
      />
    </Plane>
  );
}

// Çáãßæä ÇáÑÆíÓí ááãÔåÏ ÇáËáÇËí ÇáÃÈÚÇÏ
export default function ThreeScene() {
  return (
    <div className="fixed inset-0 z-0 opacity-20">
      <Canvas 
        camera={{ position: [0, 5, 15], fov: 75 }} 
        style={{ background: 'transparent' }} // ÇáÎáÝíÉ ÇáÏÇßäÉ Ýí body/layout
      >
        <ambientLight intensity={0.5} color="#00F0FF" />
        <pointLight position={[10, 10, 10]} intensity={1} color="#FF00C8" />
        
        <Suspense fallback={null}>
          <Stars 
            radius={200} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1} 
          />
          <NeonGrid />
        </Suspense>

        {/* OrbitControls ãÝíÏ ááÊØæíÑ. íãßä ÅÒÇáÊå Ýí ÇáÅäÊÇÌ */}
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}