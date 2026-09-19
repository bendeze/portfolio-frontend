"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Code2, Network } from "lucide-react";
import { useTranslation } from "@/context/language-context";
import { TagBadge } from "@/components/shared/tag-badge";
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
      className="relative w-full lg:h-[90vh] flex items-center justify-center px-4 py-10 sm:px-6 lg:px-0 lg:py-0 bg-background overflow-hidden"
    >
      {/* Cinematic ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-[#ebcb00]/5 blur-[90px] sm:blur-[130px] pointer-events-none -z-10" />

      <div className="w-full lg:sticky lg:top-0 lg:h-screen flex items-center justify-center py-6 sm:py-8 lg:py-0">
        {/* Large Clean Macro-Container Card */}
        <motion.div
          style={isDesktop ? { width, scale, opacity } : undefined}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn("w-full relative rounded-3xl sm:rounded-[36px] border border-dashed border-zinc-300 dark:border-zinc-800 bg-transparent will-change-transform",
            "p-6 sm:p-10 lg:p-14 shadow-xs overflow-hidden select-none"
          )}
        >
          <div className="flex lg:grid lg:grid-cols-12 gap-6 lg:gap-12 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-4 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">

            {/* Left Column: Minimal Cinematic Narrative */}
            <div className="w-[85vw] sm:w-[75vw] lg:w-auto flex-shrink-0 lg:flex-shrink snap-center lg:snap-none lg:col-span-5 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#ebcb00] font-bold">
                  {t("about.badge")}
                </span>
                <h2
                  id="about-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold tracking-tight text-foreground leading-tight mt-2 lg:mt-4"
                >
                  {t("about.title")}
                </h2>
              </div>

              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm font-mono leading-relaxed">
                {t("about.p1")}
              </p>

              <p className="text-zinc-500 dark:text-zinc-500 text-xs sm:text-sm font-mono leading-relaxed">
                {t("about.p2")}
              </p>

              {/* Status Micro-Badge */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dashed border-zinc-300 dark:border-zinc-800 bg-transparent text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-[#2a7c13] dark:bg-[#ebcb00] animate-pulse" />
                  <span>CORE_PLANE: L3-L7 DUAL_STACK</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Specialized Cards */}
            <div className="contents lg:col-span-7 lg:grid lg:grid-cols-1 lg:gap-6 lg:w-full">

              {/* CARD 1 — NETWORK ENGINEERING */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={isDesktop ? { y: -6, scale: 1.01 } : undefined}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="group relative flex flex-col p-5 sm:p-6 rounded-2xl border border-dashed border-zinc-300/80 dark:border-zinc-800 bg-transparent hover:border-[#2a7c13] dark:hover:border-[#ebcb00] transition-all duration-300 min-h-[260px] sm:min-h-[280px] lg:min-h-[180px] justify-between select-none will-change-transform w-[85vw] sm:w-[75vw] lg:w-full flex-shrink-0 lg:flex-shrink snap-center lg:snap-none"
              >
                {/* SVG topological connections network map */}
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
                    <line x1="30" y1="40" x2="130" y2="180" stroke="#ebcb00" strokeWidth="0.75" className="net-connection" />
                    <line x1="130" y1="180" x2="220" y2="80" stroke="#ebcb00" strokeWidth="0.75" className="net-connection" />
                    <line x1="220" y1="80" x2="30" y2="40" stroke="#ebcb00" strokeWidth="0.75" className="net-connection" />

                    <circle cx="30" cy="40" r="4" fill="#ebcb00" className="net-node-1" />
                    <circle cx="130" cy="180" r="4" fill="#ebcb00" className="net-node-2" />
                    <circle cx="220" cy="80" r="4" fill="#ebcb00" className="net-node-3" />
                  </svg>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-transparent border border-dashed border-zinc-300 dark:border-zinc-800 shadow-xs">
                      <Network className="h-4 w-4 text-[#ebcb00]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-mono font-bold text-foreground leading-none">
                      {t("about.pillar2Title")}
                    </h3>
                  </div>

                  <p className="text-zinc-600 dark:text-zinc-400 font-mono text-xs sm:text-sm leading-relaxed">
                    {t("about.pillar2Desc")}
                  </p>
                </div>

                {/* Tags Footer using TagBadge */}
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 pt-3 border-t border-dashed border-zinc-300/60 dark:border-zinc-800/60">
                  <TagBadge tag="Enterprise Networking" />
                  <TagBadge tag="Systems Administration" />
                  <TagBadge tag="Infrastructure Automation" />
                </div>
              </motion.div>

              {/* CARD 2 — SOFTWARE ENGINEERING */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={isDesktop ? { y: -6, scale: 1.01 } : undefined}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="group relative flex flex-col p-5 sm:p-6 rounded-2xl border border-dashed border-zinc-300/80 dark:border-zinc-800 bg-transparent hover:border-[#2a7c13] dark:hover:border-[#ebcb00] transition-all duration-300 min-h-[260px] sm:min-h-[280px] lg:min-h-[180px] justify-between select-none w-[85vw] sm:w-[75vw] lg:w-full flex-shrink-0 lg:flex-shrink snap-center lg:snap-none"
              >
                {/* Floating syntax-highlighted code block */}
                <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-30 -z-10 group-hover:opacity-20 transition-opacity duration-300 overflow-hidden">
                  <motion.div
                    animate={{ y: [0, -10, 0], x: [0, 4, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 right-4 font-mono text-[10px] text-[#ebcb00] space-y-1 select-none text-right"
                  >
                    <div>const api = () =&gt; &#123;</div>
                    <div className="pr-3">return fetch("/db")</div>
                    <div>&#125;</div>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-12 left-4 font-mono text-[9px] text-zinc-400 space-y-0.5 select-none text-left"
                  >
                    <div>[Server] pool active</div>
                    <div>[Postgres] connected</div>
                  </motion.div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-transparent shadow-xs">
                      <Code2 className="h-4 w-4 text-[#ebcb00]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-mono font-bold text-foreground leading-none">
                      {t("about.pillar1Title")}
                    </h3>
                  </div>

                  <p className="text-zinc-600 dark:text-zinc-400 font-mono text-xs sm:text-sm leading-relaxed">
                    {t("about.pillar1Desc")}
                  </p>
                </div>

                {/* Tags Footer using TagBadge */}
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 pt-3 border-t border-dashed border-zinc-300/60 dark:border-zinc-800/60">
                  <TagBadge tag="Backend Systems" />
                  <TagBadge tag="API Engineering" />
                  <TagBadge tag="Systems Design" />
                  <TagBadge tag="Automation" />
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
            className="flex items-center justify-center bg-card/90 border border-border shadow-xl rounded-full px-3.5 py-1.5 backdrop-blur-md"
          >
            <motion.span
              key={greetingIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-mono font-bold text-foreground whitespace-nowrap"
            >
              {GREETINGS[greetingIndex]}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
