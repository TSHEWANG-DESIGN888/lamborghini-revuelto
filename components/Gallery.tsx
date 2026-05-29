"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  {
    src: "/images/gallery/revuelto.jpeg",
    alt: "Lamborghini Revuelto LP 1015-4",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-2",
  },
  {
    src: "/images/gallery/vertical.jpeg",
    alt: "Lamborghini Vertical",
    colSpan: "col-span-1",
    rowSpan: "row-span-3",
  },
  {
    src: "/images/gallery/urus.jpeg",
    alt: "Lamborghini Urus Performante",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-1",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const, // Fixed TS error by asserting tuple type
    },
  },
};

export default function Gallery() {
  return (
    <section className="py-24 px-6 md:px-24 max-w-[1920px] mx-auto border-t border-white/10 relative overflow-hidden">
      {/* Background glow for aesthetic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="text-center mb-16 relative z-10">
        <span className="font-heading text-[#D4AF37] text-xs tracking-[0.4em] block mb-2 opacity-80">
          GALLERIA OBSESSION
        </span>
        <h3 className="font-heading text-4xl md:text-5xl text-white font-bold tracking-widest mb-6 text-gradient-gold">
          PURE ADRENALINE
        </h3>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[250px] gap-6 relative z-10"
      >
        {images.map((img, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`relative rounded-xl overflow-hidden group hud-border ${img.colSpan} ${img.rowSpan} bg-[#1a1a1a]`}
          >
            {/* The image */}
            <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-opacity duration-700 opacity-80 group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Overlay Gradient for readability and hover effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            
            {/* HUD Corner Accents */}
            <div className="absolute inset-4 hud-corner opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            {/* Title / Alt text overlay */}
            <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <span className="font-heading text-[#D4AF37] text-[10px] tracking-widest block mb-1">
                EXHIBIT {String(index + 1).padStart(2, '0')}
              </span>
              <h4 className="font-heading text-white text-lg tracking-wider">
                {img.alt}
              </h4>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
