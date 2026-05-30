"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function HeroTopologyCanvas() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft springs for liquid-smooth, luxurious lagging cursor response
  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      // Calculate coordinates relative to center, scaled to gentle movement offset (max 65px)
      const targetX = ((clientX - w / 2) / (w / 2)) * 65;
      const targetY = ((clientY - h / 2) / (h / 2)) * 65;

      mouseX.set(targetX);
      mouseY.set(targetY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
      {/* 3D Ambient Glowing Shape following mouse */}
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        className="relative w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] md:w-[800px] md:h-[800px] rounded-full opacity-70 flex items-center justify-center"
      >
        {/* Soft, rich high-fidelity 3D image layer blurred */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-full blur-[70px] sm:blur-[95px] md:blur-[120px] scale-105"
          style={{
            backgroundImage: `url('/hero-bg.png')`,
            mixBlendMode: "screen",
          }}
        />

        {/* Deep, glowing secondary ambient sphere inside to enrich contrast */}
        <div className="absolute inset-20 bg-indigo-500/10 rounded-full blur-[10px] mix-blend-color-dodge" />
      </motion.div>
    </div>
  );
}

