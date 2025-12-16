"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 600,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  /* eslint-disable react-hooks/exhaustive-deps */
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<any>({ x: null, y: null });
  const containerRef = useRef<any>(null);
  const animationRef = useRef<any>(null);
  const hasAnimated = useRef(false);

  const updateMousePosition = (e: any) => {
    // Stop any ongoing auto-animation if user interacts
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = null;
    }
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    containerRef.current.addEventListener("mousemove", updateMousePosition);
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "mousemove",
          updateMousePosition,
        );
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            // Auto animation sequence
            setTimeout(() => {
              if (!containerRef.current) return;
              // Check if user is already hovering (don't override)
              if (isHovered) return;

              const rect = containerRef.current.getBoundingClientRect();
              const startX = rect.width * 0.1; // Start 10% from left
              const endX = rect.width * 0.9;   // End 90% at right
              const midY = rect.height / 2;

              const duration = 2000; // 2 seconds scan
              const startTime = Date.now();

              setIsHovered(true);

              animationRef.current = setInterval(() => {
                // Check hover again in case user entered during timeout
                // Although mousemove clears interval, we double check safety

                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const ease = 1 - Math.pow(1 - progress, 3);

                const currentX = startX + (endX - startX) * ease;
                setMousePosition({ x: currentX, y: midY });

                if (progress >= 1) {
                  clearInterval(animationRef.current);
                  animationRef.current = null;
                  setTimeout(() => setIsHovered(false), 500); // Wait bit then fade out
                }
              }, 16); // ~60fps

            }, 2500); // 2.5s delay
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []); // Run once on mount

  let maskSize = isHovered ? revealSize : size;

  return (
    <motion.div
      onMouseEnter={() => {
        setIsHovered(true);
        // Clear animation if user enters
        if (animationRef.current) {
          clearInterval(animationRef.current);
          animationRef.current = null;
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      ref={containerRef}
      className={cn("relative w-full h-full", className)}
      animate={{
        backgroundColor: isHovered ? "var(--slate-900)" : "var(--yellow-400)",
      }}
      transition={{
        backgroundColor: { duration: 0.3 },
      }}
    >
      <motion.div
        className="absolute flex h-full w-full items-center justify-center text-6xl [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [mask-size:40px] dark:bg-[#ffea02]"
        animate={{
          maskPosition: `${mousePosition.x - maskSize / 2}px ${mousePosition.y - maskSize / 2
            }px`,
          maskSize: `${maskSize}px`,
        }}
        transition={{
          maskSize: { duration: 0.3, ease: "easeInOut" },
          maskPosition: { duration: 0.15, ease: "linear" },
        }}
      >
        <div className="absolute inset-0 z-0 h-full w-full bg-black opacity-50 dark:bg-[#ffea02]" />
        <div className="relative z-20 mx-auto max-w-4xl px-8 text-center text-4xl font-bold">
          {children}
        </div>
      </motion.div>

      <div className="flex h-full w-full items-center justify-center px-4">
        {revealText}
      </div>
    </motion.div>
  );
};