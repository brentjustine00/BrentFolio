"use client";

import { useEffect, useRef, ReactNode } from "react";

type Variant = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn" | "flipUp";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}

const variantClassMap: Record<Variant, string> = {
  fadeUp: "sr-visible-fade-up",
  fadeLeft: "sr-visible-fade-left",
  fadeRight: "sr-visible-fade-right",
  scaleIn: "sr-visible-scale-in",
  flipUp: "sr-visible-flip-up",
};

export default function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.remove("sr-hidden");
            el.classList.add(variantClassMap[variant]);
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [variant, delay]);

  return (
    <div ref={ref} className={`sr-hidden ${className}`}>
      {children}
    </div>
  );
}
