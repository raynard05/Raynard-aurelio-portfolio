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
      {/* TITLE */}
    

      {/* LIST */}
      <div className="zigzag-list">
          <motion.h1
        className="zigzag-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        What They Say Client
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
            <span className="quote">“</span>

            <p>{item.text}</p>

            <div className="footer">
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
