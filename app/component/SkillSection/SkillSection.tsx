"use client";

import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import "./Skills.css";
import { IconCloud } from "@/components/ui/icon-cloud";
import ElectricBorder from "@/components/ElectricBorder";
import StarBorder from "@/components/StarBorder";
import AnimatedContent from "@/components/AnimatedContent"
import { GridScan } from "@/components/GridScan";
import CurvedLoop from "@/components/CurvedLoop"
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
gsap.registerPlugin(ScrollTrigger);

import { useDevice } from "@/app/useDevice";
interface ModelProps {
  path: string;
}

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Model({ path }: ModelProps) {
  const { scene } = useGLTF(path);
  const ref = useRef<THREE.Group>(null);

  // Cozy "Greeting" Animation (Idle)
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      // Gentle floating (bobbing)
      ref.current.position.y = Math.sin(t * 1) * 0.1;
      // Slow continuous rotation
      ref.current.rotation.y = t * 0.2;
    }
  });

  return <primitive ref={ref} object={scene} scale={1.1} />;
}

function CountUp({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest) + suffix);

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration });
    }
  }, [inView, count, to, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function skillsSection() {

  const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma",
  ]
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  )
  const { deviceClass, isSmallScreen, isWidthScreen } = useDevice();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  /* === ASSETS DEFINITION === */
  const assets = [
    {
      name: "Firebase",
      path: "/assets/1.glb",
      image: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg"
    },
    {
      name: "Flutter",
      path: "/assets/2.glb",
      image: "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg"
    },
    {
      name: "Java",
      path: "/assets/3.glb",
      image: "https://www.vectorlogo.zone/logos/java/java-icon.svg"
    },
    {
      name: "JavaScript",
      path: "/assets/4.glb",
      image: "/js2.png"
    },
    {
      name: "Laravel",
      path: "/assets/5.glb",
      image: "https://www.vectorlogo.zone/logos/laravel/laravel-icon.svg"
    },
    {
      name: "MQTT",
      path: "/assets/6.glb",
      image: "/mqtt2.png"
    },
    {
      name: "MySQL",
      path: "/assets/7.glb",
      image: "https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg"
    },
    {
      name: "Python",
      path: "/assets/8.glb",
      image: "https://www.vectorlogo.zone/logos/python/python-icon.svg"
    },
    {
      name: "React",
      path: "/assets/9.glb",
      image: "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
    }
  ];

  /* === GSAP DIRECTIONAL ANIMATION (Based on Sketch) === */
  useLayoutEffect(() => {
    if (!isWidthScreen || !containerRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const col = i % 3; // 0 (left), 1 (middle), 2 (right)

        // Animation based on column position (matching sketch)
        let animation = {};

        if (col === 0) {
          // Left column (1, 4, 7) → Fly LEFT
          animation = {
            x: -600,
            opacity: 0,
            rotationY: -45,
          };
        } else if (col === 1) {
          // Middle column (2, 5, 8) → Subtle scale
          animation = {
            scale: 0.8,
            opacity: 0.3,
          };
        } else if (col === 2) {
          // Right column (3, 6, 9) → Fly RIGHT
          animation = {
            x: 600,
            opacity: 0,
            rotationY: 45,
          };
        }

        gsap.to(card, {
          ...animation,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom top",
            scrub: 1.5,
            toggleActions: "play reverse play reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isWidthScreen, assets.length]);





  function Loader() {
    return (
      <div className="loader-3d">
        <div className="spinner" />
        <p>Loading 3D...</p>
      </div>
    );
  }


  return (
    <section id="skills" className="skills-section ">
      <div className={`absolute inset-0 -z-10 hidden md:block
             ${isSmallScreen ? "hidden" : ""
        }

        
        `}>
        <GridScan
          sensitivity={0.1}
          lineThickness={3}
          linesColor="#392e4e"
          gridScale={0.1}
          scanColor="#FFD000"
          scanOpacity={0.1}
          enablePost
          bloomIntensity={0.3}
          chromaticAberration={0.002}
          noiseIntensity={0}
        />
      </div>


      <h2 className="title-session">
        Skills <span className="mobile-text-tech">& Technologies</span>
      </h2>
      <AnimatedContent
        distance={150}
        direction="horizontal"
        reverse={true}
        duration={1.2}
        ease="power3.in"
        initialOpacity={1}
        animateOpacity
        scale={2}
        threshold={0.2}
        delay={0.4}>

        <div className={`relative flex size-full items-center justify-center overflow-hidden 
            ${isSmallScreen ? "" : "hidden"
          }
            
            `}>
          <IconCloud images={images} />
        </div>


      </AnimatedContent>

      <p className="subtitle"> </p>

      <div className="grid-container" ref={containerRef} style={{ overflow: "visible" }}>
        {assets.map((a, i) => (
          <div
            key={i}
            ref={el => { cardsRef.current[i] = el }}
            className="skill-card-wrapper"
            style={{ overflow: "visible" }}
          >
            <AnimatedContent
              distance={150}
              direction="vertical"
              reverse={false}
              duration={1.2}
              ease="bounce.out"
              initialOpacity={0.2}
              animateOpacity
              scale={1.1}
              threshold={0.2}
              delay={0.5}
            >
              <div className="card cursor-target" style={{ overflow: "visible" }}>
                <div></div>
                {!isSmallScreen && (
                  <ElectricBorder
                    color="#FFD000"
                    speed={0.6}
                    chaos={0.5}
                    thickness={4}
                    style={{ overflow: "visible" }}
                  >
                    <div style={{ borderRadius: 16, overflow: "visible" }}>
                      <div className="r3f-wrapper">
                        <Suspense fallback={<Loader />}>
                          <Canvas camera={{ position: [2, 2, 2], fov: 40 }}>
                            <ambientLight intensity={1} />
                            <directionalLight position={[1, 1, 1]} intensity={1} />
                            <Model path={a.path} />
                            <OrbitControls enableZoom={false} />
                            <Environment preset="studio" />
                          </Canvas>
                        </Suspense>
                      </div>
                      <img src={a.image} alt={a.name} className="skill-image" />
                      <p>{a.name}</p>
                    </div>
                  </ElectricBorder>
                )}
                {isSmallScreen && (
                  <div style={{ borderRadius: 16, overflow: "hidden" }}>
                    <div className="r3f-wrapper">
                      <Suspense fallback={<Loader />}>
                        <Canvas camera={{ position: [2, 2, 2], fov: 40 }}>
                          <ambientLight intensity={1} />
                          <directionalLight position={[1, 1, 1]} intensity={1} />
                          <Model path={a.path} />
                          <OrbitControls enableZoom={false} />
                          <Environment preset="studio" />
                        </Canvas>
                      </Suspense>
                    </div>
                    <img src={a.image} alt={a.name} className="skill-image" />
                    <p>{a.name}</p>
                  </div>
                )}
              </div>
            </AnimatedContent>
          </div>
        ))}
      </div>
      {/* Static Stats */}
      <div className="stats-row">

        {!isSmallScreen && (
          <StarBorder
            as="div"
            color="#FFD000"
            speed="3s"
            className="w-[290px] py-6 text-center rounded-xl cursor-target"
          >
            <h3 className="text-4xl font-bold"><CountUp to={10} suffix="+" /></h3>
            <p className="opacity-80 mt-2">Technologies Mastered</p>
          </StarBorder>
        )}
        {isSmallScreen && (
          <div className="w-[290px] py-6 text-center rounded-xl">
            <h3 className="text-4xl font-bold"><CountUp to={10} suffix="+" /></h3>
            <p className="opacity-80 mt-2">Technologies Mastered</p>
          </div>
        )}

        {!isSmallScreen && (
          <StarBorder
            as="div"
            color="#FFD000"
            speed="3s"
            className="w-[290px] py-6 text-center rounded-xl cursor-target"
          >
            <h3 className="text-4xl font-bold"><CountUp to={5} /></h3>
            <p className="opacity-80 mt-2">Projects Completed</p>
          </StarBorder>
        )}
        {isSmallScreen && (
          <div className="w-[290px] py-6 text-center rounded-xl">
            <h3 className="text-4xl font-bold"><CountUp to={5} /></h3>
            <p className="opacity-80 mt-2">Projects Completed</p>
          </div>
        )}

        {!isSmallScreen && (
          <StarBorder
            as="button"
            color="#FFD000"
            speed="3s"
            className="w-[290px] py-6 text-center rounded-xl cursor-target"
          >
            <h3 className="text-4xl font-bold"><CountUp to={100} suffix="%" /></h3>
            <p className="opacity-80 mt-2">Client Satisfaction</p>
          </StarBorder>
        )}
        {isSmallScreen && (
          <div className="w-[290px] py-6 text-center rounded-xl">
            <h3 className="text-4xl font-bold"><CountUp to={100} suffix="%" /></h3>
            <p className="opacity-80 mt-2">Client Satisfaction</p>
          </div>
        )}
      </div>
      <div className="curvedloop-wrapper " >
        <CurvedLoop
          marqueeText="Hire Me ✦ Let's Work Together ✦ Connect with me ✦ "
          speed={3}
          curveAmount={250}
          direction="right"
          interactive={true}
          variant="groovy"
        />
      </div>

    </section>
  );
}