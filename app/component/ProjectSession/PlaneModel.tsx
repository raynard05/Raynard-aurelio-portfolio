"use client";

import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import "./ProjectPage.css";

// ========== Komponen Pesawat ===========
function Airplane() {
  const { scene } = useGLTF("/pesawat.glb"); // pastikan foldernya benar
  return <primitive object={scene} scale={1.5} />;
}

// ========== Halaman ===========
export default function ProjectPage() {
  const { scrollYProgress } = useScroll();
  const controls = useAnimation();
  const [hovered, setHovered] = useState(false);

  // ClipPath animasi scroll
  const clipPathScroll = useTransform(
    scrollYProgress,
    [0.9, 1],
    ["circle(0% at 0% 0%)", "circle(150% at 0% 0%)"]
  );

  // Animation for airplane
  const airplaneControls = useAnimation();

  // START ANIMATION when page loads
  useEffect(() => {
    airplaneControls.start({
      x: [0, 300, 600],       // kiri atas → tengah → kanan bawah
      y: [0, 150, 300],
      rotateZ: [0, 360, 720], // 360° spin
      opacity: [1, 1, 0],     // hilang di akhir
      transition: {
        duration: 6,
        ease: "easeInOut",
      },
    });
  }, []);

  // Hover animation for background
  const handleHoverStart = () => {
    setHovered(true);
    controls.start({
      clipPath: "circle(150% at 0% 0%)",
      transition: { duration: 2.5, ease: "easeInOut" },
    });
  };

  const handleHoverEnd = () => {
    setHovered(false);
    controls.start({
      clipPath: "circle(0% at 0% 0%)",
      transition: { duration: 2.5, ease: "easeInOut" },
    });
  };

  return (
    <section className="project-section">

      {/*  ====== BACKGROUND ====== */}
      <motion.div
        style={{ clipPath: hovered ? undefined : clipPathScroll }}
        animate={controls}
        className="project-animated-bg"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      />

      {/* ====== AIRPLANE ANIMATION ====== */}
      <motion.div
        animate={airplaneControls}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 150,
          height: 150,
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={1} />
          <Airplane />
          <Environment preset="sunset" />
        </Canvas>
      </motion.div>

      {/* ====== CONTENT ====== */}
      <div className="project-content">
        <h1>Project Page (Kosong)</h1>
      </div>

    </section>
  );
}
