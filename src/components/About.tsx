"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ui/ScrollReveal";

const STATS = [
  "3+ Projects Deployed",
  "React & Next.js",
  "Philippines 🇵🇭",
  "Open to Work",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Scan-line HR reveal + stat animation trigger
  useEffect(() => {
    const el = scanLineRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          setStatsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 lg:py-32 max-w-[1400px] mx-auto px-6 lg:px-12"
      aria-labelledby="about-heading"
    >
      <div className="section-label">[01] — ABOUT.ME</div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
        {/* Left — 60% */}
        <ScrollReveal variant="fadeLeft" className="lg:col-span-3 sr-low">
          <h2
            id="about-heading"
            className="font-orbitron text-3xl md:text-5xl font-bold text-white leading-tight mb-8"
          >
            WHO IS
            <br />
            <span className="text-lime">BRENT?</span>
          </h2>

          <div className="font-mono text-sm md:text-base text-chrome/80 leading-relaxed space-y-4 mb-6">
            <p>
              Brent Justine Barbadillo is a Full-stack developer specializing in React, FastAPI, and Supabase, focused on building scalable, user-centered web applications. Experienced in developing AI-powered systems, e-commerce platforms, and real-time apps. Driven to turn ideas into reliable, production-ready solutions.
            </p>
            <p>
              When he&apos;s not pushing pixels, he&apos;s exploring the
              intersection of design systems and developer experience — always
              seeking the balance between form and function.
            </p>
          </div>

          {/* Animated scan-line HR */}
          <div ref={scanLineRef} className="scan-line-hr mb-8" />

          {/* Stat Grid with staggered reveal */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STATS.map((stat, i) => (
              <div
                key={stat}
                className={`chrome-bevel px-4 py-3 text-center font-mono text-[11px] tracking-wider text-chrome/70 transition-all duration-500 ${
                  statsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                {stat}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Right — Profile picture + geometric frame */}
        <ScrollReveal
          variant="fadeRight"
          className="lg:col-span-2 hidden md:flex flex-col items-center sr-low"
        >
          <div className="relative">
            {/* Rotating dashed border */}
            <div className="profile-frame-border" />

            {/* Profile image */}
            <div className="profile-frame border border-dark-border">
              <Image
                src="/images/prof.jpg"
                alt="Brent Justine Barbadillo — Frontend Developer"
                fill
                sizes="260px"
                className="object-cover"
                priority
              />

              {/* Label strip at bottom */}
              <div className="profile-label">
                <div className="flex items-center gap-2">
                  <span className="status-dot" />
                  <span className="font-mono text-[10px] tracking-[2px] text-lime/80">
                    AVAILABLE
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-lime/40" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-lime/40" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-lime/40" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-lime/40" />
          </div>

          <span className="font-mono text-[10px] tracking-[3px] text-chrome/30 mt-6 block text-center">
            BRENT_J_BARBADILLO.exe
          </span>
        </ScrollReveal>
      </div>

      {/* Stripe divider */}
      <div className="stripe-divider mt-24" />
    </section>
  );
}
