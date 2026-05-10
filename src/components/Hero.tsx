"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import GlitchText from "./ui/GlitchText";
import MagneticButton from "./ui/MagneticButton";
import MarqueeBar from "./ui/MarqueeBar";
import CursorParticles from "./ui/CursorParticles";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Particle Cursor Effect */}
      <CursorParticles />

      {/* Pixel Grid Background */}
      <div className="absolute inset-0 pixel-grid z-0" />

      {/* Blended Background Profile Image */}
      <div 
        className={`absolute top-0 -right-24 lg:-right-48 w-full md:w-3/4 h-full z-0 pointer-events-none transition-all duration-1000 ease-out ${
          loaded ? "opacity-30 blur-none scale-100" : "opacity-0 blur-md scale-105"
        }`}
        style={{ mixBlendMode: 'luminosity' }}
      >
        <Image
          src="/images/profile.png"
          alt="Profile Background"
          fill
          priority
          className="object-cover object-right-top md:object-right"
          style={{
            maskImage: "radial-gradient(ellipse at 80% 40%, black 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 80% 40%, black 20%, transparent 70%)"
          }}
        />
      </div>

      {/* Top-left label */}
      <div className="absolute top-24 left-6 lg:left-12 z-10">
        <span className="font-mono text-[10px] tracking-[3px] text-lime/70 animate-blink">
          PORTFOLIO_v2026 // ONLINE
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full pt-32 pb-8">
        {/* Staggered text reveal */}
        <div className="space-y-2 mb-8">
          {/* Line 1 */}
          <div
            className={`transition-all duration-1000 ease-out ${
              loaded
                ? "opacity-100 translate-y-0 blur-none scale-100"
                : "opacity-0 translate-y-8 blur-md scale-95"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <span className="font-bebas text-base md:text-lg tracking-[6px] text-magenta">
              FRONTEND DEVELOPER
            </span>
          </div>

          {/* Line 2 */}
          <div
            className={`transition-all duration-1000 ease-out ${
              loaded
                ? "opacity-100 translate-y-0 blur-none scale-100"
                : "opacity-0 translate-y-8 blur-md scale-95"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            <h1 className="font-orbitron font-black text-white leading-[0.95]"
              style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
            >
              BRENT
            </h1>
          </div>

          {/* Line 3 — with Glitch */}
          <div
            className={`transition-all duration-1000 ease-out ${
              loaded
                ? "opacity-100 translate-y-0 blur-none scale-100"
                : "opacity-0 translate-y-8 blur-md scale-95"
            }`}
            style={{ transitionDelay: "0.6s" }}
          >
            <div
              className="font-orbitron font-black text-chrome leading-[0.95]"
              style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
            >
              <GlitchText text="BARBADILLO" />
            </div>
          </div>

          {/* Line 4 */}
          <div
            className={`transition-all duration-1000 ease-out ${
              loaded
                ? "opacity-100 translate-y-0 blur-none scale-100"
                : "opacity-0 translate-y-8 blur-md scale-95"
            }`}
            style={{ transitionDelay: "0.8s" }}
          >
            <span className="font-mono text-sm md:text-base text-ice">
              {"// Building interfaces from the future"}
            </span>
          </div>
        </div>

        {/* Loading bar */}
        <div
          className={`mb-10 transition-all duration-1000 ease-out ${
            loaded 
              ? "opacity-100 translate-y-0 blur-none" 
              : "opacity-0 translate-y-6 blur-sm"
          }`}
          style={{ transitionDelay: "1s" }}
        >
          <span className="font-mono text-[10px] tracking-[3px] text-chrome/50 block mb-2">
            INITIALIZING...
          </span>
          <div className="loading-bar-track">
            <div className="loading-bar-fill" />
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-wrap gap-4 transition-all duration-1000 ease-out ${
            loaded 
              ? "opacity-100 translate-y-0 blur-none" 
              : "opacity-0 translate-y-6 blur-sm"
          }`}
          style={{ transitionDelay: "1.2s" }}
        >
          <MagneticButton
            href="#projects"
            className="chrome-bevel px-8 py-3 font-mono text-sm text-lime tracking-[2px] hover:bg-lime/5 transition-colors"
          >
            VIEW PROJECTS →
          </MagneticButton>

          <MagneticButton
            href="/images/Resume.pdf"
            download="Brent_Justine_Barbadillo_Resume.pdf"
            target="_blank"
            className="border border-chrome/30 px-8 py-3 font-mono text-sm text-chrome tracking-[2px] hover:border-magenta hover:text-magenta transition-colors"
            ariaLabel="Download CV"
          >
            DOWNLOAD CV
          </MagneticButton>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="mt-auto">
        <MarqueeBar text="FRONTEND DEVELOPER ✦ REACT ✦ NEXT.JS ✦ TYPESCRIPT ✦ UI/UX ✦ AVAILABLE FOR WORK ✦" />
      </div>
    </section>
  );
}
