"use client";

import "./EndPage.css";
import FallingText from "@/components/FallingText";
export default function EndPage() {
  return (
    <section className="End-wrapper">
    
<FallingText
  text={` Hire Me! `}
  highlightWords={["Hire"]}
  highlightClass="highlighted"
  trigger="hover"
  backgroundColor="transparent"
  wireframes={true}
  gravity={0.56}
  fontSize="2rem"
  mouseConstraintStiffness={0.9}
/>

<FallingText
  text={` or I sleep again zzz... `}
  highlightWords={[" zzz..."]}
  highlightClass="highlighted"
  trigger="hover"
  backgroundColor="transparent"
  wireframes={true}
  gravity={0.56}
  fontSize="2rem"
  mouseConstraintStiffness={0.9}
/>
      {/* Background Video */}
      <video
        className="end-bg-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/end.mp4" type="video/mp4" />
      </video>

      {/* Optional content */}
      <div className="end-content">
        {/* Tambahkan apa pun di sini */}
      </div>
    </section>
  );
}
