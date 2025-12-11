"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "./ContactPage.css";

export default function ContactPage() {
  return (
    <section className="contact-wrapper">
      <div className="contact-container">
        {/* LEFT SECTION (kosong - kamu isi sendiri nanti) */}
        <div className="contact-left">
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
              <Input placeholder="John Doe" />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <Input type="email" placeholder="john@example.com" />
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
