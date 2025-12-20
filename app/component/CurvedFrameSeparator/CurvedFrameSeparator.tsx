"use client";

import { useDevice } from "@/app/useDevice";
import HorizontalMarquee from "@/app/component/HorizontalMarquee/HorizontalMarquee";
import "./CurvedFrameSeparator.css";

interface CurvedFrameSeparatorProps {
    children: React.ReactNode;
    marqueeText?: string;
    marqueeSpeed?: number;
}

export default function CurvedFrameSeparator({
    children,
    marqueeText = "raynard",
    marqueeSpeed = 40,
}: CurvedFrameSeparatorProps) {
    const { isWidthScreen } = useDevice();

    // On mobile, just render children without separator
    if (!isWidthScreen) {
        return <>{children}</>;
    }

    return (
        <div className="curved-separator-container">
            {/* Top Marquee Strip */}
            <div className="marquee-strip marquee-top">
                <HorizontalMarquee text={marqueeText} speed={marqueeSpeed} />
            </div>

            {/* Main Content with Curved Mask */}
            <div className="curved-content-wrapper">
                {/* Top Curved Wave SVG */}
                <svg
                    className="curved-wave curved-wave-top"
                    viewBox="0 0 1440 100"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,50 Q360,0 720,50 T1440,50 L1440,100 L0,100 Z"
                        fill="currentColor"
                    />
                </svg>

                {/* Content Area */}
                <div className="curved-inner-content">
                    {children}
                </div>

                {/* Bottom Curved Wave SVG */}
                <svg
                    className="curved-wave curved-wave-bottom"
                    viewBox="0 0 1440 100"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,50 Q360,100 720,50 T1440,50 L1440,0 L0,0 Z"
                        fill="currentColor"
                    />
                </svg>
            </div>

            {/* Bottom Marquee Strip */}
            <div className="marquee-strip marquee-bottom">
                <HorizontalMarquee text={marqueeText} speed={marqueeSpeed} />
            </div>
        </div>
    );
}
