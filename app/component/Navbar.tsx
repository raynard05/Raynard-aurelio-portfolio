"use client";

import MusicPlayer from "./MusicPlayer";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // 🔒 safety: close menu on resize (prevents invisible overlay)
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  // Active section logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = menu.slice(1).map(item => item.href.substring(1)); // Skip Home
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      let current = "";
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (pathname === "/") {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push("/" + href);
    }
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b border-yellow-500/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT LOGO */}
        <div className="flex items-center gap-3">
          <h1 className="text-yellow-400 font-bold text-xl">
            Raynard Aurelio.
          </h1>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-10">
          {menu.map((item, i) => {
            const isActive = activeSection === item.href.substring(1) || (item.name === "Home" && !activeSection);
            return (
              <a
                key={i}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-white hover:text-yellow-400 transition relative group ${isActive ? 'text-yellow-400' : ''}`}
              >
                {item.name}
                <span className={`absolute left-0 -bottom-1 h-[2px] bg-yellow-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            );
          })}
        </div>

        {/* RIGHT SIDE (MUSIC + MOBILE TOGGLE) */}
        <div className="flex items-center gap-4">
          <MusicPlayer />

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN (FIXED) */}
      {open && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black px-6 pb-4 z-50">
          <div className="flex flex-col space-y-4">
            {menu.map((item, i) => {
              const isActive = activeSection === item.href.substring(1) || (item.name === "Home" && !activeSection);
              return (
                <a
                  key={i}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-white py-2 border-b border-white/10 ${isActive ? 'text-yellow-400' : ''}`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
