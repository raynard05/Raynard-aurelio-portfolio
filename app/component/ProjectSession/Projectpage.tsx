"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import "./ProjectPage.css";
import InfiniteMenu  from "@/components/InfiniteMenu";

export default function ProjectPage() {
  const { scrollYProgress } = useScroll();

  const [circleFull, setCircleFull] = useState(false);
  const [freezeBG, setFreezeBG] = useState(false);

  const [videoReady, setVideoReady] = useState(false);
  const [videoStart, setVideoStart] = useState(false);

  const [fadeOut, setFadeOut] = useState(false);
  const [hideVideo, setHideVideo] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const clipPathScroll = useTransform(
    scrollYProgress,
    [0.9, 1],
    ["circle(0% at 0% 0%)", "circle(150% at 0% 0%)"]
  );

  const items = [
    { image: 'https://picsum.photos/300/300?grayscale', link: '#', title: 'Item 1', description: 'This is pretty cool, right?' },
    { image: 'https://picsum.photos/400/400?grayscale', link: '#', title: 'Item 2', description: 'This is pretty cool, right?' },
    { image: 'https://picsum.photos/500/500?grayscale', link: '#', title: 'Item 3', description: 'This is pretty cool, right?' },
    { image: 'https://picsum.photos/600/600?grayscale', link: '#', title: 'Item 4', description: 'This is pretty cool, right?' }
  ];

  /** Ketika sudah 150%, stop scroll effect */
  useEffect(() => {
    return clipPathScroll.on("change", (v) => {
      if (v.includes("150%") && !circleFull) {
        setCircleFull(true);
        setFreezeBG(true);

        if (videoReady) {
          setVideoStart(true);
        }
      }
    });
  }, [circleFull, videoReady]);

  /** Munculkan menu setelah video hilang */
  useEffect(() => {
    if (hideVideo) {
      setShowMenu(true);
    }
  }, [hideVideo]);

  return (
    <section className="project-section">

      {/* BACKGROUND CIRCLE */}
      <motion.div
        style={{ clipPath: freezeBG ? "circle(150% at 0% 0%)" : clipPathScroll }}
        className="project-animated-bg"
      />

      {/* Infinite Menu */}
      {showMenu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ height: '600px', position: 'relative' }}
        >
          <InfiniteMenu items={items} />
        </motion.div>
      )}

      {/* VIDEO */}
      {!hideVideo && (
        <video
          className={`project-video-bg ${fadeOut ? "fade-out" : ""}`}
          src="/video_2.mp4"
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
