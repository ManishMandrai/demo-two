// src/components/Highlights.tsx
import React from "react";

/**
 * Highlights — Cinematic gold-edged cards with CSS-based hover effects.
 * Layout: mobile (1), tablet (2), desktop (3).
 * No Framer Motion — uses Tailwind transitions only for speed & simplicity.
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
    img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1400&q=80",
  },
];

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((it, idx) => (
            <article
              key={it.title}
              className="relative group overflow-hidden rounded-2xl bg-black border border-yellow-500/18 shadow-[0_8px_24px_rgba(0,0,0,0.6)] transform transition-transform duration-400 hover:scale-105"
              aria-labelledby={`highlight-${idx}-title`}
            >
              {/* Image area */}
              <div className="h-64 md:h-72 w-full overflow-hidden relative">
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* subtle dark overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                {/* gold inner edge */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 0 2px rgba(212,175,55,0.22), inset 0 0 40px rgba(0,0,0,0.55)",
                  }}
                />
              </div>

              {/* Card content */}
              <div className="p-5 text-left">
                <h3 id={`highlight-${idx}-title`} className="text-xl font-semibold text-yellow-400">
                  {it.title}
                </h3>
                <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">{it.subtitle}</p>
                <p className="mt-3 text-sm text-gray-300 leading-snug">{it.desc}</p>

                {/* Actions */}
                <div className="mt-5 flex items-center gap-4">
                  <a
                    href="#"
                    className="text-sm text-yellow-300 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                  >
                    Learn more
                  </a>

                  <a
                    href="#tickets"
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400 text-black text-sm font-semibold shadow-sm hover:brightness-105 transition"
                    aria-label={`Book ${it.title}`}
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
                      aria-hidden
                    >
                      <path d="M5 12h14" />
                      <path d="M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
