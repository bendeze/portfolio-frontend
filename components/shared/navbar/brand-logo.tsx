"use client";

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

export function BrandLogo() {
  const text = "E.Ndeze";

  const containerVariants: Variants = {
    hover: {
      transition: {
        staggerChildren: 0.04,
      }
    }
  };

  const letterVariants: Variants = {
    initial: { 
      y: 0,
      color: "var(--color-foreground, currentColor)",
      transition: { type: 'spring' as const, stiffness: 350, damping: 22 }
    },
    hover: { 
      y: -6, 
      color: "var(--color-primary, #6366f1)", // beautiful interactive transition
      transition: { 
        type: 'spring' as const, 
        stiffness: 400, 
        damping: 10 
      } 
    }
  };

  return (
    <Link href="/" className="font-mono font-black text-lg tracking-widest select-none uppercase">
      <motion.span
        variants={containerVariants}
        initial="initial"
        whileHover="hover"
        className="inline-flex cursor-pointer"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className={char === "." ? "text-primary font-black" : "text-foreground"}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Link>
  );
}
