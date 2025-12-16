import React from 'react';
import './TestimonialMarquee.css';

const testimonials =
  [
    {
      name: "Wanda",
      role: "Freelance Project Client",
      text: "The developer was incredibly attentive to every detail we requested. The project was completed faster than expected, with excellent results and smooth communication throughout."
    },
    {
      name: "Nathaniella",
      role: "Eco-Edu Student Member, UNESA",
      text: "Excellent communication, highly flexible with numerous requests, and delivered the cultural website on schedule with high-quality results at an affordable cost."
    },
    {
      name: "Dafa",
      role: "Programmer, Shrimpscale Team",
      text: "A reliable and collaborative team member with strong problem-solving skills and a great sense of responsibility in completing tasks."
    },
    {
      name: "Fathur",
      role: "Internship Supervisor, Vascomm",
      text: "Demonstrated strong commitment, clear communication, and the ability to complete tasks efficiently and on time."
    },
    {
      name: "Fauzan",
      role: "Internship Team Leader, Vascomm",
      text: "Proactive, disciplined, and able to adapt quickly to project requirements while maintaining consistent performance."
    }


  ];

export default function TestimonialMarquee() {
  return (
    <section className="tm-marquee" aria-label="Testimonials">
      <div className="tm-header">
        <h1 className="tm-header__title">WHAT THEY SAY CLIENT</h1>
      </div>
      <div className="tm-marquee__viewport">
        <div className="tm-marquee__track">
          {testimonials.concat(testimonials).map((t, i) => (
            <article className="tm-card" key={i}>
              <div className="tm-card__icon" aria-hidden>
                <span className="tm-comma">“</span>
              </div>
              <p className="tm-card__text">{t.text}</p>
              <div className="tm-card__meta">
                <span className="tm-card__name">{t.name}</span>
                <span className="tm-card__role">{t.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
