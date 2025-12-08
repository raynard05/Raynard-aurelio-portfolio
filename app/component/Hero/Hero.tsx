"use client";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import "../Hero/Hero.css";
import HeroModel from "../../component/HeroModel";
export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">

        {/* LEFT SIDE — 3D MODEL AREA */}
        <div className="hero-left">
          {/* Taruh <canvas> tiga.js / <spline-viewer> / <model-viewer> di sini */}
          <HeroModel />
        </div>

        {/* RIGHT SIDE — PROFILE & TEXT */}
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
            Passionate about creating immersive 3D experiences and modern web
            applications. Specialized in 3D modeling, animation, and interactive design.
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
