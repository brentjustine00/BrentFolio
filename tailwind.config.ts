import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-black": "#0a0a0f",
        "lime": "#b8ff00",
        "chrome": "#c0c0c0",
        "magenta": "#ff006e",
        "ice": "#00d4ff",
        "dark-card": "#111118",
        "dark-border": "#1a1a24",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        bebas: ["var(--font-bebas)", "sans-serif"],
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "blink": "blink 1s step-end infinite",
        "scanline-drift": "scanline-drift 8s linear infinite",
        "grid-drift": "grid-drift 20s linear infinite",
        "loading-bar": "loading-bar 2s ease-out forwards",
        "flicker": "flicker 0.15s ease-in-out",
        "glitch-1": "glitch-1 4s infinite linear alternate-reverse",
        "glitch-2": "glitch-2 3s infinite linear alternate-reverse",
        "blur-reveal": "blur-reveal 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards",
        "clip-reveal": "clip-reveal 1s cubic-bezier(0.77, 0, 0.175, 1) forwards",
        "cinematic-up": "cinematic-up 1s cubic-bezier(0.25, 1, 0.5, 1) forwards",
        "cinematic-left": "cinematic-left 1s cubic-bezier(0.25, 1, 0.5, 1) forwards",
        "cinematic-right": "cinematic-right 1s cubic-bezier(0.25, 1, 0.5, 1) forwards",
        "fade-in-blur": "fade-in-blur 0.8s ease-out forwards",
        "boot-type": "boot-type 0.05s steps(1) forwards",
        "spin-slow": "spin-slow 20s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "scanline-drift": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100%" },
        },
        "grid-drift": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 -200px" },
        },
        "loading-bar": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "flicker": {
          "0%": { opacity: "1" },
          "50%": { opacity: "0.4" },
          "100%": { opacity: "1" },
        },
        "glitch-1": {
          "0%, 90%": { clipPath: "inset(0 0 0 0)" },
          "91%": { clipPath: "inset(40% 0 20% 0)", transform: "translateX(-2px)" },
          "92%": { clipPath: "inset(10% 0 60% 0)", transform: "translateX(2px)" },
          "93%": { clipPath: "inset(60% 0 10% 0)", transform: "translateX(-1px)" },
          "94%, 100%": { clipPath: "inset(0 0 0 0)", transform: "translateX(0)" },
        },
        "glitch-2": {
          "0%, 85%": { clipPath: "inset(0 0 0 0)" },
          "86%": { clipPath: "inset(20% 0 40% 0)", transform: "translateX(3px)" },
          "87%": { clipPath: "inset(50% 0 20% 0)", transform: "translateX(-3px)" },
          "88%": { clipPath: "inset(10% 0 70% 0)", transform: "translateX(1px)" },
          "89%, 100%": { clipPath: "inset(0 0 0 0)", transform: "translateX(0)" },
        },
        "blur-reveal": {
          "0%": { opacity: "0", filter: "blur(12px)", transform: "scale(1.05)" },
          "100%": { opacity: "1", filter: "blur(0px)", transform: "scale(1)" },
        },
        "clip-reveal": {
          "0%": { clipPath: "inset(0 0 100% 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" },
        },
        "cinematic-up": {
          "0%": { opacity: "0", transform: "translateY(50px) scale(0.95)", filter: "blur(8px)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)", filter: "blur(0px)" },
        },
        "cinematic-left": {
          "0%": { opacity: "0", transform: "translateX(40px) scale(0.98)", filter: "blur(5px)" },
          "100%": { opacity: "1", transform: "translateX(0) scale(1)", filter: "blur(0px)" },
        },
        "cinematic-right": {
          "0%": { opacity: "0", transform: "translateX(-40px) scale(0.98)", filter: "blur(5px)" },
          "100%": { opacity: "1", transform: "translateX(0) scale(1)", filter: "blur(0px)" },
        },
        "fade-in-blur": {
          "0%": { opacity: "0", filter: "blur(10px)" },
          "100%": { opacity: "1", filter: "blur(0px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(184,255,0,0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(184,255,0,0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
