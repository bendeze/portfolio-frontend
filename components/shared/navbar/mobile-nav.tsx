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
        className="relative z-50 flex items-center justify-center p-2 rounded-md border border-dashed border-zinc-300 dark:border-zinc-800 bg-background/80 text-muted-foreground hover:text-foreground hover:border-[#ebcb00] transition-colors cursor-pointer select-none h-9 w-9 active:scale-95"
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
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
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
              className="fixed top-18 right-4 left-4 z-40 bg-card/95 backdrop-blur-md border border-dashed border-zinc-300 dark:border-zinc-800 shadow-2xl rounded-md p-5 flex flex-col gap-4 select-none"
            >
              {/* Monospace Links */}
              <div className="py-1">
                <NavLinks 
                  direction="column" 
                  onClick={() => setIsOpen(false)} 
                  className="space-y-3"
                />
              </div>

              {/* Visual Divider */}
              <div className="h-px border-t border-dashed border-zinc-300 dark:border-zinc-800 w-full" />

              {/* Socials & Settings Row */}
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[9px] font-mono text-muted-foreground/50 tracking-wider uppercase">Connect</span>
                  <Socials variant="navbar" showModeToggle={false} />
                </div>
                
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-dashed border-zinc-300 dark:border-zinc-800">
                  <span className="text-[9px] font-mono text-muted-foreground/50 tracking-wider uppercase">Settings</span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-dashed border-zinc-300 dark:border-zinc-800 bg-transparent select-none">
                    <ModeToggle />
                    <div className="h-3.5 w-px border-r border-dashed border-zinc-300 dark:border-zinc-800 mx-0.5" />
                    <LanguageToggler />
                  </div>
                </div>
              </div>

              {/* Micro Console Indicator */}
              <div className="flex items-center gap-1.5 text-[8px] font-mono text-muted-foreground/40 tracking-[0.2em] uppercase pt-2 border-t border-dashed border-zinc-300 dark:border-zinc-800">
                <Cpu className="h-2.5 w-2.5 animate-pulse text-[#ebcb00]" />
                <span>Node BNE-07 // Status Active</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}


