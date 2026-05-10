"use client";

import { useState } from "react";
import GlitchText from "./ui/GlitchText";
import ScrollReveal from "./ui/ScrollReveal";

const CONTACT_LINKS = [
  {
    label: "EMAIL",
    value: "brentjustine00@gmail.com",
    action: "COPY",
    href: "",
  },
  {
    label: "GITHUB",
    value: "github.com/brent",
    action: "VISIT →",
    href: "https://github.com/brentjustine00",
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/brent",
    action: "VISIT →",
    href: "https://www.linkedin.com/in/brent-justine-barbadillo-350668383/",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error?: string }
        | null;

      if (!res.ok || !data || data.ok !== true) {
        setError(
          (data && "error" in data && data.error) ||
            "Failed to send message. Please try again."
        );
        return;
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 max-w-[1400px] mx-auto px-6 lg:px-12"
      aria-labelledby="contact-heading"
    >
      <div className="section-label">[06] — CONTACT.INIT</div>

      <ScrollReveal variant="fadeUp">
        <div className="text-center mb-12">
          <h2
            id="contact-heading"
            className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight"
          >
            LET&apos;S BUILD
            <br />
            <span className="text-lime">
              <GlitchText text="SOMETHING." />
            </span>
          </h2>
          <p className="font-mono text-sm text-chrome/60 mt-6">
            {"// Open to freelance, full-time roles & creative collaborations"}
          </p>
        </div>
      </ScrollReveal>

      {/* Contact Links */}
      <ScrollReveal variant="fadeUp" delay={150}>
        <div className="max-w-2xl mx-auto space-y-2 mb-16">
          {CONTACT_LINKS.map((link) => (
            <div key={link.label} className="contact-row">
              <span className="text-lime font-mono text-sm shrink-0">
                &gt;
              </span>
              <span className="font-mono text-xs tracking-[2px] text-chrome/50 w-20 shrink-0">
                {link.label}
              </span>
              <span className="font-mono text-xs text-chrome/30 shrink-0">
                ::
              </span>
              <span className="font-mono text-sm text-white flex-1 truncate">
                {link.value}
              </span>
              {link.action === "COPY" ? (
                <button
                  onClick={() => handleCopy(link.value)}
                  className="font-mono text-[10px] tracking-[2px] text-lime border border-lime/30 px-3 py-1 hover:bg-lime hover:text-deep-black transition-all shrink-0"
                  aria-label={`Copy ${link.label}`}
                >
                  {copied ? "COPIED!" : link.action}
                </button>
              ) : (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-[2px] text-lime border border-lime/30 px-3 py-1 hover:bg-lime hover:text-deep-black transition-all shrink-0"
                  aria-label={`Visit ${link.label}`}
                >
                  {link.action}
                </a>
              )}
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Terminal Form */}
      <ScrollReveal variant="fadeUp" delay={300}>
        <div className="max-w-2xl mx-auto terminal-card">
          <div className="terminal-dots">
            <span />
            <span />
            <span />
            <span className="ml-4 font-mono text-[10px] text-chrome/40">
              SEND_MESSAGE.exe
            </span>
          </div>

          {submitted ? (
            <div className="p-8 text-center">
              <div className="font-mono text-lime text-sm mb-2">
                MESSAGE_RECEIVED
              </div>
              <div className="font-mono text-chrome/50 text-xs">
                {"// WILL RESPOND WITHIN 24HRS"}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-6">
              {error ? (
                <div className="font-mono text-xs text-red-400 border border-red-400/30 bg-red-400/5 px-4 py-3">
                  &gt; ERROR: {error}
                </div>
              ) : null}
              <div>
                <label
                  htmlFor="name"
                  className="font-mono text-xs text-chrome/50 block mb-2"
                >
                  &gt; NAME:
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="terminal-input"
                  placeholder="Enter your name..."
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="font-mono text-xs text-chrome/50 block mb-2"
                >
                  &gt; EMAIL:
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="terminal-input"
                  placeholder="Enter your email..."
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="font-mono text-xs text-chrome/50 block mb-2"
                >
                  &gt; MESSAGE:
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="terminal-input resize-none"
                  placeholder="Type your message..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="chrome-bevel px-6 py-3 font-mono text-sm tracking-[2px] text-lime hover:bg-lime/5 transition-all disabled:opacity-50 w-full"
              >
                {sending ? (
                  <span>
                    TRANSMITTING
                    <span className="animate-blink">...</span>
                  </span>
                ) : (
                  "TRANSMIT_MESSAGE.exe"
                )}
              </button>
            </form>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
