import ScrollReveal from "./ui/ScrollReveal";

const EDUCATION = [
  {
    school: "Laguna State Polytechnic University",
    degree: "Bachelor of Science in Computer Science (BSCS)",
    years: "2022 — Present",
    color: "lime" as const,
  },
  {
    school: "TRACE",
    degree: "Senior High School — STEM Strand",
    years: "2020 — 2022",
    color: "magenta" as const,
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="py-24 lg:py-32 max-w-[1400px] mx-auto px-6 lg:px-12"
      aria-labelledby="education-heading"
    >
      <div className="section-label">[03] — EDU.LOG</div>
      <h2
        id="education-heading"
        className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-16"
      >
        EDUCATION
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EDUCATION.map((edu, i) => (
          <ScrollReveal key={edu.school} variant="flipUp" delay={i * 150}>
            <article className="floppy-card">
              <div
                className={`h-1.5 ${edu.color === "lime" ? "bg-lime" : "bg-magenta"
                  }`}
              />
              <div className="p-6 lg:p-8 relative">
                <div className="absolute top-6 right-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-chrome/30" aria-hidden="true">
                    <rect x="2" y="10" width="20" height="2" fill="currentColor" />
                    <rect x="4" y="8" width="16" height="2" fill="currentColor" />
                    <rect x="6" y="6" width="12" height="2" fill="currentColor" />
                    <rect x="10" y="4" width="4" height="2" fill="currentColor" />
                    <rect x="6" y="12" width="2" height="6" fill="currentColor" />
                    <rect x="16" y="12" width="2" height="6" fill="currentColor" />
                    <rect x="6" y="18" width="12" height="2" fill="currentColor" />
                  </svg>
                </div>
                <h3 className="font-orbitron text-base md:text-lg font-semibold text-white mb-3 pr-10">
                  {edu.school}
                </h3>
                <p className="font-mono text-sm text-chrome/70 mb-6">
                  {edu.degree}
                </p>
                <div className="flex justify-end">
                  <span className="font-mono text-[10px] tracking-[2px] text-chrome/40">
                    {edu.years}
                  </span>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
      <div className="stripe-divider mt-24" />
    </section>
  );
}
