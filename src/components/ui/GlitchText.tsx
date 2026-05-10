"use client";

import { useEffect, useRef } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?0123456789";

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const runGlitch = () => {
      const original = text;
      let iterations = 0;
      const maxIterations = 6;

      interval = setInterval(() => {
        if (iterations >= maxIterations) {
          el.textContent = original;
          clearInterval(interval);
          return;
        }

        el.textContent = original
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (Math.random() > 0.7) {
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            }
            return char;
          })
          .join("");

        iterations++;
      }, 60);
    };

    const loop = () => {
      runGlitch();
      timeout = setTimeout(loop, 4000 + Math.random() * 2000);
    };

    timeout = setTimeout(loop, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text]);

  return (
    <span className={`glitch-wrapper ${className}`} aria-label={text}>
      <span
        ref={spanRef}
        className="glitch-text"
        data-text={text}
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  );
}
