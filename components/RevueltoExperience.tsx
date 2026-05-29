"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { revueltoData } from "../data/carData";

interface RevueltoExperienceProps {
  scrollYProgress: MotionValue<number>;
}

export default function RevueltoExperience({
  scrollYProgress,
}: RevueltoExperienceProps) {
  // Phase 1: Hero (0% - 33%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.33], [0, -50]);
  const heroScale = useTransform(scrollYProgress, [0, 0.33], [1, 0.95]);

  // Phase 2: Design (33% - 66%)
  const designOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.55, 0.65],
    [0, 1, 1, 0]
  );
  const designX = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.55, 0.65],
    [-50, 0, 0, -50]
  );

  // Phase 3: Engine (66% - 100%)
  const engineOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.7, 1],
    [0, 1, 1]
  );
  const engineX = useTransform(scrollYProgress, [0.6, 0.7, 1], [50, 0, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center max-w-[1920px] mx-auto px-4 md:px-24">
      {/* ── PHASE 1: HERO ── */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center mt-20 px-2"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-4xl mx-auto"
        >
          <h2 className="font-heading text-[#D4AF37] tracking-[0.5em] text-xs sm:text-sm mb-4 line-sweep relative inline-block px-8 sm:px-12 py-2">
            {revueltoData.hero.subtitle}
          </h2>
          <h1 className="font-heading font-black text-3xl sm:text-6xl md:text-8xl lg:text-[120px] tracking-widest text-white glow-gold leading-none mb-4 md:mb-6">
            {revueltoData.hero.title}
          </h1>
          <p className="font-body text-base sm:text-xl md:text-3xl text-white/80 tracking-[0.2em] mb-8 md:mb-12 max-w-2xl mx-auto">
            {revueltoData.hero.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="glass-panel px-6 py-3 md:px-8 md:py-4 flex items-center gap-4 hud-corner">
              <span className="font-heading text-[10px] sm:text-xs text-white/50 tracking-widest">
                STARTING AT
              </span>
              <span className="font-body text-lg sm:text-2xl text-[#D4AF37] font-semibold tracking-widest">
                {revueltoData.hero.price}
              </span>
            </div>

            <button className="pointer-events-auto px-6 py-3.5 md:px-10 md:py-5 bg-[#D4AF37] text-black font-heading font-bold text-xs md:text-sm tracking-[0.3em] hover:bg-white transition-colors duration-500 hud-corner">
              {revueltoData.hero.buttonText}
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 sm:gap-4"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-heading text-[9px] sm:text-[10px] text-[#D4AF37] tracking-[0.4em]">
            INITIATE SEQUENCE
          </span>
          <div className="w-[1px] h-12 sm:h-16 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
        </motion.div>
      </motion.div>

      {/* ── PHASE 2: DESIGN ── */}
      <motion.div
        style={{ opacity: designOpacity, x: designX }}
        className="absolute left-4 md:left-24 bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 max-w-[calc(100vw-32px)] md:max-w-lg"
      >
        <div className="glass-panel p-5 sm:p-8 md:p-12 hud-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#D4AF37] to-transparent"></div>

          <span className="font-heading text-[#D4AF37] text-[10px] sm:text-xs tracking-[0.4em] block mb-2 opacity-80">
            {revueltoData.design.subtitle}
          </span>
          <h3 className="font-heading text-2xl sm:text-4xl md:text-5xl text-white font-bold tracking-widest mb-4 md:mb-6">
            {revueltoData.design.title}
          </h3>
          <p className="font-body text-sm sm:text-base md:text-lg text-white/70 leading-relaxed mb-6 md:mb-8">
            {revueltoData.design.description}
          </p>

          <div className="flex flex-col gap-3 md:gap-4">
            {revueltoData.design.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex justify-between items-end mb-1">
                  <span className="font-heading text-[10px] sm:text-xs text-white/50 tracking-widest uppercase">
                    {stat.label}
                  </span>
                  <span className="font-body text-lg sm:text-xl text-[#D4AF37] font-semibold tracking-widest">
                    {stat.value}
                  </span>
                </div>
                <div className="spec-divider"></div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── PHASE 3: ENGINE ── */}
      <motion.div
        style={{ opacity: engineOpacity, x: engineX }}
        className="absolute right-4 md:right-24 bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 max-w-[calc(100vw-32px)] md:max-w-lg text-right"
      >
        <div className="glass-panel p-5 sm:p-8 md:p-12 hud-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#D4AF37] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent"></div>

          <span className="font-heading text-[#D4AF37] text-[10px] sm:text-xs tracking-[0.4em] block mb-2 opacity-80">
            {revueltoData.engine.subtitle}
          </span>
          <h3 className="font-heading text-2xl sm:text-4xl md:text-5xl text-white font-bold tracking-widest mb-4 md:mb-6 text-gradient-gold">
            {revueltoData.engine.title}
          </h3>
          <p className="font-body text-sm sm:text-base md:text-lg text-white/70 leading-relaxed mb-6 md:mb-8 text-right">
            {revueltoData.engine.description}
          </p>

          <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-3 md:gap-y-6">
            {revueltoData.engine.specs.map((spec, i) => (
              <div key={i} className="flex flex-col items-end">
                <span className="font-heading text-[9px] sm:text-[10px] text-white/50 tracking-[0.2em] uppercase mb-1">
                  {spec.label}
                </span>
                <span className="font-body text-lg sm:text-2xl text-white font-bold tracking-wider">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Persistent HUD Elements */}
      <div className="fixed top-32 left-4 md:left-12 opacity-50 flex flex-col gap-2">
        <div className="w-1 h-1 bg-[#D4AF37]"></div>
        <div className="w-1 h-8 border-l border-[#D4AF37]"></div>
        <div className="font-mono text-[8px] text-[#D4AF37] tracking-widest rotate-90 origin-left mt-8">
          SYS.RDY
        </div>
      </div>
      
      <div className="fixed bottom-12 right-4 md:right-12 text-right">
        <div className="font-mono text-[9px] sm:text-[10px] text-white/30 tracking-[0.3em]">
          DATA.STREAM_ACTIVE
        </div>
        <div className="font-mono text-[9px] sm:text-[10px] text-[#D4AF37]/50 tracking-[0.3em] mt-1 animate-[data-stream_2s_infinite]">
          LAT: 44.6586° N / LON: 11.1259° E
        </div>
      </div>
    </div>
  );
}
