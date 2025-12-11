"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "./ContactPage.css";
import ProfileCard from "@/components/ProfileCards";
import GlareHover from "@/components/GlareHover";
import AnimatedContent from "@/components/AnimatedContent";
import CircularText from "@/components/CircularText";

export default function ContactPage() {
  return (
    <section className="contact-wrapper">
      <div className="contact-container">
        {/* LEFT SECTION (kosong - kamu isi sendiri nanti) */}
        <div className="contact-left">

      <AnimatedContent
        distance={150}
        direction="horizontal"
        reverse={true}
        duration={1.2}
        ease="power3.out"
        initialOpacity={0.2}
        animateOpacity
        scale={0.7}
        threshold={0.2}
        delay={0.3}
      >
          <ProfileCard
        name="Raynard Aurelio"
        title="Software Engineer"
        handle="_ryndklys666"
        status="Available for Work"
        contactText="Contact"
        avatarUrl="/profile-card.png"
        miniAvatarUrl="/profile-card.png"
        iconUrl=""
        showUserInfo={true}
        enableTilt={false}
        enableMobileTilt={false}
        behindGlowEnabled={false}
        onContactClick={() => console.log('Contact clicked')}
      />
      </AnimatedContent>

   
                  
                {/* Tambah kontenmu sendiri di sini */}
              </div>

              {/* RIGHT SECTION (Form) */}
              
      <AnimatedContent
        distance={150}
        direction="horizontal"
        reverse={false}
        duration={1.2}
        ease="power3.out"
        initialOpacity={0.2}
        animateOpacity
        scale={0.7}
        threshold={0.2}
        delay={0.3}
      >
        <div className="contact-right">
          <h2 className="contact-title">
            Get In <span>Touch</span>
          </h2>
          <div className="circular-text-container ">
          <CircularText
          text="TOUCH>ME>HERE>"
          onHover="pause"
          spinDuration={10}
          className="text-white text-[6px] border-4 border-yellow-400"

        />
            
          </div>


          <form className="contact-form">
            <div className="form-group">
              <label>Your Name</label>
              <Input placeholder="Type Your name here ...." />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <Input type="email" placeholder="Name@example.com" />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <Input placeholder="Project Inquiry" />
            </div>

            <div className="form-group">
              <label>Message</label>
              <Textarea rows={6} placeholder="Tell me about your project..." />
            </div>

            <Button className="send-btn">
              Send Message
            </Button>
          </form>
        </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
