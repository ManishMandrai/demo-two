// src/components/Highlights.tsx
import React from "react";
import { motion } from "framer-motion";

/**
 * Highlights — 3 cinematic cards with gold edges and hover glow.
 * Responsive: mobile 1-col, sm 2-col, lg 3-col (will read 3 on wide screens).
 */

const items = [
  {
    title: "Premieres",
    subtitle: "World & Indian premieres",
    desc: "Fresh voices, first screenings — witness films before anyone else.",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Conversations",
    subtitle: "Panels & Masterclasses",
    desc: "Join intimate talks with filmmakers, critics, and cultural voices.",
    img: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Awards",
    subtitle: "Celebrating excellence",
    desc: "Recognising bold storytelling across documentary, short, and feature films.",
    img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1400&q=80",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } },
};

const Highlights: React.FC = () => {
  return (
    <section className="relative py-12 px-6 mb-24 bg-transparent">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-cinematic font-bold text-yellow-300 mb-2">
          Festival Highlights
        </h2>
        <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mb-8">
          Curated moments that define the night — premieres, conversations, and the awards that crown great cinema.
        </p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((it, idx) => (
            <motion.article
              key={it.title}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ boxShadow: "0 8px 30px rgba(2,2,2,0.6)" }}
              aria-labelledby={`highlight-${idx}-title`}
            >
              {/* Image */}
              <div className="h-64 md:h-72 lg:h-80 w-full overflow-hidden">
                <img
                  src={it.img}
                  alt={it.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                {/* gold edge */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow:
                      "inset 0 0 0 2px rgba(212,175,55,0.18), inset 0 0 40px rgba(0,0,0,0.55)",
                    mixBlendMode: "normal",
                  }}
                />
              </div>

              {/* Body */}
              <div className="p-5 bg-gradient-to-t from-black/60 via-black/40 to-transparent">
                <div className="flex items-baseline justify-between">
                  <div>
                    <h3 id={`highlight-${idx}-title`} className="text-xl font-semibold text-yellow-300">
                      {it.title}
                    </h3>
                    <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                      {it.subtitle}
                    </div>
                  </div>

                  <div className="ml-3">
                    {/* small decorative gold dot */}
                    <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(212,175,55,0.65)]" />
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-300">{it.desc}</p>

                <div className="mt-4 flex items-center justify-between">
                  <a
                    href="#"
                    className="text-sm font-medium text-yellow-300 hover:underline"
                    aria-label={`Learn more about ${it.title}`}
                  >
                    Learn more
                  </a>

                  <a
                    href="#tickets"
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400 text-black text-sm font-semibold shadow-sm hover:brightness-105 transition"
                    aria-label={`Book ${it.title}`}
                  >
                    Book
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
