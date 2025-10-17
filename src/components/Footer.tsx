// src/components/Footer.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaTwitter } from "react-icons/fa";

const sponsors = [
  "INDIE FILMS",
  "CINEMA HUB",
  "CITY ARTS",
  "SPONSOR X",
  "FILM TRUST",
  "CULTURE LAB",
];

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  useEffect(() => {
    let raf = 0;
    const step = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min(1, (timestamp - startRef.current) / duration);
      setValue(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      startRef.current = null;
    };
  }, [target, duration]);
  return value;
}

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  // animated stats
  const films = useCountUp(128);
  const premieres = useCountUp(18);
  const countries = useCountUp(14);

  return (
    <footer className="relative bg-gradient-to-t from-[#050505] via-[#070707] to-[#0b0b0b] text-gray-200 overflow-hidden border-t-2  ">
      {/* inline styles for marquee + film-strip shadow */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee {
          display: flex;
          gap: 3rem;
          white-space: nowrap;
          animation: marquee 18s linear infinite;
        }
        .marquee:hover { animation-play-state: paused; }
        .film-strip {
          filter: drop-shadow(0 8px 22px rgba(0,0,0,0.7));
        }
      `}</style>

      {/* Decorative top film-strip + CTA band */}
      <div className="max-w-6xl  mx-auto px-6 pt-10 pb-8">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 justify-between">
          {/* film-strip decorative left */}
          <div className="hidden lg:block w-28 h-12 film-strip">
            <svg viewBox="0 0 180 56" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect x="0" y="0" width="180" height="56" rx="6" fill="#080808" stroke="rgba(212,175,55,0.06)" />
              <g fill="rgba(212,175,55,0.08)">
                <rect x="6" y="8" width="8" height="8" rx="1.5" />
                <rect x="6" y="32" width="8" height="8" rx="1.5" />
                <rect x="166" y="8" width="8" height="8" rx="1.5" />
                <rect x="166" y="32" width="8" height="8" rx="1.5" />
              </g>
              <rect x="18" y="8" width="144" height="40" rx="3" fill="url(#grad)" />
              <defs>
                <linearGradient id="grad" x1="0" x2="1">
                  <stop offset="0" stopColor="rgba(255,255,255,0.02)"/>
                  <stop offset="1" stopColor="rgba(0,0,0,0.02)"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* CENTER: Bold CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="mx-auto lg:mx-0 max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-cinematic text-yellow-400 font-bold leading-tight">
                Still deciding? Secure your red-carpet moment.
              </h3>
              <p className="mt-2 text-sm text-gray-300 max-w-xl">
                Limited passes available — join the night premieres, panels, and after-show gatherings.
              </p>

              <div className="mt-4 flex items-center justify-center lg:justify-start gap-3">
                <a
                  href="#tickets"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-semibold shadow-2xl transform transition hover:-translate-y-0.5"
                  aria-label="Buy Tickets"
                >
                  Buy Passes
                </a>

                <a
                  href="#volunteer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-600 text-yellow-300 hover:bg-yellow-700/5 transition"
                  aria-label="Volunteer"
                >
                  Volunteer
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: stats and social */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">{films}</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">Films</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">{premieres}</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">Premieres</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">{countries}</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">Countries</div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <a className="w-9 h-9 rounded-full bg-[#101010] border border-yellow-700/20 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition" href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram className="w-4 h-4" />
              </a>

              <a className="w-9 h-9 rounded-full bg-[#101010] border border-yellow-700/20 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition" href="https://x.com" target="_blank" rel="noreferrer">
                <FaTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Sponsors marquee */}
        <div className="mt-8">
          <div className="relative overflow-hidden py-2">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-transparent pointer-events-none" />
            <div className="flex items-center">
              <div className="marquee min-w-full">
                {/* repeat sponsors twice for seamless loop */}
                {[...sponsors, ...sponsors].map((s, i) => (
                  <div key={i} className="px-6 py-2 text-sm text-gray-300 uppercase tracking-wide">
                    <span className="px-3 py-2 rounded-md bg-opacity-5 bg-yellow-400/5 border border-yellow-700/10">
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Newsletter strip */}
      <div className="bg-gradient-to-t from-black/40 to-transparent border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* micro logo */}
            <div className="flex flex-col leading-none">
              <span className="text-lg font-cinematic text-yellow-400">BFF</span>
              <span className="text-[10px] text-gray-400 -mt-0.5">The Golden Frame</span>
            </div>
            <div className="text-xs text-gray-400">
              Join our inner circle for surprise screenings & guest drops.
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-full bg-[#0b0b0b] border border-gray-800 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 outline-none"
              aria-label="Email"
            />
            <button className="px-4 py-2 rounded-full bg-yellow-400 text-black font-semibold hover:brightness-105 transition">
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Minimal bottom bar with small vertical padding */}
      <div className="border-t border-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-1 flex items-center justify-between text-xs text-gray-400">
          <div>© {year} Bhopal Film Festival. All rights reserved.</div>
          <div>
            Crafted with <span aria-hidden>♥</span> by{" "}
            <a href="https://devmanish.com" className="text-yellow-400 hover:underline" target="_blank" rel="noreferrer">
              Manish Kumar
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
