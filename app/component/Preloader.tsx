"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";

const Preloader = () => {
    const [loading, setLoading] = useState(true);
    // Split Progress Tracking
    const { progress: modelProgress, active: modelActive } = useProgress(); // 0 to 100
    const [interfaceProgress, setInterfaceProgress] = useState(0); // 0 to 100

    const displayProgress = Math.floor((modelProgress + interfaceProgress) / 2);

    const [loadingText, setLoadingText] = useState("Preparing 3D Asset...");

    const messages = [
        "Preparing 3D Asset...",
        "Checking Responsive Layout...",
        "Preparing Song...",
        "Preparing Best Experience...",
        "Preparing Me To Work For You..."
    ];

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
        // Simulate checking the DOM/Layout
        const interval = setInterval(() => {
            setInterfaceProgress((prev) => {
                if (prev >= 90) return 90; // Wait for real window load
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

    // Completion Check
    useEffect(() => {
        // Only finish if BOTH are 100% (or effectively done)
        const is3DReady = modelProgress === 100 || (modelProgress === 0 && !modelActive);
        const isDOMReady = interfaceProgress === 100;

        if (is3DReady && isDOMReady) {
            // Show "Enter" button instead of auto-hiding
            const timer = setTimeout(() => {
                setShowEnterButton(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [modelProgress, modelActive, interfaceProgress]);

    const handleEnter = () => {
        setLoading(false);
        // Dispatch event for Music Player (Now trusted because of click)
        window.dispatchEvent(new Event("preloader-complete"));
    };

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ y: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-[#F4D03F]"
                >
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
                                    animate={{ width: `${displayProgress}%` }}
                                    transition={{ ease: "linear", duration: 0.2 }}
                                />
                            </div>

                            <div className="mt-4 flex flex-col items-center gap-1 font-mono text-center">
                                <p className="font-bold text-lg md:text-xl">
                                    {displayProgress}%
                                </p>

                                <motion.p
                                    key={loadingText}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="text-sm opacity-80"
                                >
                                    {loadingText}
                                </motion.p>

                                <div className="flex gap-4 text-[10px] opacity-50 mt-2 uppercase tracking-widest">
                                    <span>Assets: {Math.round(modelProgress)}%</span>
                                    <span>Interface: {interfaceProgress}%</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleEnter}
                            className="mt-8 px-8 py-3 bg-[#F4D03F] text-black font-bold text-lg rounded-full shadow-[0_0_20px_rgba(244,208,63,0.4)] hover:shadow-[0_0_30px_rgba(244,208,63,0.6)] transition-all"
                        >
                            ENTER EXPERIENCE
                        </motion.button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
