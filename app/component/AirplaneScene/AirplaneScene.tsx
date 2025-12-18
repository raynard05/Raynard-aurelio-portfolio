"use client";

import React, { useRef, useEffect, useLayoutEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import "./AirplaneScene.css";

gsap.registerPlugin(ScrollTrigger);

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

    // GSAP ScrollTrigger Animation Timeline
    useLayoutEffect(() => {
        if (!planeRef.current) return;

        const plane = planeRef.current;

        // Set initial position (Hero section)
        gsap.set(plane.position, { x: -2, y: 0, z: 2 });
        gsap.set(plane.rotation, { x: 0, y: Math.PI / 4, z: 0 });
        gsap.set(plane.scale, { x: 3, y: 3, z: 3 });

        const ctx = gsap.context(() => {
            // Scene 1: Hero → Skills Transition
            if (skillsRef.current) {
                gsap.to(plane.position, {
                    x: 3,
                    y: 1,
                    z: 0,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: skillsRef.current,
                        start: "top bottom",
                        end: "top center",
                        scrub: 1.5,
                    },
                });

                gsap.to(plane.rotation, {
                    x: -0.2,
                    y: Math.PI / 6,
                    z: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: skillsRef.current,
                        start: "top bottom",
                        end: "top center",
                        scrub: 1.5,
                    },
                });
            }

            // Scene 2: Skills → Projects Transition
            if (projectsRef.current) {
                gsap.to(plane.position, {
                    x: -1,
                    y: 0.8,
                    z: -0.5,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: projectsRef.current,
                        start: "top bottom",
                        end: "top center",
                        scrub: 1.5,
                    },
                });

                gsap.to(plane.rotation, {
                    x: 0,
                    y: -Math.PI / 8,
                    z: 0,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: projectsRef.current,
                        start: "top bottom",
                        end: "top center",
                        scrub: 1.5,
                    },
                });
            }

            // Scene 3: Projects → Testimonials Transition
            if (testimonialsRef.current) {
                gsap.to(plane.position, {
                    x: 0,
                    y: 1.2,
                    z: 1,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: testimonialsRef.current,
                        start: "top bottom",
                        end: "top center",
                        scrub: 1.5,
                    },
                });

                gsap.to(plane.rotation, {
                    x: 0.1,
                    y: 0,
                    z: 0,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: testimonialsRef.current,
                        start: "top bottom",
                        end: "top center",
                        scrub: 1.5,
                    },
                });

                gsap.to(plane.scale, {
                    x: 1.2,
                    y: 1.2,
                    z: 1.2,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: testimonialsRef.current,
                        start: "top bottom",
                        end: "top center",
                        scrub: 1.5,
                    },
                });
            }

            // Scene 4: Testimonials → Contact Transition
            if (contactRef.current) {
                gsap.to(plane.position, {
                    x: 1.5,
                    y: 0.5,
                    z: 0.5,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: contactRef.current,
                        start: "top bottom",
                        end: "top center",
                        scrub: 1.5,
                    },
                });

                gsap.to(plane.rotation, {
                    x: 0,
                    y: Math.PI / 4,
                    z: 0,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: contactRef.current,
                        start: "top bottom",
                        end: "top center",
                        scrub: 1.5,
                    },
                });

                gsap.to(plane.scale, {
                    x: 1.0,
                    y: 1.0,
                    z: 1.0,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: contactRef.current,
                        start: "top bottom",
                        end: "top center",
                        scrub: 1.5,
                    },
                });
            }

            // Scene 5: Contact → Exit Animation
            if (contactRef.current) {
                gsap.to(plane.position, {
                    x: 10,
                    y: 2,
                    z: -3,
                    ease: "expo.in",
                    scrollTrigger: {
                        trigger: contactRef.current,
                        start: "center center",
                        end: "bottom top",
                        scrub: 0.8,
                    },
                });

                gsap.to(plane.rotation, {
                    x: 0,
                    y: Math.PI / 2,
                    z: 0.3,
                    ease: "expo.in",
                    scrollTrigger: {
                        trigger: contactRef.current,
                        start: "center center",
                        end: "bottom top",
                        scrub: 0.8,
                    },
                });
            }
        });

        return () => ctx.revert();
    }, [planeRef, heroRef, skillsRef, projectsRef, testimonialsRef, contactRef]);

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

    return (
        <div className="airplane-scene-container">
            <AirplaneCanvas planeRef={planeRef} {...props} />
        </div>
    );
}
