"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import "@/app/component/Hero/Hero.css";
function Model() {
  const gltf = useGLTF("/astronout4.glb"); // ganti sesuai model kamu
  const ref = useRef<THREE.Group>(null);

  // Animasi bounce lembut, pelan, loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = Math.sin(t * 1) * 0.1; // bounce pelan
      ref.current.rotation.y = t * 0.01; // rotasi halus
    }
  });

  return <primitive ref={ref} object={gltf.scene} scale={0.8} />;
}

export default function HeroModel() {
  return (
    <div className="hero-3d-wrapper">
      <Canvas camera={{ position: [-1, 0, 2], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[3, 3, 3]} />
        <Model />

        {/* Optional: kontrol mouse */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
