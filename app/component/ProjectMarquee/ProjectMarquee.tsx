"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import "./ProjectMarquee.css";

function VerticalMarqueeRow({ baseVelocity, rowIndex }: { baseVelocity: number; rowIndex: number }) {
    const baseY = useMotionValue(0);
    const contentRef = useRef<HTMLDivElement>(null);
    const [itemHeight, setItemHeight] = useState(0);

    // Measure individual item height for precise wrapping
    useEffect(() => {
        if (contentRef.current) {
            const firstItem = contentRef.current.querySelector('.marquee-text');
            if (firstItem) {
                setItemHeight(firstItem.getBoundingClientRect().height);
            }
        }
    }, []);

    useAnimationFrame((t, delta) => {
        if (!itemHeight) return;

        const moveBy = baseVelocity * (delta / 1000);
        let newY = baseY.get() + moveBy;

        // Calculate wrap point based on actual item height
        // We have 30 items duplicated, so wrap at 30 items worth of height
        const wrapDistance = itemHeight * 30;

        // Seamless modulo wrapping for infinite loop
        if (baseVelocity > 0) {
            // Moving down (positive)
            if (newY >= wrapDistance) {
                newY = newY - wrapDistance;
            }
        } else {
            // Moving up (negative)
            if (newY <= -wrapDistance) {
                newY = newY + wrapDistance;
            }
        }

        baseY.set(newY);
    });

    // Triple the content for ultra-smooth seamless loop
    const textCopies = Array(30).fill("PROJECT");

    return (
        <motion.div ref={contentRef} className="marquee-row-content" style={{ y: baseY }}>
            {/* First set */}
            {textCopies.map((text, i) => (
                <div key={`set1-${i}`} className="marquee-text">{text}</div>
            ))}
            {/* Second set - duplicate for seamless loop */}
            {textCopies.map((text, i) => (
                <div key={`set2-${i}`} className="marquee-text">{text}</div>
            ))}
            {/* Third set - extra buffer for ultra-smooth transition */}
            {textCopies.map((text, i) => (
                <div key={`set3-${i}`} className="marquee-text">{text}</div>
            ))}
        </motion.div>
    );
}

export default function ProjectMarquee() {
    return (
        <div className="project-marquee-container">
            <div className="project-marquee-frame">
                <div className="marquee-column">
                    <VerticalMarqueeRow baseVelocity={90} rowIndex={0} />
                </div>
                <div className="marquee-column">
                    <VerticalMarqueeRow baseVelocity={-80} rowIndex={1} />
                </div>
                <div className="marquee-column">
                    <VerticalMarqueeRow baseVelocity={100} rowIndex={2} />
                </div>
                <div className="marquee-column">
                    <VerticalMarqueeRow baseVelocity={-110} rowIndex={3} />
                </div>
            </div>
        </div>
    );
}
