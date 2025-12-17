"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Music } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(true); // Auto-play requested
    const audioRef = useRef<HTMLAudioElement>(null);

    // Handle Play/Pause
    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((e) => console.log("Autoplay blocked:", e));
        }
        setIsPlaying(!isPlaying);
    };

    // Attempt Autoplay on mount
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.4; // Valid volume
            audioRef.current.play().catch(() => {
                setIsPlaying(false); // If autoplay blocked, update state
            });
        }
    }, []);

    return (
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 h-9">
            {/* Hidden Audio Element */}
            <audio ref={audioRef} src="/song.mp3" loop />

            {/* Play/Pause Button */}
            <button
                onClick={togglePlay}
                className="flex items-center justify-center text-yellow-400 hover:text-yellow-300 transition-colors"
            >
                {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            </button>

            {/* Song Info (Marquee) */}
            <div className="w-24 md:w-32 overflow-hidden relative h-full flex items-center">
                <motion.div
                    className="whitespace-nowrap text-xs font-mono text-white/80"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 10,
                        ease: "linear",
                    }}
                >
                    24.03 (Live at Studio 1, Warsaw) &nbsp;&nbsp;&nbsp; 24.03 (Live at Studio 1, Warsaw) &nbsp;&nbsp;&nbsp;
                </motion.div>
            </div>

            {/* Decoration Icon */}
            <Music size={12} className={`text-white/40 ${isPlaying ? "animate-pulse" : ""}`} />
        </div>
    );
}
