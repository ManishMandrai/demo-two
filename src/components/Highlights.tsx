// src/components/Highlights.tsx
import React from "react";
import { motion, Variants } from "framer-motion";

/**
 * Highlights — Cinematic gold-edged cards with smooth entrance animation.
 * Layout: mobile (1), tablet (2), desktop (3).
 */

const items = [
  {
    title: "Premieres",
    subtitle: "World & Indian Premieres",
    desc: "Experience exclusive first screenings from visionary filmmakers.",
    img: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Conversations",
    subtitle: "Panels & Masterclasses",
    desc: "Engage with directors, critics, and artists redefining cinema.",
    img: "https://images.unsplash.com/photo-1515165562835-c4c6df1f2c39?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Awards",
    subtitle: "Celebrating Excellence",
    desc: "Honouring bold storytelling across documentaries, shorts, and features.",
    img: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1400&q=80",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

const Highlights: React.FC = () => {
  return (
    <section className="relative py-16 px-6 bg-black text-gray-200 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 tracking-wide">
          Festival Highlights
        </h2>
        <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-12">
          Moments that define the night — premieres, conversations, and awards that illuminate bold cinema.
        </p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {items.map((it, idx) => (
            <motion.article
              key={it.title}
              variants={cardVariants}
              whileHover={{ scale: 1.04, transition: { duration: 0.4 } }}
              className="relative group overflow-hidden rounded-2xl bg-black border border-yellow-500/20 shadow-[0_10px_30px_rgba(255,215,0,0.08)]"
            >
              {/* Image */}
              <div className="h-64 md:h-72 w-full overflow-hidden relative">
                <img
                  src={it.img}
                  alt={it.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                {/* Gold inner edge */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow:
                      "inset 0 0 0 2px rgba(212,175,55,0.25), inset 0 0 40px rgba(0,0,0,0.55)",
                  }}
                />
              </div>

              {/* Card content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                <h3 className="text-xl font-semibold text-yellow-400">
                  {it.title}
                </h3>
                <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                  {it.subtitle}
                </p>
                <p className="mt-3 text-sm text-gray-300 leading-snug">
                  {it.desc}
                </p>

                {/* Actions */}
                <div className="mt-5 flex items-center gap-4">
                  <a
                    href="#"
                    className="text-sm text-yellow-300 font-medium hover:underline"
                  >
                    Learn more
                  </a>
                  <a
                    href="#tickets"
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400 text-black text-sm font-semibold shadow-sm hover:brightness-110 transition"
                  >
                    Book
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Highlights;
