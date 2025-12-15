"use client";

import { Github, Linkedin, Mail, FileText } from "lucide-react";
import "../Hero/Hero.css";
import HeroModel from "../../component/HeroModel";
import Particles from "@/app/component/Particles_background/background-particles";
import BlurText from "@/components/BlurText";
import TextType from "@/components/TextType"

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      
      {/* BACKGROUND GALAXY */}
 <div className="absolute inset-0 -z-10">
        <Particles
    particleColors={['#FFD000', '#ffffff']}
    particleCount={200}
    particleSpread={30}
    speed={0.5}
    particleBaseSize={550}
    moveParticlesOnHover={true}
    alphaParticles={true}
    disableRotation={false}
        />
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="hero-container">
        {/* LEFT — 3D MODEL */}
        <div className="hero-left">
          <HeroModel />
        </div>

        {/* RIGHT — TEXT & PROFILE */}
        <div className="hero-right">

          <div className="hero-profile-wrapper">
            <img
              src="/profilku.jpeg"
              alt="Profile"
              className="hero-profile-img"
            />
          </div>

                <BlurText
            text="Raynard Aurelio"
            delay={120}
            animateBy="words"
            direction="top"
            className="hero-title"   // tetap pakai CSS kamu
          />

          {/* HERO ROLE */}
          <BlurText
            text="Software Engineer - Surabaya, Indonesia"
            delay={180}
            animateBy="words"
            direction="top"
            className="hero-role"    // tetap pakai CSS kamu
          />
<div className="hero-lock">
  <div className="hero-ghost">
    Software engineer specializing in scalable architecture and high-impact features. I help teams move faster, reduce complexity, and ship products that perform reliably at scale.
  </div>

  <TextType
    text={`Software engineer specializing in scalable architecture and high-impact features. I help teams move faster, reduce complexity, and ship products that perform reliably at scale.`}
    typingSpeed={30}
    pauseDuration={6000}
    showCursor={true}
    cursorCharacter=">"
    className="hero-desc"
  />
</div>


          {/* SOCIAL ICONS */}
          <div className="hero-socials">
            <a href="https://www.linkedin.com/in/raynard-aurelio/" target="_blank" className="social-icon cursor-target">
              <Linkedin size={18} />
            </a>

            <a href="https://github.com/raynard05" target="_blank" className="social-icon cursor-target">
              <Github size={18} />
            </a>

            <a href="#contact" className="social-icon cursor-target">
              <Mail size={18} />
            </a>

            <a href="/cv.pdf" target="_blank" className="social-icon cursor-target">
              <FileText size={18} />
            </a>
          </div>

      
          {/* BUTTONS */}
          <div className="hero-buttons">
            <a href="#projects" className="btn-primary cursor-target">
              View My Work →
            </a>

            <a href="#contact" className="btn-secondary cursor-target">
              Get In Touch
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
