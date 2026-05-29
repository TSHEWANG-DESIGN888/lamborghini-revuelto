"use client";

import { useRef } from "react";
import { useScroll, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import RevueltoScrollCanvas from "@/components/RevueltoScrollCanvas";
import RevueltoExperience from "@/components/RevueltoExperience";
import Gallery from "@/components/Gallery";
import Marquee from "@/components/Marquee";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // The Master Scroll Logic
  // We track the scroll progress of the container which is 600vh tall.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="bg-[#1a1a1a] min-h-[100dvh] selection:bg-[#D4AF37]/30 selection:text-[#FFD700]">
      <Navbar />

      {/* ── SCROLL SEQUENCE ── */}
      {/* 600vh forces the user to scroll for a long time to scrub the video */}
      <section ref={containerRef} className="h-[600vh] relative bg-black">
        {/* Sticky container locks the view in place while scrolling */}
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
          {/* Z-Index 0: The Canvas */}
          <RevueltoScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={240}
            imageFolderPath="/images/lamborghini-sequence"
          />

          {/* Z-Index 10: The HUD */}
          <RevueltoExperience scrollYProgress={scrollYProgress} />
          
          {/* Subtle Vignette Overlay to blend edges */}
          <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
        </div>
      </section>

      {/* ── REST OF SITE ── */}
      {/* This content naturally scrolls up AFTER the 600vh sequence is finished */}
      <div className="relative z-20 bg-[#1a1a1a] border-t border-[#D4AF37]/20">
        <section className="py-16 md:py-32 px-4 md:px-24 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <span className="font-heading text-[#D4AF37] text-sm tracking-[0.4em] block mb-4">
                THE HYBRID REVOLUTION
              </span>
              <h2 className="font-heading text-4xl md:text-6xl text-white font-bold tracking-widest mb-8">
                BEYOND LIMITS
              </h2>
              <p className="font-body text-xl text-white/70 leading-relaxed mb-8">
                The Revuelto is a milestone in the history of Lamborghini. It is
                the first High Performance Electrified Vehicle (HPEV) hybrid super
                sports car. With its 1015 CV total power, it delivers performance
                figures at the peak of its segment.
              </p>
              <button className="group relative overflow-hidden px-8 py-4 border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-colors duration-500">
                <div className="absolute inset-0 bg-[#D4AF37]/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                <span className="relative z-10 font-heading font-semibold text-xs tracking-[0.2em] text-[#D4AF37] group-hover:text-white transition-colors duration-500">
                  DISCOVER MORE
                </span>
                <div className="hud-corner opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0"></div>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-8 hud-border flex flex-col justify-center text-center hover:bg-white/5 transition-colors duration-500">
                <span className="font-heading text-[#D4AF37] text-3xl font-bold mb-2">V12</span>
                <span className="font-heading text-white/50 text-xs tracking-[0.2em]">ENGINE TYPE</span>
              </div>
              <div className="glass-panel p-8 hud-border flex flex-col justify-center text-center hover:bg-white/5 transition-colors duration-500">
                <span className="font-heading text-[#D4AF37] text-3xl font-bold mb-2">3</span>
                <span className="font-heading text-white/50 text-xs tracking-[0.2em]">E-MOTORS</span>
              </div>
              <div className="glass-panel p-8 hud-border flex flex-col justify-center text-center hover:bg-white/5 transition-colors duration-500">
                <span className="font-heading text-[#D4AF37] text-3xl font-bold mb-2">AWD</span>
                <span className="font-heading text-white/50 text-xs tracking-[0.2em]">DRIVETRAIN</span>
              </div>
              <div className="glass-panel p-8 hud-border flex flex-col justify-center text-center hover:bg-white/5 transition-colors duration-500">
                <span className="font-heading text-[#D4AF37] text-3xl font-bold mb-2">E-GEAR</span>
                <span className="font-heading text-white/50 text-xs tracking-[0.2em]">TRANSMISSION</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Image Gallery */}
        <Gallery />

        {/* Marquee Banner */}
        <Marquee />

        {/* Minimal Footer */}
        <footer className="border-t border-white/10 py-10 px-4 md:px-24">
          <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative">
            <div className="font-heading text-lg md:text-xl tracking-[0.2em] text-white">
              LAMBORGHINI
            </div>
            
            <div className="md:absolute md:left-1/2 md:-translate-x-1/2 font-heading text-[10px] tracking-[0.3em] text-[#D4AF37] text-center">
              BUILT WITH OBSESSION
            </div>

            <div className="flex gap-8 font-heading text-[10px] tracking-widest text-white/50">
              <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">PRIVACY POLICY</span>
              <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">TERMS OF USE</span>
              <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">COOKIE POLICY</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
