"use client";

import { useRef } from "react";
import Hero from "@/app/component/Hero/Hero";
import SkillsSection from "./component/SkillSection/SkillSection";
import Marquee, { ScrollVelocity } from "./component/ScrollVelocity/ScrollVelocity";
import CurvedLoop from "@/components/CurvedLoop"
import ProjectPage from "./component/ProjectSession/Projectpage";
import ContactPage from "./component/ContactPage/ContactPage";
import FlowingMenu from "@/components/FlowingMenu";
import SecondContactPage from "./component/ContactPage/SecondContact";
import MobileContactMarquee from "./component/ContactPage/MobileContactMarquee";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
import EndPage from "./component/end/end";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import Footer from "@/components/Footer";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import MobileTestimonialList from "./component/Testimonialsmobile/MobileTestimonialList";
import { useDevice } from "./useDevice";
import AirplaneScene from "./component/AirplaneScene/AirplaneScene";
import ProjectMarquee from "@/app/component/ProjectMarquee/ProjectMarquee";
import ScrollTriggerVideoPage from './component/ScrollTriggerVideoPage/scroll-trigger-videopage';

// Tambahkan di page Anda


export default function Home() {
  const { deviceClass, isSmallScreen } = useDevice();

  // Refs for ScrollTrigger targeting
  const heroRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

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
      {/* Navbar is in layout.tsx, no need to duplicate here */}



      <section ref={heroRef}>
        <Hero />
      </section>
      <div className="w-full bg-transparent overflow-hidden pt-32 pb-0 md:py-32 relative z-20">
        <div className="hero-comic-marquee">
          <ScrollVelocity
            texts={[
              "WEB DEVELOPER ✦ MOBILE DEVELOPER ✦ IOT ENTHUSIAST ✦ DESKTOP APP DEVELOPER ✦",
            ]}
            className="text-black font-black text-[28px] sm:text-[48px] md:text-[64px] lg:text-[80px] py-6 uppercase"
            velocity={100}
            parallaxStyle={{
              background: "transparent",
            }}
          />
        </div>
        <div className="hero-comic-marquee-inverse">
          <ScrollVelocity
            texts={[
              "MOBILE DEVELOPER ✦ DESKTOP APP DEVELOPER ✦ IOT ENTHUSIAST ✦ WEB DEVELOPER ✦",
            ]}
            className="text-[#FFD000] font-black text-[28px] sm:text-[48px] md:text-[64px] lg:text-[80px] py-6 uppercase"
            velocity={-100}
            parallaxStyle={{
              background: "transparent",
            }}
          />
        </div>
      </div>
      <section ref={skillsRef}>
        <SkillsSection />
      </section>

      <section ref={projectsRef} className="lg:mb-[15px]">
        <ProjectPage />
      </section>


      <div className={`
  ${isSmallScreen ? "" : ""
        }
  `}>
        <div className="hero-comic-marquee-inverse mt-[50px]">
          <ScrollVelocity
            texts={[
              "MOBILE DEVELOPER ✦ DESKTOP APP DEVELOPER ✦ IOT ENTHUSIAST ✦ WEB DEVELOPER ✦",
            ]}
            className="text-[#FFD000] font-black text-[28px] sm:text-[48px] md:text-[64px] lg:text-[80px] py-16 uppercase"
            velocity={-100}
            parallaxStyle={{
              background: "transparent",
            }}
          />

        </div>
        <ScrollTriggerVideoPage />
        <div className="hero-comic-marquee mt-[-200px]">
          <ScrollVelocity
            texts={[
              "WEB DEVELOPER ✦ MOBILE DEVELOPER ✦ IOT ENTHUSIAST ✦ DESKTOP APP DEVELOPER ✦",
            ]}
            className="text-black font-black text-[28px] sm:text-[48px] md:text-[64px] lg:text-[80px] py-16 uppercase"
            velocity={100}
            parallaxStyle={{
              background: "transparent",
            }}
          />
        </div>
      </div>









      <section ref={testimonialsRef} className="lg:mt-[40px]">
        <div className={`
    ${isSmallScreen ? "hidden" : ""

          }
    `}>
          <TestimonialMarquee />
        </div>
      </section>

      <div className={`
  ${isSmallScreen ? "" : "hidden"
        }
  `}>
        <MobileTestimonialList testimonials={testimonials} />
      </div>

      <section ref={contactRef}>
        <ContactPage />
      </section>

      {isSmallScreen ? (
        <MobileContactMarquee />
      ) : (
        <SecondContactPage />
      )}
      {isSmallScreen ? (
        ""
      ) : (
        <ProjectMarquee />
      )}

      <EndPage />




      <main>

      </main>
      <Footer />
    </>
  );
}