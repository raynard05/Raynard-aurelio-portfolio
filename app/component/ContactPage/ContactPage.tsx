"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "./ContactPage.css";
import ProfileCard from "@/components/ProfileCards";
import AnimatedContent from "@/components/AnimatedContent";
import CircularText from "@/components/CircularText";
import DotGrid from "@/components/DotGrid";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceId = "service_lqmoaxs";
      const templateId = "template_bjxvzus"; // Main template (you receive this)
      const confirmTemplateId = "template_mubpyqs"; // Auto-reply template (sender receives this)
      const publicKey = "C-JhN3r3GXDp6R1I-";

      // Send email to yourself
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          to_email: "ahmadraynardaurelio@gmail.com",
          subject: formData.subject,
          message: formData.message,
          reply_to: formData.email,
        },
        publicKey
      );

      // Send confirmation email to sender
      await emailjs.send(
        serviceId,
        confirmTemplateId,
        {
          to_name: formData.name,
          to_email: formData.email,
          from_name: "Raynard Aurelio",
          from_email: "ahmadraynardaurelio@gmail.com",
          subject: formData.subject,
          message: formData.message,
        },
        publicKey
      );

      router.push("/email-success");
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("Failed to send email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-wrapper">
      <div className="contact-container">
        {/* LEFT SECTION */}
        <div className="contact-left">

          <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={false}
            duration={1.2}
            ease="bounce.in"
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.3}
          >
            <div className="dot-grid-container">
              <DotGrid />
              <div className="mobile-only">
                <DotGrid />
              </div>


            </div>
          </AnimatedContent>

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

            />
          </AnimatedContent>
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
            <div className="circular-text-container">
              <CircularText
                text="TOUCH>ME>HERE>"
                onHover="pause"
                spinDuration={4}
                className="text-white text-[6px] border-4 border-yellow-400"
              />
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Type Your name here ...."
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Name@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Project Inquiry"
                  required
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <Button type="submit" className="send-btn" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}