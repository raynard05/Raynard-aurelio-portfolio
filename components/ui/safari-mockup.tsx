"use client";

import { cn } from "@/lib/utils";

interface SafariMockupProps {
    url?: string;
    className?: string;
    children?: React.ReactNode;
}

export default function SafariMockup({
    url = "https://example.com",
    className,
    children,
}: SafariMockupProps) {
    return (
        <div
            className={cn(
                "relative w-full rounded-xl border border-white/10 bg-black/50 overflow-hidden shadow-2xl transform transition-all hover:scale-[1.01]",
                className
            )}
        >
            {/* Browser Toolbar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5 backdrop-blur-md">
                <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>

                {/* Address Bar */}
                <div className="mx-auto flex w-full max-w-[60%] items-center justify-center rounded-md bg-white/10 px-3 py-1 text-xs text-white/50 font-medium tracking-wide">
                    <span className="truncate">{url}</span>
                </div>
            </div>

            {/* Browser Content */}
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-y-auto no-scrollbar bg-black/80">
                {children}
            </div>
        </div>
    );
}
