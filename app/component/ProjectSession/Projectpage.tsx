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
  const [videoReady, setVideoReady] = useState(false); // ⭐ Loader video
  const [lockedClip, setLockedClip] = useState(false); // ⭐ Lock 150%

  // ClipPath
  const clipPathScroll = useTransform(
    scrollYProgress,
    [0.9, 1],
    ["circle(0% at 0% 0%)", "circle(150% at 0% 0%)"]
  );

  // ⭐ Lock agar tidak kembali mengecil
  useEffect(() => {
    return clipPathScroll.on("change", (v) => {
      if (!lockedClip && v.includes("150%")) {
        setLockedClip(true);
      }
    });
  }, [lockedClip]);

  // ⭐ Jika sudah locked, jangan ikut scroll lagi
  const finalClipPath = lockedClip
    ? "circle(150% at 0% 0%)"
    : clipPathScroll;

  // ⭐ VIDEO LOADED → Mulai timer fade
  useEffect(() => {
    if (videoReady && !fadeOut) {
      // mulai setelah 12 detik video main
      setTimeout(() => {
        setFadeOut(true);

        // setelah fade selesai hide
        setTimeout(() => {
          setHideVideo(true);
        }, 1500);

      }, 12000);
    }
  }, [videoReady]);

  return (
    <section className="project-section">

      {/* Animated background */}
      <motion.div
        style={{ clipPath: finalClipPath }}
        animate={controls}
        className="project-animated-bg"
      />

      {/* ⭐ VIDEO LOADER */}
      {!videoReady && (
        <div className="video-loader">
          <div className="spinner" />
          <p>Loading video...</p>
        </div>
      )}

      {/* VIDEO */}
      {!hideVideo && (
        <video
          className={`project-video-bg ${fadeOut ? "fade-out" : ""}`}
          src="/video_1.mp4"
          autoPlay
          muted
          playsInline
          onCanPlayThrough={() => setVideoReady(true)} // ⭐ video siap → loader hilang
        />
      )}

      <div className="project-content"></div>
    </section>
  );
}
