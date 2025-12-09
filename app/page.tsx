import Navbar from "@/app/component/Navbar";
import Hero from "@/app/component/Hero/Hero";
import SkillsSection from "./component/SkillSection/SkillSection";
import Marquee from "./component/Marquee/Marquee";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <SkillsSection />
      <main>
      
      </main>
    </>
  );
}
