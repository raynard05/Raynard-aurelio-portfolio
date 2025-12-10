"use client";

import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import "./ProjectPage.css";
import AirplaneMotion from "../ProjectSession/PlaneModel";

export default function ProjectPage() {
  const { scrollYProgress } = useScroll();
  const controls = useAnimation();
  const [hovered, setHovered] = useState(false);

  // Circle mengikuti scroll
  const clipPathScroll = useTransform(
    scrollYProgress,
    [0.2, 1],
    ["circle(0% at 0% 0%)", "circle(150% at 0% 0%)"]
  );

  // 🔥 Set true otomatis saat circle > 10%
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.2 && !hovered) {
        console.log("🔥 Circle > 10%, airplane mulai jalan");
        setHovered(true);
      } 
      else if (v <= 0.2 && hovered) {
        console.log("⭕ Circle < 10%, airplane reset");
        setHovered(false);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, hovered]);

  return (
    <section className="project-section">

      {/* Background tetap pakai scroll */}
      <motion.div
        style={{ clipPath: clipPathScroll }}
        className="project-animated-bg"
      />

      {/* Pesawat bergerak mengikuti state hovered */}
      <AirplaneMotion hovered={hovered} />

    </section>
  );
}
