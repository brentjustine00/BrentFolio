"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "./ui/ScrollReveal";

const PROJECTS = [
  {
    num: "01",
    name: "TechSaaS",
    category: "SaaS / Web App",
    desc: "A full-featured SaaS platform built for conversions with high attention to detail.",
    tech: ["React", "Next.js", "TypeScript"],
    href: "https://veltrix-zeta-ten.vercel.app/",
    accent: "lime",
    image: "/images/project-plane.png",
  },
  {
    num: "02",
    name: "Restaurant",
    category: "Web / Branding",
    desc: "A rich, immersive restaurant website with menu animations, online reservations, and brand identity.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    href: "https://aether-mu-eight.vercel.app/",
    accent: "magenta",
    image: "/images/project-saas.png",
  },
  {
    num: "03",
    name: "Plane Charter",
    category: "Landing Page / UI",
    desc: "A sleek, conversion-focused landing page for a flight/travel product with cinematic scroll animations.",
    tech: ["React", "GSAP", "CSS Animations"],
    href: "https://volterra-jet.vercel.app/",
    accent: "ice",
    image: "/images/project-restaurant.png",
  },
];

function ProjectCard({
  project,
  className,
}: {
  project: (typeof PROJECTS)[0];
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [btnText, setBtnText] = useState("LAUNCH →");
  const [thumbRevealed, setThumbRevealed] = useState(false);

  // Thumbnail wipe-reveal on scroll
  useEffect(() => {
    const el = thumbRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setThumbRevealed(true), 200);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const handleLaunch = () => {
    setBtnText("LAUNCHING...");
    setTimeout(() => setBtnText("LAUNCH →"), 1500);
  };

  const accentColors: Record<string, string> = {
    lime: "border-lime/30 hover:border-lime hover:shadow-[0_0_30px_rgba(184,255,0,0.1)]",
    magenta:
      "border-magenta/30 hover:border-magenta hover:shadow-[0_0_30px_rgba(255,0,110,0.1)]",
    ice: "border-ice/30 hover:border-ice hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]",
  };

  const tagColors: Record<string, string> = {
    lime: "border-lime/40 text-lime",
    magenta: "border-magenta/40 text-magenta",
    ice: "border-ice/40 text-ice",
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`project-stripes bg-dark-card border transition-all duration-300 relative overflow-hidden group ${accentColors[project.accent]
        } ${className}`}
      style={{
        transform: `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition:
          "transform 0.2s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Big background number */}
      <div className="absolute top-4 right-6 font-orbitron text-[8rem] md:text-[10rem] font-black text-white/[0.02] leading-none select-none pointer-events-none z-0">
        {project.num}
      </div>

      {/* Scanline overlay on hover */}
      <div className="absolute inset-0 crt-scanlines opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none" />

      {/* Thumbnail with wipe-reveal */}
      <div
        ref={thumbRef}
        className={`project-thumbnail relative w-full h-40 md:h-48 ${thumbRevealed ? "revealed" : ""
          }`}
      >
        <Image
          src={project.image}
          alt={`${project.name} project screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        {/* Corner brackets */}
        <div className="thumb-bracket tl" />
        <div className="thumb-bracket br" />
        {/* Number overlay on image */}
        <div className="absolute bottom-3 left-4 font-orbitron text-xs tracking-[3px] text-white/50 z-[5]">
          {project.num}
        </div>
      </div>

      <div className="relative z-10 p-6 lg:p-8 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <span
            className={`font-mono text-[10px] tracking-[2px] px-3 py-1 border ${tagColors[project.accent]
              }`}
          >
            {project.category}
          </span>
          <span className="font-mono text-[10px] text-chrome/30">
            {project.num}
          </span>
        </div>

        <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-3">
          {project.name}
        </h3>

        <p className="font-mono text-sm text-chrome/60 mb-6 leading-relaxed">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] tracking-wider text-chrome/40 bg-white/[0.03] px-2 py-1"
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleLaunch()}
          className="font-mono text-sm tracking-[2px] text-white hover:text-lime transition-colors inline-flex items-center gap-2 group/btn"
        >
          <span className="relative">
            {btnText}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-lime group-hover/btn:w-full transition-all duration-300" />
          </span>
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 lg:py-32 max-w-[1400px] mx-auto px-6 lg:px-12"
      aria-labelledby="projects-heading"
    >
      <div className="section-label">[04] — DEPLOYED.PROJECTS</div>
      <h2
        id="projects-heading"
        className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4"
      >
        PROJECTS <span className="text-chrome/30">{"// "}</span>
        <span className="text-chrome/50">LIVE IN PRODUCTION</span>
      </h2>
      <p className="font-mono text-sm text-chrome/40 mb-16">
        {">"} showcasing deployed & production-ready work
      </p>

      {/* Asymmetric Magazine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScrollReveal variant="fadeUp" className="md:row-span-2">
          <ProjectCard
            project={PROJECTS[0]}
            className="h-full min-h-[400px] flex flex-col"
          />
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={150}>
          <ProjectCard project={PROJECTS[1]} className="flex flex-col" />
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={300} className="md:col-span-1">
          <ProjectCard project={PROJECTS[2]} className="flex flex-col" />
        </ScrollReveal>
      </div>

      <div className="stripe-divider mt-24" />
    </section>
  );
}
