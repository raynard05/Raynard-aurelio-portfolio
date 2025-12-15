"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import "./Skills.css";
import { IconCloud } from "@/components/ui/icon-cloud";
import ElectricBorder from "@/components/ElectricBorder";
import StarBorder from "@/components/StarBorder";
import AnimatedContent  from "@/components/AnimatedContent"
import { GridScan } from "@/components/GridScan";
import CurvedLoop from "@/components/CurvedLoop"
import { Suspense } from "react";
import { useDevice } from "@/app/useDevice";
interface ModelProps {
  path: string;
}

function Model({ path }: ModelProps) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={1.1} />;
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
    const { deviceClass, isSmallScreen } = useDevice();

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
]


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
  delay={0.5}
>
  <div className="card cursor-target" key={i}>
    <div>
      
    </div>
    {!isSmallScreen && (
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
              <h3 className="text-4xl font-bold">10+ </h3>
              <p className="opacity-80 mt-2">Technologies Mastered</p>
            </StarBorder>
          )}
          {isSmallScreen && (
            <div className="w-[290px] py-6 text-center rounded-xl">
              <h3 className="text-4xl font-bold">10+ </h3>
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
              <h3 className="text-4xl font-bold">5</h3>
              <p className="opacity-80 mt-2">Projects Completed</p>
            </StarBorder>
          )}
          {isSmallScreen && (
            <div className="w-[290px] py-6 text-center rounded-xl">
              <h3 className="text-4xl font-bold">5</h3>
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
              <h3 className="text-4xl font-bold">100%</h3>
              <p className="opacity-80 mt-2">Client Satisfaction</p>
            </StarBorder>
          )}
          {isSmallScreen && (
            <div className="w-[290px] py-6 text-center rounded-xl">
              <h3 className="text-4xl font-bold">100%</h3>
              <p className="opacity-80 mt-2">Client Satisfaction</p>
            </div>
          )}
        </div>
      <div className="curvedloop-wrapper " >
<CurvedLoop 
  marqueeText="Hire Me ✦ Let's Work Together ✦ Connect with me ✦ "
  speed={2}
  curveAmount={250}
  direction="right"
  interactive={true}
 
/>
</div>
                         
              </section>
  );
}