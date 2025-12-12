"use client";

import "./SecondContactPage.css";

import FlowingMenu from "@/components/FlowingMenu";
import DotGrid from "@/components/DotGrid";   // component grid yang kamu punya

export default function SecondContactPage() {
  const demoItems = [
    { link: '#', text: 'Whatsapp', image: '/whatsapp4.png' },
    { link: '#', text: 'Github', image: 'github.png' },
    { link: '#', text: 'Instagram', image: '/instagram.png' },
    { link: '#', text: 'Linkedin', image: '/linkedin.png' }
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
