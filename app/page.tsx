import Navbar from "@/app/component/Navbar";
import Hero from "@/app/component/Hero/Hero";
import SkillsSection from "./component/SkillSection/SkillSection";
import Marquee, { ScrollVelocity } from "./component/ScrollVelocity/ScrollVelocity";
import CurvedLoop from "@/components/CurvedLoop"
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
<ScrollVelocity
  texts={[
    "IOT ENTHUSIAST ✦ WEB DEVELOPER ✦ MOBILE DEVELOPER ✦ DESKTOP APP DEVELOPER ✦",
  ]}
  
  className="text-black text-[80px] "
  velocity={100}
  parallaxStyle={{
    borderTop: "4px solid #FFD000 ",
    borderBottom: "4px solid #FFD000 ",
    background: "#FFD000",
    paddingTop: "40px",
   paddingBottom: "40px",
  }}
/>

   <ScrollVelocity
  texts={[
    "MOBILE DEVELOPER ✦ DESKTOP APP DEVELOPER ✦ IOT ENTHUSIAST ✦ WEB DEVELOPER ✦",
  ]}
  className="text-yellow-400 text-[80px]"
  velocity={-100}   // arah kebalikannya
  parallaxStyle={{
    borderTop: "4px solid #FFD000",
    borderBottom: "10px solid #FFD000",
    background: "#000",
    paddingTop: "40px",
    paddingBottom: "40px",
  }}
/>

      <SkillsSection />
      
      <main>
      
      </main>
    </>
  );
}
