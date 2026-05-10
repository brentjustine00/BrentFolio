"use client";

import { useEffect, useState, useRef } from "react";
import CRTOverlay from "@/components/ui/CRTOverlay";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/* ═══════════════════════════════════════════
   BOOT SEQUENCE
   ═══════════════════════════════════════════ */
function BootScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [barWidth, setBarWidth] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const bootLines = [
      "BOOTING PORTFOLIO_OS...",
      "LOADING ASSETS [████████] 100%",
      "WELCOME, USER.",
    ];

    let lineIndex = 0;
    const addLine = () => {
      if (lineIndex < bootLines.length) {
        setLines((prev) => [...prev, bootLines[lineIndex]]);
        lineIndex++;
        setTimeout(addLine, 400);
      } else {
        setTimeout(() => {
          setFading(true);
          setTimeout(onDone, 500);
        }, 300);
      }
    };

    // Start bar animation
    let progress = 0;
    const barInterval = setInterval(() => {
      progress += 5;
      setBarWidth(Math.min(progress, 100));
      if (progress >= 100) clearInterval(barInterval);
    }, 50);

    setTimeout(addLine, 200);

    return () => clearInterval(barInterval);
  }, [onDone]);

  return (
    <div className={`boot-screen ${fading ? "done" : ""}`} aria-hidden="true">
      <div className="space-y-3 text-center">
        {lines.map((line, i) => (
          <div
            key={i}
            className="font-mono text-xs md:text-sm text-lime tracking-[2px]"
          >
            {line}
          </div>
        ))}
      </div>
      <div className="w-48 h-1 bg-dark-border mt-4">
        <div
          className="h-full bg-lime transition-all duration-100"
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════ */
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for touch device
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      }

      requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        ringRef.current?.classList.add("hovering");
      }
    };

    const handleMouseOut = () => {
      ringRef.current?.classList.remove("hovering");
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
}

/* ═══════════════════════════════════════════
   SCROLL PROGRESS BAR
   ═══════════════════════════════════════════ */
function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setWidth(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {/* Boot Screen */}
      {!booted && <BootScreen onDone={() => setBooted(true)} />}

      {/* CRT Overlay — always present */}
      <CRTOverlay />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
