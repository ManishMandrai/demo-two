// src/components/HeroSection.tsx
import React, { useEffect, useRef } from "react";

/**
 * Full-page cinematic Hero without Framer Motion.
 * Smooth fade-in using Tailwind transitions only.
 */

const bgUrl =
  "https://images.unsplash.com/photo-1508973370-2c6f4b58b6c6?auto=format&fit=crop&w=1800&q=80";

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      canvas.style.width = `${canvas.clientWidth}px`;
      canvas.style.height = `${canvas.clientHeight}px`;
      if (ctx) ctx.scale(dpr, dpr);
    };

    const particles: {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      alpha: number;
      life: number;
    }[] = [];

    const maxParticles = 60;

    const spawn = () => {
      if (particles.length >= maxParticles) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const p = {
        x: Math.random() * w,
        y: Math.random() * h * 0.6 + h * 0.1,
        r: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.05 - Math.random() * 0.2,
        alpha: 0.08 + Math.random() * 0.2,
        life: 0,
      };
      particles.push(p);
    };

    for (let i = 0; i < maxParticles / 2; i++) spawn();

    let last = performance.now();

    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * (delta * 0.06);
        p.y += p.vy * (delta * 0.06);
        p.life += delta;

        const alpha = Math.max(0, p.alpha - p.life * 0.00006);

        ctx.beginPath();
        ctx.fillStyle = `rgba(212,175,55,${alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        if (p.y < -10 || alpha <= 0.01) {
          particles.splice(i, 1);
          if (Math.random() < 0.8) spawn();
        }
      }

      if (Math.random() < 0.12) spawn();

      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden text-center text-gray-100"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(3,3,3,0.46), rgba(3,3,3,0.62)), url('${bgUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(700px 300px at 50% 12%, rgba(212,175,55,0.08), rgba(0,0,0,0) 28%)",
          mixBlendMode: "screen",
        }}
      />

      <div className="relative z-20 max-w-4xl mx-auto px-6 animate-fadeInUp">
        <span className="inline-block px-3 py-1 mb-6 rounded-full bg-yellow-500/10 text-yellow-300 text-xs tracking-wider border border-yellow-600/15">
          ONE NIGHT • OCT 25, 2025
        </span>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-300 drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
          The Golden Frame
        </h1>

        <p className="mt-6 text-gray-300/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          Bhopal Film Festival 2025 — Red carpet premieres, world voices, and unforgettable cinema.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <a
            href="#tickets"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-semibold shadow-xl transform transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Get Passes →
          </a>
          <a
            href="#program"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-yellow-600 text-yellow-300 text-sm font-medium hover:bg-yellow-700/5 transition"
          >
            View Program
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
