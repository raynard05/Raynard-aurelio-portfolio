"use client";

import { cn } from "@/lib/utils";

interface AndroidMockupProps {
    className?: string;
    children?: React.ReactNode;
}

export default function AndroidMockup({ className, children }: AndroidMockupProps) {
    return (
        <div
            className={cn(
                "relative mx-auto border-gray-800 bg-gray-900 border-[8px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl transform transition-all hover:scale-[1.01] hover:shadow-2xl",
                className
            )}
        >
            {/* Camera Notch */}
            <div className="absolute top-0 w-full flex justify-center z-20 pointer-events-none">
                <div className="h-[24px] w-[120px] bg-black rounded-b-[1rem] flex items-center justify-center">
                    <div className="w-16 h-1 bg-gray-800 rounded-full opacity-30"></div>
                </div>
            </div>

            {/* Side Buttons (Volume/Power) */}
            <div className="absolute top-[80px] -right-[10px] h-[32px] w-[6px] rounded-r bg-gray-700" />
            <div className="absolute top-[130px] -right-[10px] h-[60px] w-[6px] rounded-r bg-gray-700" />

            {/* Screen Content */}
            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black relative">
                {/* Status Bar Placeholder */}
                <div className="w-full h-8 bg-transparent absolute top-0 left-0 z-10 flex justify-between items-center px-6 pt-2">
                    <span className="text-[10px] text-white font-medium">9:41</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="w-full h-full overflow-y-auto no-scrollbar pt-8 pb-4">
                    {children}
                </div>

                {/* Navigation Bar Placeholder */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-10" />
            </div>
        </div>
    );
}
