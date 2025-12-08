"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import "./Skills.css";

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

  return (
    <section className="skills-section">
      <h2 className="title">
        Skills <span>& Technologies</span>
      </h2>
      <p className="subtitle">Showcasing 3D assets using React Three Fiber + Drei</p>

      <div className="grid-container">
        {assets.map((a, i) => (
          <div className="card" key={i}>
            <div className="r3f-wrapper">
              <Canvas camera={{ position: [2, 2, 2], fov: 40 }}>
                <ambientLight intensity={1} />
                <directionalLight position={[1, 1, 1]} intensity={1} />
                <Model path={a.path} />
                <OrbitControls enableZoom={false} />
                <Environment preset="studio" />
              </Canvas>
            </div>
            <p>{a.name}</p>
          </div>
        ))}
      </div>
      {/* Static Stats */}
            <div className="stats-row">
            <div className="stat-box">
            <h3>10+</h3>
            <p>Technologies Mastered</p>
            </div>
            <div className="stat-box">
            <h3>5</h3>
            <p>Projects Completed</p>
            </div>
            <div className="stat-box">
            <h3>100%</h3>
            <p>Client Satisfaction</p>
            </div>
            </div>
    </section>
  );
}
