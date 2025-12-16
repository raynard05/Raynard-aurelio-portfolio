"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import "./ProjectPage.css";
import InfiniteMenu from "@/components/InfiniteMenu";
import { useDevice } from "@/app/useDevice";
import AnimatedContent from "@/components/AnimatedContent"

type ProjectItem = {
  image: string;
  title: string;
  description: string;
  category: string;
  year: string;
};

function MobileProjectList({ items }: { items: ProjectItem[] }) {
  return (
    <div className="mobile-project-list">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="mobile-project-item"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.1, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="mobile-project-image-wrapper">
            <img src={item.image} alt={item.title} loading="lazy" />
          </div>

          <div className="mobile-project-content-wrapper">
            <span className="mobile-project-category">{item.category} • {item.year}</span>

            <div className="mobile-project-header">
              <h3>{item.title}</h3>
            </div>

            <p>{item.description}</p>

            <div className="mobile-project-footer">
              <span className="project-link-btn">
                View Case Study
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="#FFD000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
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
      category: "Mobile App",
      year: "2024",
      description:
        "Smarthouse mobile application for monitoring home security based on MQTT, Firebase and Flutter",
    },
    {
      image: "/project2.png",
      title: "ShrimpScale",
      category: "Desktop App",
      year: "2023",
      description: "Freelance Desktop app for Pt. Wirontono Baru Jakarta.",
    },
    {
      image: "/project3.png",
      title: "Unesa Eco-edu",
      category: "Web Development",
      year: "2023",
      description:
        "Freelance Unesa eco-edu tourism website for the cultural village of Lidah Wetan based on Next.js",
    },
    {
      image: "/project4.png",
      title: "Talent-Go",
      category: "Web Platform",
      year: "2024",
      description:
        "Internship for PT Vascomm Sidoarjo – Laravel + MySQL website",
    },
    {
      image: "/project5.jpg",
      title: "One-Click",
      category: "Inventory System",
      year: "2023",
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