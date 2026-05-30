"use client";

import React, { useRef } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function MagneticButton({ children, className }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useSpring(0, { stiffness: 160, damping: 18, mass: 0.5 });
  const y = useSpring(0, { stiffness: 160, damping: 18, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate button center coordinates
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Offset distance from center
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Pull factor (moves button container 35% towards pointer offset)
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
