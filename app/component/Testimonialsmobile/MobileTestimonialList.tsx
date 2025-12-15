"use client";

import { motion } from "framer-motion";
import "@/app/component/Testimonialsmobile/testimonialsmobile.css";

type Testimonial = {
  name: string;
  role: string;
  text: string;
};

export default function MobileTestimonialList({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <section className="zigzag-wrapper">
      <div className="zigzag-list">
        <motion.h1
          className="zigzag-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          client stories
        </motion.h1>

        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            className={`zigzag-card ${index % 2 === 0 ? "left" : "right"}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Doodle decoration */}
            <div className="card-doodle"></div>

            {/* Chat Bubble Tail */}
            <div className="chat-tail"></div>

            <div className="chat-header">
              <div className="avatar-circle">
                {item.name.charAt(0)}
              </div>
              <div className="user-info">
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </div>

            <div className="chat-body">
              <p>{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
