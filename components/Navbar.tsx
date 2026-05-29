"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(26, 26, 26, 0)", "rgba(26, 26, 26, 0.85)"]
  );

  const navBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.05)"]
  );

  const navBackdropFilter = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      style={{
        backgroundColor: navBackground,
        borderBottomColor: navBorder,
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        backdropFilter: navBackdropFilter,
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="relative w-10 h-12 flex items-center justify-center border border-[rgba(212,175,55,0.3)] bg-black/50 group-hover:border-[#D4AF37] transition-colors duration-500 overflow-hidden">
            <div className="scanline-effect"></div>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              className="w-6 h-6 group-hover:scale-110 transition-transform duration-500 relative z-10"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl tracking-[0.2em] text-white">
              LAMBORGHINI
            </span>
            <span className="font-body text-[10px] tracking-[0.3em] text-[#D4AF37]">
              AUTOMOBILI
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6 font-heading text-xs tracking-widest text-white/70">
            <span className="hover:text-white hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)] cursor-pointer transition-all duration-300">
              MODELS
            </span>
            <span className="hover:text-white hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)] cursor-pointer transition-all duration-300">
              CUSTOMIZATION
            </span>
            <span className="hover:text-white hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)] cursor-pointer transition-all duration-300">
              OWNERSHIP
            </span>
          </div>

          <button className="relative group overflow-hidden px-8 py-3 bg-transparent border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-colors duration-500">
            <div className="absolute inset-0 bg-[#D4AF37]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <span className="relative z-10 font-heading font-semibold text-xs tracking-[0.2em] text-[#D4AF37] group-hover:text-white transition-colors duration-500">
              INQUIRE
            </span>
            <div className="hud-corner opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0"></div>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
