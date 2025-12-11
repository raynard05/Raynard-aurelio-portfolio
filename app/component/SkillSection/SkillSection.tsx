"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import "./Skills.css";
import TargetCursor from "@/components/TargetCursor";
import ElectricBorder from "@/components/ElectricBorder";
import StarBorder from "@/components/StarBorder";
import AnimatedContent  from "@/components/AnimatedContent"
import { GridScan } from "@/components/GridScan";
import CurvedLoop from "@/components/CurvedLoop"
import { Suspense } from "react";

interface ModelProps {
  path: string;
}

function Model({ path }: ModelProps) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={1.1} />;
}


export default function skillsSection() {
  const assets = [
    { name: "Firebase", path: "/assets/1.glb" },
    { name: "Flutter", path: "/assets/2.glb" },
    { name: "Java", path: "/assets/3.glb" },
    { name: "JavaScript", path: "/assets/4.glb" },
    { name: "Laravel", path: "/assets/5.glb" },
    { name: "MQTT", path: "/assets/6.glb" },
    { name: "Mysql", path: "/assets/7.glb" },
    { name: "Phyton", path: "/assets/8.glb" },
    { name: "React", path: "/assets/9.glb" },
 
  ];

  function Loader() {
  return (
    <div className="loader-3d">
      <div className="spinner" />
      <p>Loading 3D...</p>
    </div>
  );
}


  return (
    <section className="skills-section">
       <div className="absolute inset-0 -z-10">
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
    
        <TargetCursor 
              spinDuration={4}
              hideDefaultCursor={true}
              parallaxOn={true}
            />
      <h2 className="title">
        Skills <span>& Technologies</span>
      </h2>
      <p className="subtitle"> </p>

      <div className="grid-container">
        {assets.map((a, i) => (
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
  delay={0.8}
>
  <div className="card cursor-target" key={i}>
    <ElectricBorder
      color="#FFD000"
      speed={0.6}
      chaos={0.5}
      thickness={4}
    >
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

        <p>{a.name}</p>
      </div>
    </ElectricBorder>
  </div>
</AnimatedContent>


        ))}
      </div>
      {/* Static Stats */}
            <div className="stats-row">

          <StarBorder
              as="div"
              color="#FFD000"
              speed="3s"
              className="w-[290px] py-6 text-center rounded-xl  cursor-target"
            >
              <h3 className="text-4xl font-bold">10+ </h3>
              <p className="opacity-80 mt-2">Technologies Mastered</p>
            </StarBorder>

            <StarBorder
              as="div"
              color="#FFD000"
              speed="3s"
              className="w-[290px]  py-6 text-center rounded-xl  cursor-target"
            >
              <h3 className="text-4xl font-bold">5</h3>
              <p className="opacity-80 mt-2">Projects Completed</p>
            </StarBorder>

            <StarBorder
              as="button"
              color="#FFD000"
              speed="3s"

              className="w-[290px] py-6 text-center rounded-xl cursor-target"
            >
              <h3 className="text-4xl font-bold">100%</h3>
              <p className="opacity-80 mt-2">Client Satisfaction</p>
            </StarBorder>
                      </div>
      <div className="curvedloop-wrapper">
<CurvedLoop 
  marqueeText="Hire Me ✦ Hire Me ✦ Hire Me ✦ "
  speed={5}
  curveAmount={250}
  direction="right"
  interactive={true}
 
/>
</div>
                         
              </section>
  );
}
