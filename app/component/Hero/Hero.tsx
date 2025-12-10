"use client";

import { Github, Linkedin, Mail, FileText } from "lucide-react";
import "../Hero/Hero.css";
import HeroModel from "../../component/HeroModel";
import Particles from "@/app/component/Particles_background/background-particles";

export default function Hero() {
  return (
    <section className="hero-section">
      
      {/* BACKGROUND GALAXY */}
 <div className="absolute inset-0 -z-10">
        <Particles
    particleColors={['#FFD000', '#ffffff']}
    particleCount={500}
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

          <h1 className="hero-title">Raynard Aurelio</h1>
          <h2 className="hero-role">Software Engineer</h2>

          <p className="hero-desc">
            Software engineer specializing in scalable architecture and high-impact features.
            I help teams move faster, reduce complexity, and ship products that perform reliably at scale.
          </p>

          {/* SOCIAL ICONS */}
          <div className="hero-socials">
            <a href="https://linkedin.com/in/yourprofile" target="_blank" className="social-icon">
              <Linkedin size={18} />
            </a>

            <a href="https://github.com/yourusername" target="_blank" className="social-icon">
              <Github size={18} />
            </a>

            <a href="mailto:yourmail@gmail.com" className="social-icon">
              <Mail size={18} />
            </a>

            <a href="/cv.pdf" target="_blank" className="social-icon">
              <FileText size={18} />
            </a>
          </div>

          {/* BUTTONS */}
          <div className="hero-buttons">
            <a href="#projects" className="btn-primary">
              View My Work →
            </a>

            <a href="#contact" className="btn-secondary">
              Get In Touch
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
