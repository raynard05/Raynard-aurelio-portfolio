"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import "./ProjectPage.css";

export default function ProjectPage() {
  const { scrollYProgress } = useScroll();

  const clipPath = useTransform(
    scrollYProgress,
    [0.9, 1],
    [
      "circle(0% at 0% 0%)", 
      "circle(150% at 0% 0%)"
    ]
  );

  return (
    <section className="project-section">
      {/* Layer animasi background */}
      <motion.div
        style={{ clipPath }}
        className="project-animated-bg"
      />

      {/* Konten */}
      <div className="project-content">
        <h1>Project Page (Kosong)</h1>
      </div>
    </section>
  );
}
