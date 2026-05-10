"use client";

import { useState } from "react";
import ScrollReveal from "./ui/ScrollReveal";

interface Skill {
  name: string;
  level: number; // out of 10
}

interface Folder {
  name: string;
  skills: Skill[];
}

const FOLDERS: Folder[] = [
  {
    name: "Backend",
    skills: [
      { name: "Flask", level: 7 },
      { name: "FastAPI", level: 9},
    ],
  },
  {
    name: "FRONTEND",
    skills: [
      { name: "React", level: 9 },
      { name: "FastAPI", level: 9},
      { name: "Next.js", level: 8 },
      { name: "TypeScript", level: 8 },
      { name: "Tailwind CSS", level: 9 },
      { name: "HTML5", level: 10 },
      { name: "CSS3", level: 9 },
    ],
  },
  {
    name: "TOOLS",
    skills: [
      { name: "Git", level: 8 },
      { name: "Figma", level: 7 },
      { name: "VS Code", level: 9 },
      { name: "Vercel", level: 8 },
      { name: "Render", level: 9},
      { name: "Supabase", level: 9}
    ],
  },
  {
    name: "LEARNING",
    skills: [
      { name: "Node.js", level: 5 },
      { name: "Vue", level: 4 },
      { name: "Angular", level: 5 }
    ],
  },
];

const ASCII_DEV = `
██████╗ 
██╔══██╗
██║  ██║
██║  ██║
██████╔╝
╚═════╝ 

███████╗
██╔════╝
█████╗  
██╔══╝  
███████╗
╚══════╝

██╗   ██╗
██║   ██║
██║   ██║
╚██╗ ██╔╝
 ╚████╔╝ 
  ╚═══╝  `;

function ProgressBar({ level }: { level: number }) {
  const blocks = 10;
  return (
    <div className="retro-progress">
      {Array.from({ length: blocks }).map((_, i) => (
        <div
          key={i}
          className={`retro-progress-block ${i < level ? "filled" : ""}`}
        />
      ))}
    </div>
  );
}

function FolderItem({ folder }: { folder: Folder }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className={`folder-header w-full ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-lime text-lg" aria-hidden="true">
          {open ? "📂" : "📁"}
        </span>
        <span className="font-orbitron text-sm tracking-[2px] text-white">
          {folder.name}
        </span>
        <span className="font-mono text-[10px] text-chrome/40 ml-auto">
          {folder.skills.length} items
        </span>
        <span
          className={`text-chrome/40 transition-transform duration-300 ${
            open ? "rotate-90" : ""
          }`}
          aria-hidden="true"
        >
          ▶
        </span>
      </button>

      <div
        className="folder-content"
        style={{
          maxHeight: open ? `${folder.skills.length * 48 + 16}px` : "0",
          opacity: open ? 1 : 0,
          borderWidth: open ? "1px" : "0",
        }}
      >
        <div className="p-4 space-y-3">
          {folder.skills.map((skill) => (
            <div key={skill.name} className="flex items-center gap-4">
              <span className="font-mono text-xs text-chrome/70 w-28 shrink-0">
                {skill.name}
              </span>
              <div className="flex-1">
                <ProgressBar level={skill.level} />
              </div>
              <span className="font-mono text-[10px] text-chrome/40 w-8 text-right">
                {skill.level}/10
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 lg:py-32 max-w-[1400px] mx-auto px-6 lg:px-12"
      aria-labelledby="skills-heading"
    >
      <div className="section-label">[05] — TECH.STACK</div>
      <h2
        id="skills-heading"
        className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-16"
      >
        SKILLS
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left - Folders */}
        <ScrollReveal variant="fadeLeft" className="lg:col-span-2">
          <div className="space-y-4">
            {FOLDERS.map((folder) => (
              <FolderItem key={folder.name} folder={folder} />
            ))}
          </div>
        </ScrollReveal>

        {/* Right - ASCII Art */}
        <ScrollReveal variant="fadeRight" className="hidden lg:flex items-center justify-center">
          <pre className="ascii-art font-mono" aria-hidden="true">
            {ASCII_DEV}
          </pre>
        </ScrollReveal>
      </div>

      <div className="stripe-divider mt-24" />
    </section>
  );
}
