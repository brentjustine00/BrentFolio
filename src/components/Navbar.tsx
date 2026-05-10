"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#about", label: "ABOUT" },
  { href: "#experience", label: "EXPERIENCE" },
  { href: "#education", label: "EDUCATION" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#contact", label: "CONTACT" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <a href="#main" className="skip-to-content">
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-[9995] transition-all duration-300 ${scrolled
            ? "bg-deep-black/95 backdrop-blur-sm border-b border-lime/20 shadow-[0_1px_20px_rgba(184,255,0,0.05)]"
            : "bg-transparent border-b border-transparent"
          }`}
        role="banner"
      >
        <nav
          className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#"
            className="font-orbitron text-lg font-bold text-white tracking-wider hover:text-lime transition-colors"
            aria-label="Go to top"
          >
            Brent<span className="text-lime animate-blink">_</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-mono text-xs tracking-[2px] transition-colors relative py-1 ${isActive
                      ? "text-lime"
                      : "text-chrome/60 hover:text-chrome"
                    }`}
                >
                  {isActive && (
                    <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-lime" />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 group"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-5 h-[2px] bg-chrome transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
            />
            <span
              className={`block w-5 h-[2px] bg-chrome transition-all duration-300 ${mobileOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`block w-5 h-[2px] bg-chrome transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${mobileOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="font-orbitron text-white hover:text-lime transition-colors tracking-wider"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
