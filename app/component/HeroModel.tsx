"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import "@/app/component/Hero/Hero.css";

function Model() {
  const gltf = useGLTF("/astronout4.glb");
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = Math.sin(t * 1) * 0.1;
      ref.current.rotation.y = t * 0.4; 
    }
  });

  return <primitive ref={ref} object={gltf.scene} scale={0.7} />;
}

function YellowBlackLoader() {
  return (
    <Html center>
      <div className="loader-wrapper">
        <div className="loader-spinner"></div>
        <p className="loader-text">Loading 3D Asset...</p>
      </div>
    </Html>
  );
}

export default function HeroModel() {
  return (
    <div className="hero-3d-wrapper">
      <Canvas camera={{ position: [0, 0, 2], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[3, 3, 3]} />

        <Suspense fallback={<YellowBlackLoader />}>
          <Model />
        </Suspense>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
