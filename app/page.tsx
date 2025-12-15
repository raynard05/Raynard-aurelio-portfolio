"use client";

import Navbar from "@/app/component/Navbar";
import Hero from "@/app/component/Hero/Hero";
import SkillsSection from "./component/SkillSection/SkillSection";
import Marquee, { ScrollVelocity } from "./component/ScrollVelocity/ScrollVelocity";
import CurvedLoop from "@/components/CurvedLoop"
import ProjectPage  from "./component/ProjectSession/Projectpage";
import ContactPage from "./component/ContactPage/ContactPage";
import FlowingMenu from "@/components/FlowingMenu";
import SecondContactPage from "./component/ContactPage/SecondContact";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
import EndPage from "./component/end/end";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import Footer from "@/components/Footer";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import MobileTestimonialList from "./component/Testimonialsmobile/MobileTestimonialList";
import { useDevice } from "./useDevice";


export default function Home() {
      const { deviceClass, isSmallScreen } = useDevice();
  
  const testimonials = [
  {
    name: "Wanda",
    role: "Freelance Project Client",
    text:
      "The developer was incredibly attentive to every detail we requested. The project was completed faster than expected, with excellent results and smooth communication throughout.",
  },
  {
    name: "Nathaniella",
    role: "Eco-Edu Student Member, UNESA",
    text:
      "Excellent communication, highly flexible with numerous requests, and delivered the cultural website on schedule with high-quality results at an affordable cost.",
  },
  {
    name: "Dafa",
    role: "Programmer, Shrimpscale Team",
    text:
      "A reliable and collaborative team member with strong problem-solving skills and a great sense of responsibility in completing tasks.",
  },
  {
    name: "Fathur",
    role: "Internship Supervisor, Vascomm",
    text:
      "Demonstrated strong commitment, clear communication, and the ability to complete tasks efficiently and on time.",
  },
  {
    name: "Fauzan",
    role: "Internship Team Leader, Vascomm",
    text:
      "Proactive, disciplined, and able to adapt quickly to project requirements while maintaining consistent performance.",
  },
];


  return (
    <>
      <Navbar />
      <Hero />
 <div className="border-t-[1px] sm:border-t-[3px] md:border-t-4 lg:border-t-[5px] border-b-2 sm:border-b-[3px] md:border-b-4 lg:border-b-[5px] border-[#FFD000] bg-[#FFD000]">
        <ScrollVelocity
          texts={[
            "IOT ENTHUSIAST ✦ WEB DEVELOPER ✦ MOBILE DEVELOPER ✦ DESKTOP APP DEVELOPER ✦",
          ]}
          className="text-black text-[20px] sm:text-[48px] md:text-[64px] lg:text-[80px] py-4 sm:py-6 md:py-8 lg:py-10"
          velocity={100}
          parallaxStyle={{
            background: "#FFD000",
          }}
        />
      </div>

      {/* Second section with different border */}
      <div className="border-b-[2px] sm:border-t-[3px] md:border-t-4 lg:border-t-[5px] border-b-4 sm:border-b-[6px] md:border-b-8 lg:border-b-[10px] border-[#FFD000] bg-black">
        <ScrollVelocity
          texts={[
            "MOBILE DEVELOPER ✦ DESKTOP APP DEVELOPER ✦ IOT ENTHUSIAST ✦ WEB DEVELOPER ✦",
          ]}
          className="text-yellow-400 text-[20px] sm:text-[48px] md:text-[64px] lg:text-[80px] py-4 sm:py-6 md:py-8 lg:py-10"
          velocity={-100}
          parallaxStyle={{
            background: "#000",
          }}
        />
      </div>
      <SkillsSection />
   
        <ProjectPage />
 <div className={`
  ${
     isSmallScreen ? "hidden": ""

  }
  
  
  
  `}>

<TestimonialMarquee />


 </div>

  <div className={`
  ${
     isSmallScreen ? "": "hidden"

  }
  
  
  
  `}>


        <MobileTestimonialList testimonials={testimonials} />


 </div>
      
      <ContactPage />
      <SecondContactPage/>
       <EndPage />
      <main>
      
      </main>
      <Footer />
    </>
  );
}