"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Code2, Network } from "lucide-react";
import { useTranslation } from "@/context/language-context";
import { motion, Variants, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from "framer-motion";

export function AboutSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const width = useTransform(
    smoothProgress,
    [0.05, 0.45],
    ["80vw", "96vw"]
  );

  const scale = useTransform(
    smoothProgress,
    [0.05, 0.45],
    [0.9, 1]
  );

  const opacity = useTransform(
    smoothProgress,
    [0.05, 0.3],
    [0.6, 1]
  );

  // --- High-Performance Mouse-Following Spring Coordinates ---
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Create smooth lag spring effect (fluid and elastic movement)
  const springX = useSpring(mouseX, { stiffness: 140, damping: 18, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 140, damping: 18, mass: 0.1 });

  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);

  const GREETINGS = [
    "Welcome ✨",
    "Hello there",
    "I am Bonheur Emmanuel",
    "A pleasure to meet you",
    "Glad you are here",
    "Step in and explore",
    "Take a closer look",
    "Nice to have you here",
    "A warm welcome",
    "Good to see you",
    "Thanks for stopping by",
    "Let's connect"
  ];

  useEffect(() => {
    if (!isHoveringCard) {
      setGreetingIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2500); // Cyclical update every 2.5 seconds
    return () => clearInterval(interval);
  }, [isHoveringCard]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop) return;
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseEnter = () => {
    if (isDesktop) setIsHoveringCard(true);
  };

  const handleMouseLeave = () => {
    setIsHoveringCard(false);
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative w-full lg:h-[130vh] flex items-center justify-center px-4 py-10 sm:px-6 lg:px-0 lg:py-0 bg-background dark:bg-[#030303] overflow-hidden"
    >
      {/* Cinematic ambient background glow behind the macro-container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-gray-500/5 dark:bg-gray-500/10 blur-[90px] sm:blur-[130px] pointer-events-none -z-10 animate-pulse duration-[8000ms]" />

      <div className="w-full lg:sticky lg:top-0 lg:h-screen flex items-center justify-center py-6 sm:py-8 lg:py-0">
        {/* Large Glassmorphic Macro-Container Card */}
        <motion.div
          style={isDesktop ? { width, scale, opacity } : undefined}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn("w-full relative rounded-3xl sm:rounded-[42px] border border-border bg-[#030303] dark:bg-white backdrop-blur-2xl will-change-transform",
            "p-6 sm:p-10 lg:p-14 shadow-2xl overflow-hidden select-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/[0.03] before:to-transparent before:pointer-events-none"
          )}
        >
          <div className="flex lg:grid lg:grid-cols-12 gap-6 lg:gap-12 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-4 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
            
            {/* Left Column: Minimal Cinematic Narrative */}
            <div className="w-[85vw] sm:w-[75vw] lg:w-auto flex-shrink-0 lg:flex-shrink snap-center lg:snap-none lg:col-span-5 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.22em] text-gray-50 dark:text-gray-700 font-bold">
                  {t("about.badge")}
                </span>
                <h2 
                  id="about-heading" 
                  className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight text-gray-50 dark:text-gray-900 leading-tight mt-2 lg:mt-4"
                >
                  {t("about.title")}
                </h2>
              </div>
              
              <p className="
                text-gray-100 dark:text-gray-900
                text-sm sm:text-base lg:text-lg
                leading-relaxed
                font-light
                italic
                tracking-wide
                font-serif
              ">
                {t("about.p1")}
              </p>
              
              <p className="
                text-gray-100 dark:text-gray-900
                text-sm sm:text-base lg:text-lg
                leading-relaxed
                font-light
                italic
                tracking-wide
                font-serif
              ">
                {t("about.p2")}
              </p>
            </div>

            {/* Right Column: Premium Visual Specialized Cards */}
            <div className="contents lg:col-span-7 lg:grid lg:grid-cols-1 lg:gap-6 lg:w-full">
              
              {/* CARD 1 — NETWORK ENGINEERING */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={isDesktop ? { y: -6, scale: 1.015 } : undefined}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="group relative flex flex-col p-5 sm:p-6 rounded-2xl border border-border bg-card hover:bg-card/95 dark:bg-[#030303] shadow-lg overflow-hidden transition-all duration-300 min-h-[280px] sm:min-h-[320px] lg:min-h-[180px] justify-between select-none will-change-transform w-[85vw] sm:w-[75vw] lg:w-full flex-shrink-0 lg:flex-shrink snap-center lg:snap-none"
              >
                {/* SVG topological connections network map in the background */}
                <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30 -z-10 group-hover:opacity-40 transition-opacity duration-300 overflow-hidden will-change-transform">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <style>{`
                      @keyframes pulse-node {
                        0% { r: 3.5px; opacity: 0.4; }
                        50% { r: 6px; opacity: 0.9; }
                        100% { r: 3.5px; opacity: 0.4; }
                      }
                      @keyframes flow-line {
                        to { stroke-dashoffset: -20; }
                      }
                      .net-node-1 { animation: pulse-node 4s infinite ease-in-out; }
                      .net-node-2 { animation: pulse-node 3s infinite ease-in-out; animation-delay: 1s; }
                      .net-node-3 { animation: pulse-node 5s infinite ease-in-out; animation-delay: 2.5s; }
                      .net-connection {
                        stroke-dasharray: 5 4;
                        animation: flow-line 2.5s infinite linear;
                      }
                    `}</style>
                    <line x1="30" y1="40" x2="130" y2="180" stroke="var(--color-primary, #6366f1)" strokeWidth="0.75" className="net-connection" />
                    <line x1="130" y1="180" x2="220" y2="80" stroke="var(--color-primary, #6366f1)" strokeWidth="0.75" className="net-connection" />
                    <line x1="220" y1="80" x2="30" y2="40" stroke="var(--color-primary, #6366f1)" strokeWidth="0.75" className="net-connection" />
                    
                    <circle cx="30" cy="40" r="4" fill="#0ea5e9" className="net-node-1" />
                    <circle cx="130" cy="180" r="4" fill="#6366f1" className="net-node-2" />
                    <circle cx="220" cy="80" r="4" fill="#3b82f6" className="net-node-3" />
                  </svg>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-background shadow-sm transition-transform duration-500 group-hover:rotate-[360deg]">
                      <Network className="h-5 w-5 text-sky-500" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground leading-none">
                      {t("about.pillar2Title")}
                    </h3>
                  </div>
                  
                  <p className="text-foreground font-light leading-relaxed text-sm">
                    {t("about.pillar2Desc")}
                  </p>
                </div>

                {/* Tags Footer */}
                <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-border/20">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-border bg-gray-300/50 dark:bg-muted/40 dark:text-muted-foreground">Enterprise Networking</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-border bg-gray-300/50 dark:bg-muted/40 dark:text-muted-foreground">Systems Administration</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-border bg-gray-300/50 dark:bg-muted/40 dark:text-muted-foreground">Infrastructure Automation</span>
                </div>
              </motion.div>

              {/* CARD 2 — SOFTWARE ENGINEERING */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={isDesktop ? { y: -6, scale: 1.015 } : undefined}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="group relative flex flex-col p-5 sm:p-6 rounded-2xl bg-card hover:bg-card/95 dark:bg-[#030303] shadow-lg overflow-hidden transition-all duration-300 min-h-[280px] sm:min-h-[320px] lg:min-h-[180px] justify-between select-none w-[85vw] sm:w-[75vw] lg:w-full flex-shrink-0 lg:flex-shrink snap-center lg:snap-none"
              >
                {/* Floating syntax-highlighted code block system in the background */}
                <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-50 -z-10 group-hover:opacity-20 transition-opacity duration-300 overflow-hidden">
                  <motion.div 
                    animate={{ y: [0, -10, 0], x: [0, 4, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 right-4 font-mono text-[10px] text-indigo-400 space-y-1 select-none text-right"
                  >
                    <div>const api = () =&gt; &#123;</div>
                    <div className="pr-3">return fetch("/db")</div>
                    <div>&#125;</div>
                  </motion.div>
                  <motion.div 
                    animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-12 left-4 font-mono text-[9px] text-purple-400 space-y-0.5 select-none text-left"
                  >
                    <div>[Server] pool active</div>
                    <div>[Postgres] connected</div>
                  </motion.div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl border border-border bg-background shadow-sm transition-transform duration-500 group-hover:scale-110">
                      <Code2 className="h-5 w-5 text-indigo-500" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground leading-none">
                      {t("about.pillar1Title")}
                    </h3>
                  </div>
                  
                  <p className="text-foreground font-light leading-relaxed text-sm">
                    {t("about.pillar1Desc")}
                  </p>
                </div>

                {/* Tags Footer */}
                <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-border/20">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-border bg-gray-300/50 dark:bg-muted/40 dark:text-muted-foreground">Backend Systems</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-border bg-gray-300/50 dark:bg-muted/40 dark:text-muted-foreground">API Engineering</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-border bg-gray-300/50 dark:bg-muted/40 dark:text-muted-foreground">Systems Design</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-border bg-gray-300/50 dark:bg-muted/40 dark:text-muted-foreground">Automation</span>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom Spring Mouse-Follower Tooltip */}
      <AnimatePresence>
        {isDesktop && isHoveringCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              left: springX,
              top: springY,
              x: "-50%",
              y: "-140%",
              pointerEvents: "none",
              zIndex: 100,
            }}
            className="flex items-center justify-center bg-white/90 dark:bg-[#0a0a0c]/90 border border-black/10 dark:border-white/10 shadow-xl rounded-full px-3.5 py-1.5 backdrop-blur-md"
          >
            <motion.span
              key={greetingIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-mono font-bold text-black dark:text-white whitespace-nowrap"
            >
              {GREETINGS[greetingIndex]}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
