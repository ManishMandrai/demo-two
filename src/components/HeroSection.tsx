import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Full-page cinematic Hero with:
 * - full-screen red carpet background
 * - spotlight radial
 * - gold sweep
 * - film grain overlay
 * - canvas particles (gold dust)
 * - Framer Motion reveal
 */

const bgUrl =
  // nicer cinematic red-carpet / curtain photo (Unsplash). Replace with local import if you have one.
  "https://images.unsplash.com/photo-1508973370-2c6f4b58b6c6?auto=format&fit=crop&w=1800&q=80";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const itemUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 16 } },
};

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
        y: Math.random() * h * 0.6 + h * 0.1, // more near center vertically
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

      // clear
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * (delta * 0.06);
        p.y += p.vy * (delta * 0.06);
        p.life += delta;

        // fade slowly
        const alpha = Math.max(0, p.alpha - p.life * 0.00006);

        ctx.beginPath();
        ctx.fillStyle = `rgba(212,175,55,${alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        // respawn if out of bounds or faded
        if (p.y < -10 || alpha <= 0.01) {
          particles.splice(i, 1);
          if (Math.random() < 0.8) spawn();
        }
      }

      // occasionally spawn new particles
      if (Math.random() < 0.12) spawn();

      rafRef.current = requestAnimationFrame(tick);
    };

    // initial setup & start
    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(tick);

    // cleanup
    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(3,3,3,0.46), rgba(3,3,3,0.62)), url('${bgUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* film grain + vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        <div className="absolute inset-0 film-grain opacity-40" />
      </div>

      {/* big radial spotlight (gold-tinged) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(700px 300px at 50% 12%, rgba(212,175,55,0.08), rgba(0,0,0,0) 28%)",
          mixBlendMode: "screen",
        }}
      />

      {/* gold sweep */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="gold-sweep-large" />
      </div>

      {/* floating particle canvas (top layer) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-20 w-full max-w-5xl px-6 text-center">
        <motion.div initial="hidden" animate="show" variants={container} className="mx-auto">
          <motion.div variants={itemUp} className="inline-block mb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-300 text-xs tracking-wider border border-yellow-600/15">
              ONE NIGHT • OCT 25, 2025
            </span>
          </motion.div>

          <motion.h1
            id="hero-title"
            variants={itemUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-cinematic font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-300 drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
            style={{ WebkitTextStroke: "0.35px rgba(0,0,0,0.45)" }}
          >
            The Golden Frame
          </motion.h1>

          <motion.p
            variants={itemUp}
            className="mt-6 max-w-3xl mx-auto text-gray-200/85 text-base sm:text-lg md:text-xl"
          >
            Bhopal Film Festival 2025 — The night premieres. Red carpet moments, voices from across
            the globe, and stories that stay with you.
          </motion.p>

          <motion.div variants={itemUp} className="mt-10 flex justify-center gap-4 flex-wrap">
            <a
              href="#tickets"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-semibold shadow-2xl transform transition hover:-translate-y-0.5 hover:brightness-105"
            >
              Get Passes
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a
              href="#program"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-yellow-600 text-yellow-300 text-sm font-medium hover:bg-yellow-700/5 transition"
            >
              View Program
            </a>
          </motion.div>

          {/* small footer taglines */}
          <motion.div variants={itemUp} className="mt-10 flex justify-center gap-6 text-xs text-gray-300/70">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_14px_rgba(212,175,55,0.7)]" />
              <span>Premieres • Conversations • Awards</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-400/40" />
              <span>Auditorium, Bhopal</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* decorative bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg className="w-full h-14" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,30 C240,90 480,0 720,30 C960,60 1200,10 1440,40 L1440,120 L0,120 Z" fill="rgba(0,0,0,0.65)"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
