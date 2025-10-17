import { useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState<string>("home");

  const links = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Events", id: "events" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-md border-b border-yellow-600/30 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="flex flex-col leading-none">
          <span className="text-2xl md:text-3xl font-cinematic text-yellow-500 tracking-wide">BFF</span>
          <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">Bhopal Film Festival</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => setActive(link.id)}
              className={`relative text-sm uppercase tracking-wide transition-all duration-300 ${
                active === link.id ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400"
              }`}
            >
              {link.name}
              {active === link.id && (
                <span className="absolute bottom-[-6px] left-0 w-full h-[1.5px] bg-yellow-400 rounded-full"></span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-yellow-400 hover:scale-110 transition-transform">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}
