import ScrollReveal from "./ui/ScrollReveal";

const EXPERIENCES = [
  {
    company: "CSR",
    role: "Customer Support Representative",
    date: "March 2026 — Present",
    tasks: [
      "Manage inbound calls, emails, and chats to provide exceptional customer support",
      "Troubleshoot technical issues and guide users through product solutions",
      "Maintain accurate records of customer interactions and resolutions",
      "Collaborate with cross-functional teams to escalate complex issues and improve support processes",
    ],
  },
  {
    company: "DATA ENCODER",
    role: "Data Encoder(SPES)",
    date: "Aug 2022 - Dec 2022",
    tasks: [
      "Digitally encoded large volumes of handwritten and scanned documents with high accuracy",
      "Ensured data integrity through regular quality checks and validation processes",
      "Collaborated with seniors to streamline entry workflows and improve efficiency",
      "Resolved data discrepancies and performed systematic recordkeeping and updates",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 lg:py-32 max-w-[1400px] mx-auto px-6 lg:px-12"
      aria-labelledby="experience-heading"
    >
      <div className="section-label">[02] — WORK.EXP</div>
      <h2
        id="experience-heading"
        className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-16"
      >
        EXPERIENCE
      </h2>

      <div className="space-y-6 relative">
        {/* Left-aligned timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-dark-border hidden lg:block" />

        {EXPERIENCES.map((exp, i) => (
          <ScrollReveal key={exp.company} variant="fadeUp" delay={i * 150}>
            <div className="terminal-card lg:ml-8 transition-all duration-300">
              {/* Terminal dots */}
              <div className="terminal-dots items-center">
                <span className="shrink-0" />
                <span className="shrink-0" />
                <span className="shrink-0" />
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between ml-2 md:ml-4 gap-1 sm:gap-0 min-w-0">
                  <span className="font-mono text-[10px] md:text-[11px] tracking-[1px] md:tracking-[2px] text-chrome/50 truncate">
                    {exp.company}
                  </span>
                  <span className="font-mono text-[9px] md:text-[11px] text-chrome/40 shrink-0">
                    {exp.date}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <h3 className="font-orbitron text-lime text-lg md:text-xl font-semibold mb-5">
                  {exp.role}
                </h3>

                <div className="space-y-2">
                  {exp.tasks.map((task) => (
                    <div
                      key={task}
                      className="flex gap-3 font-mono text-xs md:text-sm text-chrome/70"
                    >
                      <span className="text-lime shrink-0">&gt;</span>
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="stripe-divider mt-24" />
    </section>
  );
}
