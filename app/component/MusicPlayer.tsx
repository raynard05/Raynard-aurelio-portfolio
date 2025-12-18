"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Music } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Sync state with actual audio playback
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => {
            console.log("Audio started playing");
            setIsPlaying(true);
        };

        const handlePause = () => {
            console.log("Audio paused");
            setIsPlaying(false);
        };

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, []);

    // Handle Play/Pause
    const togglePlay = () => {
        console.log("=== togglePlay called ===");
        console.log("audioRef.current:", audioRef.current);
        console.log("isPlaying:", isPlaying);

        if (!audioRef.current) {
            console.error("audioRef.current is null!");
            return;
        }

        if (isPlaying) {
            console.log("Attempting to PAUSE audio...");
            audioRef.current.pause();
            console.log("Pause command sent");
        } else {
            console.log("Attempting to PLAY audio...");
            audioRef.current.play()
                .then(() => console.log("Play promise resolved"))
                .catch((e) => console.error("Play failed:", e));
        }
    };

    // Custom Loop Logic (18s - 40s)
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            // Loop interval: 18s to 40s
            if (audio.currentTime >= 40) {
                audio.currentTime = 18;
            }
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
    }, []);

    // Play audio when Preloader finishes
    useEffect(() => {
        const handlePreloaderComplete = () => {
            console.log("MusicPlayer: preloader-complete event received");
            if (audioRef.current) {
                console.log("MusicPlayer: Starting audio playback");
                audioRef.current.currentTime = 18; // Start at 18s
                audioRef.current.volume = 0.4;
                audioRef.current.play()
                    .then(() => {
                        console.log("MusicPlayer: Audio playing successfully");
                    })
                    .catch((e) => {
                        console.log("MusicPlayer: Autoplay blocked:", e);
                    });
            } else {
                console.warn("MusicPlayer: audioRef is null, cannot play audio");
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener("preloader-complete", handlePreloaderComplete);
            return () => window.removeEventListener("preloader-complete", handlePreloaderComplete);
        }
    }, []);

    return (
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 h-9">
            {/* Hidden Audio Element */}
            <audio ref={audioRef} src="/song.mp3" loop />

            {/* Play/Pause Button */}
            <button
                onClick={(e) => {
                    console.log("Button clicked!", e);
                    togglePlay();
                }}
                className="flex items-center justify-center text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
                style={{ pointerEvents: 'auto' }}
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
