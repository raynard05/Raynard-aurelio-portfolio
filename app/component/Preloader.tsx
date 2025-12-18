"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Interactive 3D Globe Component
function Globe() {
    const meshRef = useRef<THREE.Mesh>(null);
    const particlesRef = useRef<THREE.Points>(null);

    // Create globe with wireframe
    useEffect(() => {
        if (particlesRef.current) {
            const positions = particlesRef.current.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const radius = 2.5 + Math.random() * 0.5;

                positions[i] = radius * Math.sin(phi) * Math.cos(theta);
                positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
                positions[i + 2] = radius * Math.cos(phi);
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.003;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
        if (particlesRef.current) {
            particlesRef.current.rotation.y += 0.001;
        }
    });

    // Create particles geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    return (
        <group>
            {/* Main Globe */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[2.2, 64, 64]} />
                <meshStandardMaterial
                    color="#FFD000"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Inner Glow */}
            <mesh>
                <sphereGeometry args={[2.1, 32, 32]} />
                <meshBasicMaterial
                    color="#FFD000"
                    transparent
                    opacity={0.1}
                />
            </mesh>

            {/* Particles */}
            <points ref={particlesRef} geometry={particlesGeometry}>
                <pointsMaterial
                    size={0.02}
                    color="#FFD000"
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                />
            </points>

            {/* Ambient Light */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#FFD000" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        </group>
    );
}

const Preloader = () => {
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Split Progress Tracking
    const { progress: modelProgress, active: modelActive } = useProgress();
    const [interfaceProgress, setInterfaceProgress] = useState(0);

    const displayProgress = Math.floor((modelProgress + interfaceProgress) / 2);

    const [loadingText, setLoadingText] = useState("Preparing 3D Asset...");

    const messages = [
        "Preparing 3D Asset...",
        "Checking Responsive Layout...",
        "Preparing Song...",
        "Preparing Best Experience...",
        "Preparing Me To Work For You..."
    ];

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Message Cycle
    useEffect(() => {
        let msgIndex = 0;
        const msgInterval = setInterval(() => {
            msgIndex = (msgIndex + 1) % messages.length;
            setLoadingText(messages[msgIndex]);
        }, 800);
        return () => clearInterval(msgInterval);
    }, []);

    // Interface / DOM Loading Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setInterfaceProgress((prev) => {
                if (prev >= 90) return 90;
                return prev + 1;
            });
        }, 30);

        const handleLoad = () => {
            setInterfaceProgress(100);
            clearInterval(interval);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => {
            window.removeEventListener("load", handleLoad);
            clearInterval(interval);
        };
    }, []);

    const [showEnterButton, setShowEnterButton] = useState(false);
    const [songProgress, setSongProgress] = useState(0);
    const [songReady, setSongReady] = useState(false);

    // Check if song is ready (Mobile) - Simplified to avoid audio conflict
    useEffect(() => {
        if (isMobile) {
            console.log("Mobile: Simulating song loading...");

            // Simulate loading progress
            const progressInterval = setInterval(() => {
                setSongProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 100);

            // Mark as ready after 2 seconds
            const readyTimer = setTimeout(() => {
                console.log("Mobile: Song marked as ready");
                setSongProgress(100);
                setSongReady(true);
            }, 2000);

            return () => {
                clearInterval(progressInterval);
                clearTimeout(readyTimer);
            };
        }
    }, [isMobile]);

    // Show Enter button when song is ready (Mobile)
    useEffect(() => {
        console.log("Mobile button check:", {
            isMobile,
            songReady,
            songProgress,
            interfaceProgress,
            shouldShow: isMobile && songReady && songProgress === 100 && interfaceProgress === 100
        });

        if (isMobile && songReady && songProgress === 100 && interfaceProgress === 100) {
            const timer = setTimeout(() => {
                console.log("Mobile: Song ready AND interface loaded, showing Enter button");
                setShowEnterButton(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isMobile, songReady, songProgress, interfaceProgress]);

    // Completion Check (Desktop only)
    useEffect(() => {
        if (isMobile) return; // Skip for mobile

        const is3DReady = modelProgress === 100 || (modelProgress === 0 && !modelActive);
        const isDOMReady = interfaceProgress === 100;

        if (is3DReady && isDOMReady) {
            const timer = setTimeout(() => {
                setShowEnterButton(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [modelProgress, modelActive, interfaceProgress, isMobile]);

    const handleEnter = () => {
        console.log("handleEnter called - setting loading to false");
        setLoading(false);

        // Dispatch event for music autoplay (both mobile and desktop)
        if (typeof window !== 'undefined') {
            try {
                const event = new Event("preloader-complete");
                window.dispatchEvent(event);
                console.log("preloader-complete event dispatched - music should autoplay");
            } catch (e) {
                console.error("Error dispatching preloader-complete event:", e);
            }
        }
    };

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        y: isMobile ? 0 : "-100%",
                        transition: { duration: isMobile ? 0.5 : 0.8, ease: "easeInOut" }
                    }}
                    className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center text-white overflow-hidden ${isMobile ? 'bg-black' : 'bg-gradient-to-b from-black via-gray-900 to-black'
                        }`}
                    style={{ pointerEvents: loading ? 'auto' : 'none' }}
                >
                    {/* Animated Background Grid */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `
                                linear-gradient(rgba(255, 208, 0, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255, 208, 0, 0.1) 1px, transparent 1px)
                            `,
                            backgroundSize: '50px 50px',
                            animation: 'gridMove 20s linear infinite'
                        }} />
                    </div>

                    {/* Desktop: 3D Globe */}
                    {!isMobile ? (
                        <div className="relative w-full h-full flex flex-col items-center justify-center">
                            {/* 3D Canvas */}
                            <div className="w-[500px] h-[500px] mb-8">
                                <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                                    <Suspense fallback={null}>
                                        <Globe />
                                    </Suspense>
                                </Canvas>
                            </div>

                            {/* Progress Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="relative z-10 flex flex-col items-center gap-6"
                            >
                                {!showEnterButton ? (
                                    <>
                                        {/* Circular Progress */}
                                        <div className="relative w-32 h-32">
                                            <svg className="w-full h-full -rotate-90">
                                                <circle
                                                    cx="64"
                                                    cy="64"
                                                    r="60"
                                                    stroke="rgba(255, 208, 0, 0.1)"
                                                    strokeWidth="8"
                                                    fill="none"
                                                />
                                                <motion.circle
                                                    cx="64"
                                                    cy="64"
                                                    r="60"
                                                    stroke="#FFD000"
                                                    strokeWidth="8"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    initial={{ strokeDasharray: "0 377" }}
                                                    animate={{ strokeDasharray: `${displayProgress * 3.77} 377` }}
                                                    transition={{ duration: 0.3 }}
                                                    style={{
                                                        filter: 'drop-shadow(0 0 10px rgba(255, 208, 0, 0.5))'
                                                    }}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-4xl font-bold text-[#FFD000]">
                                                    {displayProgress}%
                                                </span>
                                            </div>
                                        </div>

                                        {/* Loading Text */}
                                        <motion.p
                                            key={loadingText}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-xl font-medium text-[#FFD000]"
                                        >
                                            {loadingText}
                                        </motion.p>

                                        {/* Stats */}
                                        <div className="flex gap-8 text-sm opacity-60">
                                            <div className="flex flex-col items-center">
                                                <span className="text-[#FFD000] font-mono">{Math.round(modelProgress)}%</span>
                                                <span className="text-xs uppercase tracking-wider">Assets</span>
                                            </div>
                                            <div className="w-px h-10 bg-gray-700" />
                                            <div className="flex flex-col items-center">
                                                <span className="text-[#FFD000] font-mono">{interfaceProgress}%</span>
                                                <span className="text-xs uppercase tracking-wider">Interface</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <motion.button
                                        type="button"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleEnter}
                                        onTouchEnd={(e) => {
                                            e.preventDefault();
                                            handleEnter();
                                        }}
                                        className="relative px-12 py-4 bg-[#FFD000] text-black font-bold text-xl rounded-full overflow-hidden group cursor-pointer touch-manipulation"
                                    >
                                        <span className="relative z-10">ENTER EXPERIENCE</span>
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500"
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <div className="absolute inset-0 shadow-[0_0_30px_rgba(255,208,0,0.6)]" />
                                    </motion.button>
                                )}
                            </motion.div>
                        </div>
                    ) : (
                        /* Mobile: Original Simple Design */
                        <div className="flex flex-col items-center justify-center">
                            <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
                                <Image
                                    src="/assets/preloader-cartoon-no-text.png"
                                    alt="Loading..."
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            {!showEnterButton ? (
                                <>
                                    <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mt-4">
                                        <motion.div
                                            className="h-full bg-[#F4D03F]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.floor((songProgress + interfaceProgress) / 2)}%` }}
                                            transition={{ ease: "linear", duration: 0.2 }}
                                        />
                                    </div>

                                    <div className="mt-4 flex flex-col items-center gap-1 font-mono text-center">
                                        <p className="font-bold text-lg md:text-xl text-[#F4D03F]">
                                            {Math.floor((songProgress + interfaceProgress) / 2)}%
                                        </p>

                                        <motion.p
                                            key={loadingText}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            className="text-sm opacity-80 text-[#F4D03F]"
                                        >
                                            {loadingText}
                                        </motion.p>

                                        <div className="flex gap-4 text-[10px] opacity-50 mt-2 uppercase tracking-widest text-[#F4D03F]">
                                            <span>Song: {Math.round(songProgress)}%</span>
                                            <span>Content: {interfaceProgress}%</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <motion.button
                                    type="button"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                        console.log("Mobile button CLICKED!", e);
                                        handleEnter();
                                    }}
                                    onTouchStart={() => console.log("Touch started on button")}
                                    onTouchEnd={(e) => {
                                        console.log("Touch ended on button", e);
                                        e.preventDefault();
                                        handleEnter();
                                    }}
                                    className="mt-8 px-8 py-3 bg-[#F4D03F] text-black font-bold text-lg rounded-full shadow-[0_0_20px_rgba(244,208,63,0.4)] cursor-pointer touch-manipulation relative z-[10000]"
                                >
                                    ENTER EXPERIENCE
                                </motion.button>
                            )}
                        </div>
                    )}

                    <style jsx>{`
                        @keyframes gridMove {
                            0% {
                                transform: translateY(0);
                            }
                            100% {
                                transform: translateY(50px);
                            }
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
