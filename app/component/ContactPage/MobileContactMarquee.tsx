"use client";

import React from "react";
import "./MobileContactMarquee.css";

type ContactItem = {
    link: string;
    text: string;
    image: string;
}

export default function MobileContactMarquee() {
    const items: ContactItem[] = [
        { link: 'https://wa.me/6289685450230?text=i%20am%20interested%20to%20build%20a%20project%20with%20you', text: 'Whatsapp', image: '/whatsapp4.png' },
        { link: 'https://github.com/raynard05', text: 'Github', image: '/github.png' },
        { link: 'https://www.instagram.com/_ryndklys666?igsh=MTlvbzd0NHdqeHFhbg==', text: 'Instagram', image: '/instagram.png' },
        { link: 'https://www.linkedin.com/in/raynard-aurelio/', text: 'Linkedin', image: '/linkedin.png' }
    ];

    return (
        <section className="mobile-contact-wrapper">
            <div className="mobile-contact-title">Lets Connect</div>

            <div className="contact-grid">
                {items.map((item, index) => (
                    <a
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-card"
                    >
                        <img src={item.image} alt={item.text} />
                        <span>{item.text}</span>
                    </a>
                ))}
            </div>
        </section>
    );
}
