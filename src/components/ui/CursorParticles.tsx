"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;
  maxLife: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1; // 1 to 4px
    this.speedX = Math.random() * 3 - 1.5; // Horizontal spread
    this.speedY = Math.random() * -3 - 1; // Rise up initially like flames

    // Theme colors: mostly lime with some chrome and ice for that tech/flame look
    const colors = ["#b8ff00", "#c0c0c0", "#b8ff00", "#00d4ff", "#ff006e"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.maxLife = Math.random() * 50 + 30; // Lifetime
    this.life = this.maxLife;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    // Add subtle gravity to make it feel like sand/sparks falling after rising
    this.speedY += 0.08;
    this.life--;
    if (this.size > 0.1) this.size -= 0.05;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export default function CursorParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let mouse = { x: -100, y: -100 };

    const handleResize = () => {
      // Set canvas size to match parent (Hero section)
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Mouse coordinates relative to the canvas
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      // Spawn particles only if mouse is within the canvas
      if (
        mouse.x >= 0 &&
        mouse.x <= canvas.width &&
        mouse.y >= 0 &&
        mouse.y <= canvas.height
      ) {
        // Number of particles per movement
        for (let i = 0; i < 4; i++) {
          particlesArray.push(new Particle(mouse.x, mouse.y));
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw(ctx);
        // Remove dead particles
        if (particlesArray[i].life <= 0 || particlesArray[i].size <= 0.1) {
          particlesArray.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: "screen", opacity: 0.8 }}
      aria-hidden="true"
    />
  );
}
