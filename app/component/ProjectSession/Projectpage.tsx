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
    { image: '/project1.png', link: '#', title: 'Smarthouse App', description: 'Smarthouse mobile application for monitoring home security based on MQTT, Firebase and Flutter' },
    { image: '/project2.png', link: '#', title: 'ShrimpScale', description: 'Freelance Desktop app for Pt. Wirontono Baru Jakarta.' },
    { image: '/project3.png', link: '#', title: 'Unesa Eco-edu', description: ' Freelance Unesa eco-edu tourism website for the cultural village of Lidah Wetan based on next.js' },
     { image: '/project4.png', link: '#', title: 'Talent-Go', description: 'internship for pt.vascomm sidoarjo - Talent-Go laravel mysql & website' },
     { image: '/project5.jpg', link: '#', title: 'One-Click', description: ' Freelance MIT inventory application from polytechnic health information management students' }
  
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
