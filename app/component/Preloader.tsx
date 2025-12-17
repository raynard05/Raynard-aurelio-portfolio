"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // If usage of document.readyState is not enough, we can also bind window loaded event
        // But since this component mounts, we start tracking.

        // Simulate initial progress to show it's working
        const interval = setInterval(() => {
            setProgress((prev) => {
                // cap at 90% until actually loaded
                if (prev >= 90) return 90;
                return prev + 1; // slow increment
            });
        }, 50);

        const handleLoad = () => {
            // jump to 100
            setProgress(100);
            clearInterval(interval);
            // slight delay to let user see 100%
            setTimeout(() => {
                setLoading(false);
            }, 500);
        };

        // Check if already loaded
        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => {
                window.removeEventListener("load", handleLoad);
                clearInterval(interval);
            };
        }
    }, []);

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

                    <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mt-4">
                        <motion.div
                            className="h-full bg-[#F4D03F]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear", duration: 0.2 }}
                        />
                    </div>
                    <p className="mt-4 font-mono font-bold text-lg md:text-xl">
                        {progress}%
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
