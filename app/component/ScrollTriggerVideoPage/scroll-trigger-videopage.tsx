"use client";

import { useRef } from "react";
import "./scroll-trigger-videopage.css";

export default function ScrollTriggerVideoPage() {
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div className="scroll-video-container">
            <div className="scroll-video-wrapper">
                <div className="scroll-video-frame">
                    <video
                        ref={videoRef}
                        className="scroll-video"
                        src="/karafuru.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                    />
                </div>
            </div>
        </div>
    );
}
