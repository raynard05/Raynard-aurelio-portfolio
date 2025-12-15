"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import "./ProjectPage.css";
import InfiniteMenu from "@/components/InfiniteMenu";
import { useDevice } from "@/app/useDevice";
import AnimatedContent  from "@/components/AnimatedContent"

type ProjectItem = {
  image: string;
  title: string;
  description: string;
};

function MobileProjectList({ items }: { items: ProjectItem[] }) {
  return (
    <div className="mobile-project-list">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="mobile-project-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <img src={item.image} alt={item.title} loading="lazy" />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default function ProjectPage() {
  const { scrollYProgress } = useScroll();
  const { deviceClass, isSmallScreen } = useDevice();

  const [circleFull, setCircleFull] = useState(false);
  const [freezeBG, setFreezeBG] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [hideVideo, setHideVideo] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const clipPathScroll = useTransform(
    scrollYProgress,
    [0.9, 1],
    ["circle(0% at 0% 0%)", "circle(150% at 0% 0%)"]
  );

  const items = [
    {
      image: "/project1.png",
      title: "Smarthouse App",
      description:
        "Smarthouse mobile application for monitoring home security based on MQTT, Firebase and Flutter",
    },
    {
      image: "/project2.png",
      title: "ShrimpScale",
      description: "Freelance Desktop app for Pt. Wirontono Baru Jakarta.",
    },
    {
      image: "/project3.png",
      title: "Unesa Eco-edu",
      description:
        "Freelance Unesa eco-edu tourism website for the cultural village of Lidah Wetan based on Next.js",
    },
    {
      image: "/project4.png",
      title: "Talent-Go",
      description:
        "Internship for PT Vascomm Sidoarjo – Laravel + MySQL website",
    },
    {
      image: "/project5.jpg",
      title: "One-Click",
      description:
        "Freelance MIT inventory application from health information students",
    },
  ];

  const items2 = [
    {
      image: "/project1.png",
      link: "#",
      title: "Smarthouse App",
      description:
        "Smarthouse mobile application for monitoring home security based on MQTT, Firebase and Flutter",
    },
    {
      image: "/project2.png",
      link: "#",
      title: "ShrimpScale",
      description: "Freelance Desktop app for Pt. Wirontono Baru Jakarta.",
    },
    {
      image: "/project3.png",
      link: "#",
      title: "Unesa Eco-edu",
      description:
        "Freelance Unesa eco-edu tourism website for the cultural village of Lidah Wetan based on next.js",
    },
    {
      image: "/project4.png",
      link: "#",
      title: "Talent-Go",
      description:
        "internship for pt.vascomm sidoarjo - Talent-Go laravel mysql & website",
    },
    {
      image: "/project5.jpg",
      link: "#",
      title: "One-Click",
      description:
        "Freelance MIT inventory application from polytechnic health information management students",
    },
  ];

  // Mobile: Skip video and show content immediately
  useEffect(() => {
    if (isSmallScreen) {
      setShowContent(true);
      setHideVideo(true);
      setCircleFull(true);
      setFreezeBG(true);
    }
  }, [isSmallScreen]);

  /** Freeze background circle (desktop only) */
  useEffect(() => {
    if (!isSmallScreen) {
      return clipPathScroll.on("change", (v) => {
        if (v.includes("150%") && !circleFull) {
          setCircleFull(true);
          setFreezeBG(true);
        }
      });
    }
  }, [circleFull, isSmallScreen, clipPathScroll]);

  /** Show content after video (desktop only) */
  useEffect(() => {
    if (!isSmallScreen && hideVideo) {
      setShowContent(true);
    }
  }, [hideVideo, isSmallScreen]);

  return (
    <section id="projects" className={`project-section ${deviceClass}`}>
      {/* BACKGROUND CIRCLE */}
      {isSmallScreen ? (
  // Mobile: Image
    <AnimatedContent
          distance={150}
    direction="horizontal"
    reverse={true}
    duration={1.3}
    ease="power3.in"
    initialOpacity={1}
    animateOpacity
    scale={0.1}
    threshold={0.2}
    delay={0.5}>
  <div className="project-title-wrapper">
    <img src="/figma1.png" />
  </div>
  </AnimatedContent>
) : (
  // Desktop: Text
""
)}
      <motion.div
        style={{
          clipPath: isSmallScreen
            ? "circle(150% at 0% 0%)" // Always full on mobile
            : freezeBG
            ? "circle(150% at 0% 0%)"
            : clipPathScroll,
        }}
        className="project-animated-bg"
      />

      {/* CONTENT */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="project-content"
        >
          {isSmallScreen ? (
            <MobileProjectList items={items} />
          ) : (
            <InfiniteMenu items={items2} />
          )}
        </motion.div>
      )}

      {/* VIDEO - Desktop Only */}
      {!isSmallScreen && !hideVideo && (
        <video
          className={`project-video-bg ${fadeOut ? "fade-out" : ""}`}
          src="/video_2.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={() => {
            setFadeOut(true);
            setTimeout(() => setHideVideo(true), 1500);
          }}
        />
      )}
    </section>
  );
}