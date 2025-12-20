"use client";

import { useEffect, useRef } from "react";
import { useDevice } from "@/app/useDevice";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./VerticalMarquee.css";

gsap.registerPlugin(ScrollTrigger);

export default function VerticalMarquee() {
    const { isWidthScreen } = useDevice();
    const leftMarqueeRef = useRef<HTMLDivElement>(null);
    const rightMarqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isWidthScreen || !leftMarqueeRef.current || !rightMarqueeRef.current) return;

        // Create scroll-triggered animations for both marquees
        const leftTl = gsap.timeline({
            scrollTrigger: {
                trigger: leftMarqueeRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
        });

        const rightTl = gsap.timeline({
            scrollTrigger: {
                trigger: rightMarqueeRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
        });

        // Left marquee scrolls down
        leftTl.to(leftMarqueeRef.current.querySelector(".marquee-content"), {
            y: "50%",
            ease: "none",
        });

        // Right marquee scrolls up
        rightTl.to(rightMarqueeRef.current.querySelector(".marquee-content"), {
            y: "-50%",
            ease: "none",
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [isWidthScreen]);

    // Only render on wide screens
    if (!isWidthScreen) return null;

    // Generate repeated text for marquee effect
    const marqueeText = Array(20).fill("raynard").join(" • ");

    return (
        <div className="vertical-marquee-container">
            {/* Left Marquee - Scrolls Down */}
            <div ref={leftMarqueeRef} className="vertical-marquee left">
                <div className="marquee-content">
                    <div className="marquee-text">{marqueeText}</div>
                    <div className="marquee-text">{marqueeText}</div>
                </div>
            </div>

            {/* Right Marquee - Scrolls Up */}
            <div ref={rightMarqueeRef} className="vertical-marquee right">
                <div className="marquee-content">
                    <div className="marquee-text">{marqueeText}</div>
                    <div className="marquee-text">{marqueeText}</div>
                </div>
            </div>
        </div>
    );
}
