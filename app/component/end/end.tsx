"use client";

import "./EndPage.css";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

import { useDevice } from "@/app/useDevice";

export default function EndPage() {
  const { isSmallScreen } = useDevice();
  const maskSize = isSmallScreen ? 180 : 600;

  return (
    <section className="End-wrapper">
      <MaskContainer
        revealSize={maskSize}
        revealText={
          <p className="mx-auto max-w-4xl text-center text-4xl font-bold text-[#FFD000] px-4">
            Let's Build Something Amazing Together
          </p>
        }
        className="w-full h-full"
      >
        <span className="text-5xl text-black font-bold">
          Ready to turn ideas into reality? Whether it's a web app, mobile solution,
          or IoT innovation, I'm here to bring your vision to life.
        </span>
      </MaskContainer>
    </section>
  );
}