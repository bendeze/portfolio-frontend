'use client'

import * as React from 'react'
import { Menu, X, Cpu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLinks } from './nav-links'
import { Socials } from '../socials'
import { ModeToggle } from '@/components/shared/mode-toggle'
import { LanguageToggler } from './language-toggler'

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)

  // Toggle body scroll lock when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className="md:hidden flex items-center">
      {/* Morphing Fixed Menu Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 flex items-center justify-center p-2 rounded-full border border-white/5 bg-zinc-950/60 text-white/80 hover:text-white transition-colors cursor-pointer select-none h-10 w-10 active:scale-95"
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "close" : "menu"}
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 45, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.div>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop separating background content from floating card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-[4px]"
              onClick={() => setIsOpen(false)}
            />

            {/* Floating Dropdown Card placed with 16px space below navbar */}
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-20 right-4 left-4 z-40 bg-[#070709] border border-white/10 shadow-2xl rounded-2xl p-5 flex flex-col gap-5 select-none"
            >
              {/* Monospace Links */}
              <div className="py-2">
                <NavLinks 
                  direction="column" 
                  onClick={() => setIsOpen(false)} 
                  className="space-y-3"
                />
              </div>

              {/* Visual Divider */}
              <div className="h-px bg-white/5 w-full" />

              {/* Socials & Settings Row */}
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[9px] font-mono text-white/20 tracking-wider uppercase">Let Connect</span>
                  <Socials variant="navbar" showModeToggle={false} />
                </div>
                
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/[0.03]">
                  <span className="text-[9px] font-mono text-white/20 tracking-wider uppercase">Preferences</span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-white/5 bg-zinc-950/40 backdrop-blur select-none">
                    <ModeToggle />
                    <div className="h-4 w-[1px] bg-white/10 mx-0.5" />
                    <LanguageToggler />
                  </div>
                </div>
              </div>

              {/* Micro Console Indicator */}
              <div className="flex items-center gap-1.5 text-[8px] font-mono text-white/15 tracking-[0.2em] uppercase pt-2 border-t border-white/5">
                <Cpu className="h-2.5 w-2.5 animate-pulse text-white/30" />
                <span>Node BNE-07 // Status Active</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}


