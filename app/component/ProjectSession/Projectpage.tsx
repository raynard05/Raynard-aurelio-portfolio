"use client";

import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import "./ProjectPage.css";

export default function ProjectPage() {
  const { scrollYProgress } = useScroll();
  const controls = useAnimation();
  const [circleFull, setCircleFull] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [hideVideo, setHideVideo] = useState(false);

  // ClipPath lingkaran
  const clipPathScroll = useTransform(
    scrollYProgress,
    [0.9, 1],
    ["circle(0% at 0% 0%)", "circle(150% at 0% 0%)"]
  );

  // 🔥 Trigger saat lingkaran penuh (150%)
  useEffect(() => {
    return clipPathScroll.on("change", (v) => {
      if (v.includes("150%") && !circleFull) {
        setCircleFull(true);

        // ⏳ 10 detik sebelum fade out
        setTimeout(() => {
          setFadeOut(true);

          // ⏳ setelah fade-out selesai (1.5s)
          setTimeout(() => {
            setHideVideo(true);
          }, 1500);

        }, 15000); // 10 detik
      }
    });
  }, [circleFull]);

  return (
    <section className="project-section">

      <motion.div
        style={{ clipPath: clipPathScroll }}
        animate={controls}
        className="project-animated-bg"
      />

      {/* ========== VIDEO ========== */}
      {!hideVideo && circleFull && (
        <video
          className={`project-video-bg ${fadeOut ? "fade-out" : ""}`}
          src="/video_1.mp4"
          autoPlay
          muted
          playsInline
        />
      )}

      <div className="project-content"></div>
    </section>
  );
}
