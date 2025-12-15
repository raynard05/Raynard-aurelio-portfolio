"use client";

import "./EndPage.css";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

export default function EndPage() {
  return (
    <section className="End-wrapper">
      <MaskContainer
        revealText={
          <p className="mx-auto max-w-4xl text-center text-4xl font-bold text-slate-800 dark:text-yellow-400 px-4">
           Let's Build Something Amazing Together
          </p>
        }
        className="w-full h-full"
      >
        <span className="text-5xl text-black">
        Ready to turn ideas into reality? Whether it's a <span className="text-white"> web app, mobile solution, 
        or IoT innovation, </span> I'm here to bring your <span className="text-white">vision to life. </span>
    
        </span>
      </MaskContainer>
    </section>
  );
}