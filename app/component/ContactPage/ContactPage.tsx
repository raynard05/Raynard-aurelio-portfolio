"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "./ContactPage.css";
import ProfileCard from "@/components/ProfileCards";

export default function ContactPage() {
  return (
    <section className="contact-wrapper">
      <div className="contact-container">
        {/* LEFT SECTION (kosong - kamu isi sendiri nanti) */}
        <div className="contact-left">

            <ProfileCard
  name="Raynard Aurelio"
  title="Software Engineer"

  handle="_ryndklys666"
  status="Available for Work"
  contactText="Contact"
  avatarUrl="/profile-card.png"
  miniAvatarUrl="/profile-card.png"
  iconUrl="</>"
  showUserInfo={true}
  enableTilt={false}
  enableMobileTilt={false}
  behindGlowEnabled={false}
  onContactClick={() => console.log('Contact clicked')}
/>
            
          {/* Tambah kontenmu sendiri di sini */}
        </div>

        {/* RIGHT SECTION (Form) */}
        <div className="contact-right">
          <h2 className="contact-title">
            Get In <span>Touch</span>
          </h2>

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
      </div>
    </section>
  );
}
