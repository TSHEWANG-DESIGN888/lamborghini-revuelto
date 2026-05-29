"use client";

import React from "react";

export default function Marquee() {
  const text = "TSEWANG DESIGN • ";
  // Create a long repeating string to ensure seamless scrolling
  const repeatedText = text.repeat(10);

  return (
    <div className="w-full overflow-hidden bg-[#D4AF37] text-black py-6 border-y border-[#FFD700]/30 relative z-10 flex items-center">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="font-heading font-bold text-3xl tracking-[0.4em] mx-6">
          {repeatedText}
        </span>
        <span className="font-heading font-bold text-3xl tracking-[0.4em] mx-6">
          {repeatedText}
        </span>
      </div>
    </div>
  );
}
