"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Home", href: "#" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b border-yellow-500/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT LOGO + AVATAR */}
        <div className="flex items-center gap-3 rounded-[]">
         

          <h1 className="text-yellow-400 font-bold text-xl">
            Raynard Aurelio.
          </h1>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-10">
          {menu.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="text-white hover:text-yellow-400 transition relative group"
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden bg-black px-6 pb-4">
          <div className="flex flex-col space-y-4">
            {menu.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="text-white py-2 border-b border-white/10"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
