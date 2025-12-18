"use client";

import React, { useRef, useEffect, useLayoutEffect, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import * as THREE from "three";
import "./AirplaneScene.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface AirplaneSceneProps {
    heroRef: React.RefObject<HTMLElement | null>;
    skillsRef: React.RefObject<HTMLElement | null>;
    projectsRef: React.RefObject<HTMLElement | null>;
    testimonialsRef: React.RefObject<HTMLElement | null>;
    contactRef: React.RefObject<HTMLElement | null>;
}

interface AirplaneModelProps {
    planeRef: React.RefObject<THREE.Group | null>;
}

function AirplaneModel({ planeRef }: AirplaneModelProps) {
    const { scene } = useGLTF("/pesawat.glb");

    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    (child as THREE.Mesh).castShadow = true;
                    (child as THREE.Mesh).receiveShadow = true;
                }
            });
        }
    }, [scene]);

    // Continuous floating animation
    useFrame((state) => {
        if (planeRef.current) {
            const t = state.clock.getElapsedTime();
            // Gentle bobbing effect - INCREASED amplitude for visibility
            planeRef.current.position.y = Math.sin(t * 1.2) * 0.15;
        }
    });

    return <primitive ref={planeRef} object={scene} scale={3.0} />;
}

// Preload model for better performance
useGLTF.preload("/pesawat.glb");

function AirplaneCanvas({ planeRef, ...props }: AirplaneSceneProps & { planeRef: React.RefObject<THREE.Group | null> }) {
    const { heroRef, skillsRef, projectsRef, testimonialsRef, contactRef } = props;

    // GSAP MotionPath Animation with Custom SVG Path
    useLayoutEffect(() => {
        if (!planeRef.current || !contactRef.current) return;

        const plane = planeRef.current;

        // Set initial scale
        gsap.set(plane.scale, { x: 3, y: 3, z: 3 });

        // Custom SVG Path: M 11 6 L 0 10 L 11 13 L -1 23 L 23 23
        // Normalized to 3D space coordinates
        const pathPoints = [
            { x: 1.1, y: 0.6, z: 2 },    // M 11 6 (start - Hero)
            { x: 0, y: 1.0, z: 1 },      // L 0 10 (Skills)
            { x: 1.1, y: 1.3, z: 0 },    // L 11 13 (Projects)
            { x: -0.1, y: 2.3, z: -1 },  // L -1 23 (Testimonials)
            { x: 2.3, y: 2.3, z: -2 },   // L 23 23 (Contact)
        ];

        const ctx = gsap.context(() => {
            // Main path animation synced to scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: () => `+=${contactRef.current?.offsetTop || 5000}`,
                    scrub: 1.5,
                    onUpdate: (self) => {
                        // Auto-rotate airplane to face direction of movement
                        const progress = self.progress;
                        const currentIndex = Math.floor(progress * (pathPoints.length - 1));
                        const nextIndex = Math.min(currentIndex + 1, pathPoints.length - 1);

                        if (currentIndex < pathPoints.length - 1) {
                            const current = pathPoints[currentIndex];
                            const next = pathPoints[nextIndex];
                            const angle = Math.atan2(next.x - current.x, next.z - current.z);
                            plane.rotation.y = angle;
                        }
                    },
                },
            });

            // Animate through each point
            pathPoints.forEach((point, index) => {
                if (index === 0) {
                    gsap.set(plane.position, point);
                } else {
                    tl.to(plane.position, {
                        x: point.x,
                        y: point.y,
                        z: point.z,
                        duration: 1,
                        ease: "power2.inOut",
                    }, index - 1);
                }
            });

            // Exit animation - fly to the right and disappear
            tl.to(plane.position, {
                x: 15,
                y: 2.5,
                z: -3,
                duration: 0.5,
                ease: "expo.in",
            }, pathPoints.length - 1);

            tl.to(plane.rotation, {
                y: Math.PI / 2,
                z: 0.4,
                duration: 0.5,
                ease: "expo.in",
            }, pathPoints.length - 1);
        });

        return () => ctx.revert();
    }, [planeRef, contactRef]);

    return (
        <Canvas
            camera={{
                position: [0, 0, 6],
                fov: 60,
                near: 0.1,
                far: 1000,
            }}
            dpr={[1, 1.5]}
            gl={{
                antialias: false,
                alpha: true,
                powerPreference: "high-performance",
                preserveDrawingBuffer: false,
                stencil: false,
                depth: true,
            }}
            frameloop="always"
            onCreated={({ gl }) => {
                gl.setClearColor(0x000000, 0);
                console.log("✈️ Airplane Canvas Created Successfully");
            }}
            className="airplane-canvas"
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            <directionalLight position={[-5, 3, -5]} intensity={0.3} />

            <Suspense fallback={null}>
                <AirplaneModel planeRef={planeRef} />
                <Environment preset="sunset" />
            </Suspense>
        </Canvas>
    );
}

export default function AirplaneScene(props: AirplaneSceneProps) {
    const planeRef = useRef<THREE.Group>(null);
    const [isMounted, setIsMounted] = useState(false);

    // Only render on client-side to prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Don't render anything on server
    }

    return (
        <div className="airplane-scene-container" suppressHydrationWarning>
            <AirplaneCanvas planeRef={planeRef} {...props} />
        </div>
    );
}
