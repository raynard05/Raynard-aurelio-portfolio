"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useMemo } from "react";

export default function AirplaneMotion({ hovered = false }) {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
         zIndex: 9999, // <
      }}
      camera={{ position: [0, 0, 8], fov: 45 }}  // kamera lebih dekat
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Model hovered={hovered} />
    </Canvas>
  );
}

function Model({ hovered = false }) {
  const { scene } = useGLTF("/pesawat.glb");

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  const group = useRef<THREE.Group>(null!);
  const t = useRef(0);

  useFrame((_, delta) => {
    const g = group.current;

    if (hovered) {
      t.current = Math.min(1, t.current + delta * 0.3);
    } else {
      t.current = Math.max(0, t.current - delta * 0.35);
    }

    const progress = t.current;

    // 🌟 POSISI START dan END (sudah disesuaikan supaya tampak oleh kamera)
    const startX = 3.5;   // kanan layar
    const startY = 2;     // atas
    const endY = -2;      // bawah

    const x = startX;
    const y = startY + (endY - startY) * progress;

    // rotasi ke bawah
    const rotationZ = Math.PI / 2;

    g.position.set(x, y, 0);
    g.rotation.set(0, 0, rotationZ);

    // sedikit efek depth
    const scale = 0.8;
    g.scale.set(scale, scale, scale);
  });

  return (
    <group ref={group}>
      <primitive object={clonedScene} />
    </group>
  );
}
