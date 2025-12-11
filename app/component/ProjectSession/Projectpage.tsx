"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import "./ProjectPage.css";

export default function ProjectPage() {
  const { scrollYProgress } = useScroll();

  const [circleFull, setCircleFull] = useState(false);
  const [freezeBG, setFreezeBG] = useState(false);

  const [videoReady, setVideoReady] = useState(false);
  const [videoStart, setVideoStart] = useState(false);

  const [fadeOut, setFadeOut] = useState(false);
  const [hideVideo, setHideVideo] = useState(false);

  /** Clip path mengikuti scroll hingga 150% */
  const clipPathScroll = useTransform(
    scrollYProgress,
    [0.9, 1],
    ["circle(0% at 0% 0%)", "circle(150% at 0% 0%)"]
  );

  /** Ketika sudah 150%, stop scroll effect */
  useEffect(() => {
    return clipPathScroll.on("change", (v) => {
      if (v.includes("150%") && !circleFull) {
        setCircleFull(true);
        setFreezeBG(true);

        // langsung start video kalau sudah full
        if (videoReady) {
          setVideoStart(true);

          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              setHideVideo(true);
            }, 1500);
          }, 10000);
        }
      }
    });
  }, [circleFull, videoReady]);

  /** Jika video siap → tampilkan video */
  useEffect(() => {
    if (videoReady && circleFull) {
      setVideoStart(true);

      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setHideVideo(true);
        }, 1500);
      }, 10000);
    }
  }, [videoReady, circleFull]);

  return (
    <section className="project-section">

      {/* ========== BACKGROUND CIRCLE ========== */}
      <motion.div
        style={{
          clipPath: freezeBG ? "circle(150% at 0% 0%)" : clipPathScroll
        }}
        className="project-animated-bg"
      />

      {/* ========== VIDEO ========== */}
      {!hideVideo && (
       <video
          className={`project-video-bg ${fadeOut ? "fade-out" : ""}`}
          src="/video_1.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"     
          onLoadedData={() => setVideoReady(true)}
          onEnded={() => {
            setFadeOut(true);
            setTimeout(() => {
              setHideVideo(true);
            }, 1500); // durasi fade-out
          }}
        />

      )}

    </section>
  );
}
