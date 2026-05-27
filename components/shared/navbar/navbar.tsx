"use client";

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { NavLinks } from './nav-links'
import { MobileNav } from './mobile-nav'
import { Socials } from '../socials'
import { BrandLogo } from './brand-logo'
import { LanguageToggler } from './language-toggler'
import { ModeToggle } from '@/components/shared/mode-toggle'
import { useLanguage } from '@/context/language-context'

export function Navbar() {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const diff = prevScrollPos - currentScrollPos;

      // Only toggle visibility if scrolled past 12px threshold to filter out micro-jitter
      if (currentScrollPos < 50) {
        setVisible(true);
      } else if (Math.abs(diff) > 12) {
        setVisible(diff > 0);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -85 }}
      transition={{ 
        type: "spring",
        stiffness: 120, // Softer spring for highly premium, liquid smooth translation
        damping: 22,    // High damping for zero overshoot bounce
        mass: 0.9,
        delay: 0.05     // Deliberate 50ms easing buffer delay
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#030303]/75 backdrop-blur-md"
    >
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-8">
        <BrandLogo />

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavLinks />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            {/* Pill 1: Socials */}
            <Socials variant="navbar" showModeToggle={false} />

            {/* Pill 2: Settings (Theme + Language) */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/5 bg-zinc-950/40 backdrop-blur h-10 select-none">
              <ModeToggle />
              <div className="h-4 w-[1px] bg-white/10 mx-0.5" />
              <LanguageToggler />
            </div>
          </div>
          <MobileNav />
        </div>
      </div>
    </motion.header>
  )
}

