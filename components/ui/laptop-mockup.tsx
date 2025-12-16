"use client";

import { cn } from "@/lib/utils";

interface LaptopMockupProps {
    className?: string;
    children?: React.ReactNode;
}

export default function LaptopMockup({
    className,
    children,
}: LaptopMockupProps) {
    return (
        <div
            className={cn(
                "relative mx-auto w-full",
                className
            )}
        >
            {/* Lid / Screen Bezel */}
            <div className="relative rounded-t-[1.5rem] bg-[#1a1a1a] p-2 ring-1 ring-white/10 shadow-2xl">
                {/* Camera */}
                <div className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/20" />

                {/* Screen Content */}
                <div className="relative overflow-hidden rounded-[1rem] bg-black ring-1 ring-white/5 aspect-[16/10]">
                    <div className="relative w-full h-full overflow-y-auto no-scrollbar">
                        {children}
                    </div>
                </div>
            </div>

            {/* Base / Keyboard Area */}
            <div className="relative -mt-1 h-3 w-full rounded-b-xl bg-[#2b2b2b] ring-1 ring-white/10 shadow-lg z-10">
                {/* Top Shine */}
                <div className="absolute inset-x-4 top-0 h-[1px] bg-white/20" />
                {/* Notch */}
                <div className="absolute left-1/2 top-0 h-1.5 w-20 -translate-x-1/2 rounded-b-md bg-[#1a1a1a]" />
            </div>

            {/* Bottom Shadow / Reflection Effect */}
            <div className="absolute -bottom-4 left-[2.5%] w-[95%] h-4 bg-black/40 blur-md rounded-[100%]" />
        </div>
    );
}
