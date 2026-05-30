"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

export function FooterBrand() {
  const text = "E.Ndeze";
  const roles = [
    "Cisco-Certified Network Engineer",
    "Software Developer",
    "Telecommunications Engineer"
  ];

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
      transition: { type: "spring", stiffness: 350, damping: 22 }
    },
    hover: { 
      y: -4, 
      color: "#066facd7", // primary theme indigo color
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    }
  };

  return (
    <div className="space-y-4 flex flex-col items-start">
        <Link
            href="/"
            className="group relative inline-flex items-center text-lg font-mono font-black tracking-widest select-none uppercase"
        >
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
                className={char === "." ? "text-indigo-500 font-black" : "text-foreground"}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </Link>

        <div className="flex flex-wrap gap-2 pt-1 max-w-sm">
          {roles.map((role, idx) => (
            <motion.span
              key={role}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.03, 
                y: -2,
                borderColor: "rgba(99, 102, 241, 0.4)",
                backgroundColor: "rgba(99, 102, 241, 0.04)",
                color: "var(--foreground, currentColor)"
              }}
              className="text-[11px] font-mono px-2.5 py-1 rounded-md border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-muted-foreground transition-all duration-300 select-none cursor-default shadow-sm hover:shadow-indigo-500/5"
            >
              {role}
            </motion.span>
          ))}
        </div>
    </div>
  );
}
