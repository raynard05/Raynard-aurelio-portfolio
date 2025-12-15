"use client";

import "./SecondContactPage.css";

import FlowingMenu from "@/components/FlowingMenu";
import DotGrid from "@/components/DotGrid";   // component grid yang kamu punya

export default function SecondContactPage() {
  const demoItems = [
    { link: 'https://wa.me/6289685450230?text=i%20am%20interested%20to%20build%20a%20project%20with%20you', text: 'Whatsapp', image: '/whatsapp4.png' },
    { link: 'https://github.com/raynard05', text: 'Github', image: 'github.png' },
    { link: 'https://www.instagram.com/_ryndklys666?igsh=MTlvbzd0NHdqeHFhbg==', text: 'Instagram', image: '/instagram.png' },
    { link: 'https://www.linkedin.com/in/raynard-aurelio/', text: 'Linkedin', image: '/linkedin.png' }
  ];

  return (
    <section className="second-contact-wrapper">
      <div className="second-contact-grid">

        {/* LEFT SIDE */}

        {/* RIGHT SIDE */}

        <div style={{ height: '600px', position: 'relative' }}>
          <FlowingMenu items={demoItems} />
        </div>

      </div>
    </section>
  );
}
